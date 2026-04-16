import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Mail, Phone, User, CheckCircle2, List, X, QrCode, AlertCircle, ShieldCheck } from 'lucide-react';
import { dbService, ReservationData } from '../services/db';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    identityType: '',
    identityOther: '',
    peopleCount: '',
    phone: '',
    visit_date: '',
    visit_time: '',
    remarks: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [voucher, setVoucher] = useState<ReservationData | null>(null);
  const [lastSubmittedVoucher, setLastSubmittedVoucher] = useState<ReservationData | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [showTurnstileModal, setShowTurnstileModal] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const getByteLength = (str: string) => new TextEncoder().encode(str).length;

  const timeOptions = ['08:00', '08:30', '17:00', '17:30'];

  const validatePhone = (phone: string) => {
    // Comprehensive regex based on the provided list
    // 134(0-8), 135-139, 147, 148, 150-152, 157-159, 172, 178, 182-184, 187, 188, 195, 197, 198 (CMCC)
    // 130-132, 145, 155, 156, 166, 171, 175, 176, 185, 186, 196 (Unicom)
    // 133, 149, 153, 173, 177, 180, 181, 189, 190, 191, 193, 199 (Telecom)
    // 192 (Broadnet), 161, 162, 165, 167, 170, 171 (MVNO)
    const regex = /^1(34[0-8]\d{7}|(3[0-35-9]|4[5789]|5[0-35-9]|6[12567]|7[0-35-8]|8[0-9]|9[0-35-9])\d{8})$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Name validation
    if (!formData.name) {
      alert('请输入姓名');
      return;
    }
    if (getByteLength(formData.name) > 12) {
      alert('姓名长度不能超过12个字节');
      return;
    }
    if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(formData.name)) {
      alert('姓名只能包含中文或英文');
      return;
    }

    // 2. Identity validation
    if (!formData.identityType) {
      alert('请选择身份');
      return;
    }
    if (formData.identityType === '其他' && !formData.identityOther) {
      alert('请输入您的身份');
      return;
    }

    // 3. People count validation
    const count = parseInt(formData.peopleCount);
    if (isNaN(count) || count < 1 || count > 50) {
      alert('人数限制在1-50人');
      return;
    }

    // 4. Date validation
    if (!formData.visit_date) {
      alert('请选择预约日期');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.visit_date);
    if (selectedDate < today) {
      alert('预约日期不能早于当前日期');
      return;
    }

    // 5. Time validation
    if (!formData.visit_time) {
      alert('请选择预约时间');
      return;
    }

    // 6. Phone validation
    if (!validatePhone(formData.phone)) {
      alert('请输入正确的11位手机号码（需符合国内号段规则）');
      return;
    }

    // 7. Remarks validation - Limit removed as requested

    // Show Turnstile modal if not verified
    if (!turnstileToken) {
      setShowTurnstileModal(true);
      return;
    }
    
    submitForm();
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const finalIdentity = `${formData.identityType === '其他' ? formData.identityOther : formData.identityType}/${formData.peopleCount}人`;
      
      const submissionData = {
        name: formData.name,
        identity: finalIdentity,
        phone: formData.phone,
        visit_date: formData.visit_date,
        visit_time: formData.visit_time,
        remarks: formData.remarks
      };

      const savedData = await dbService.saveReservation(submissionData);
      setIsSuccess(true);
      setVoucher(savedData);
      setLastSubmittedVoucher(savedData);
      setFormData({ 
        name: '', 
        identityType: '', 
        identityOther: '', 
        peopleCount: '', 
        phone: '', 
        visit_date: '', 
        visit_time: '', 
        remarks: '' 
      });
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      setShowTurnstileModal(false);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to save reservation:', error);
      alert('提交预约失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="reservation" className="py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Info */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-6 font-semibold">
              04 / 展馆预约
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              开启您的<br />探索之旅
            </motion.h3>
            <motion.p variants={itemVariants} className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-xl">
              生命科学馆面向公众免费开放。为保证参观体验，请提前至少1个工作日进行预约。团队参观请提供相关证明材料。
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-white">开放时间</p>
                  <p className="text-sm">详见公众号</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-white">联系邮箱</p>
                  <p className="text-sm">3544472701@qq.com</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <motion.form 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6" 
            onSubmit={handleSubmit}
          >
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>预约提交成功！我们将尽快与您联系确认。</span>
              </motion.div>
            )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> 姓名 <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600"
                    placeholder="请输入你的姓名"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Users className="w-4 h-4" /> 身份 <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative group">
                    <select
                      required
                      value={formData.identityType}
                      onChange={(e) => setFormData({...formData, identityType: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer hover:border-white/20"
                    >
                      <option value="" disabled className="bg-zinc-900">请选择身份</option>
                      <option value="校内团体" className="bg-zinc-900">校内团体</option>
                      <option value="社会团体" className="bg-zinc-900">社会团体</option>
                      <option value="校内老师" className="bg-zinc-900">校内老师</option>
                      <option value="校内学生" className="bg-zinc-900">校内学生</option>
                      <option value="校外学生" className="bg-zinc-900">校外学生</option>
                      <option value="社会人员" className="bg-zinc-900">社会人员</option>
                      <option value="其他" className="bg-zinc-900">其他请输入</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      <List className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {formData.identityType === '其他' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <List className="w-4 h-4" /> 其他身份说明 <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.identityOther}
                    onChange={(e) => setFormData({...formData, identityOther: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    placeholder="请输入您的身份"
                  />
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Users className="w-4 h-4" /> 参观人数 <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={formData.peopleCount}
                    onChange={(e) => setFormData({...formData, peopleCount: e.target.value.replace(/\D/g, '')})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="请输入人数"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 联系电话 <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 11)})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    placeholder="请输入11位手机号码"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> 预约日期 <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.visit_date}
                    onChange={(e) => setFormData({...formData, visit_date: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> 预约时间 <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative group">
                    <select
                      required
                      value={formData.visit_time}
                      onChange={(e) => setFormData({...formData, visit_time: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer hover:border-white/20"
                    >
                      <option value="" disabled className="bg-zinc-900">请选择时间</option>
                      {timeOptions.map(time => (
                        <option key={time} value={time} className="bg-zinc-900">{time}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">备注信息</label>
                <textarea
                  rows={4}
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                  placeholder="在此处填写您具体的单位/组织/班级名称，如有特殊需求也请在此标明。"
                />
              </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-colors duration-300 flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                '提交预约申请'
              )}
            </motion.button>

            {lastSubmittedVoucher && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                type="button"
                onClick={() => setVoucher(lastSubmittedVoucher)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-4 rounded-xl transition-colors duration-300 flex justify-center items-center gap-2"
              >
                <QrCode className="w-5 h-5 text-emerald-400" />
                查看我的预约凭证
              </motion.button>
            )}
          </motion.form>
        </motion.div>
      </div>

      {/* Turnstile Modal */}
      {showTurnstileModal && createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-sm relative shadow-2xl text-center"
          >
            <button 
              onClick={() => {
                setShowTurnstileModal(false);
                setTurnstileToken(null);
                turnstileRef.current?.reset();
              }}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">安全验证</h3>
            <p className="text-zinc-400 text-sm mb-8">请完成人机验证以提交预约申请</p>

            <div className="flex justify-center min-h-[65px]">
              <Turnstile
                ref={turnstileRef}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                onSuccess={(token) => {
                  setTurnstileToken(token);
                  // Auto-submit after success
                  setTimeout(() => {
                    submitForm();
                  }, 500);
                }}
                onExpire={() => setTurnstileToken(null)}
                onError={() => {
                  setTurnstileToken(null);
                  alert('验证码加载失败，请检查网络连接或刷新页面。');
                }}
                options={{
                  theme: 'dark',
                  size: 'normal',
                }}
              />
            </div>

            <p className="text-xs text-zinc-500 mt-8">
              验证通过后将自动为您提交申请
            </p>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Voucher Modal */}
      {voucher && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md relative shadow-2xl flex flex-col max-h-[90vh]"
          >
            <button 
              onClick={() => setVoucher(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-4 text-center">预约成功</h3>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-4">
              {/* Ticket Element */}
              <div id="voucher-ticket" className="bg-white text-black rounded-xl p-8 relative overflow-hidden mx-auto w-full max-w-[350px] shadow-lg">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-3 bg-emerald-500"></div>
                
                <div className="text-center mb-8 mt-2">
                  <h4 className="text-3xl font-black tracking-tighter mb-1">LSM<span className="text-emerald-500">.</span></h4>
                  <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">Exhibition Voucher</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">预约编号 / ID</span>
                    <span className="font-mono font-bold text-xl text-emerald-600 tracking-wider">{voucher.id}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">姓名 / Name</span>
                    <span className="font-bold text-lg">{voucher.name}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">身份/人数 / Identity</span>
                    <span className="font-bold text-lg">{voucher.identity}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">联系电话 / Phone</span>
                    <span className="font-medium text-lg">{voucher.phone}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">预约日期 / Date</span>
                    <span className="font-medium text-lg">{voucher.visit_date}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">预约时间 / Time</span>
                    <span className="font-medium text-lg">{voucher.visit_time}</span>
                  </div>
                  <div className="flex flex-col pb-2">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">备注 / Remarks</span>
                    <span className="font-medium text-lg">{voucher.remarks || '无'}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative">
                  {/* Cutout circles for ticket effect */}
                  <div className="absolute -left-11 -top-3 w-6 h-6 bg-zinc-900 rounded-full"></div>
                  <div className="absolute -right-11 -top-3 w-6 h-6 bg-zinc-900 rounded-full"></div>
                  
                  <p className="text-xs text-gray-400 text-center">入馆时请出示此凭证</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-emerald-400 justify-center">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">!请截图保存此凭证，以便入馆核验</p>
              </div>
            </div>

            <button
              onClick={() => setVoucher(null)}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shrink-0"
            >
              确认并关闭
            </button>
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  );
}
