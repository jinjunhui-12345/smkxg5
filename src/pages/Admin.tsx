import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService, ReservationData } from '../services/db';
import { ArrowLeft, Database, Calendar, Users, Phone, User, FileText, Download, Search, Trash2, Edit, X, Check, AlertCircle } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ReservationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit State
  const [editingRes, setEditingRes] = useState<ReservationData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // 检查管理员权限
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
      return;
    }

    fetchReservations();
  }, [navigate]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const data = await dbService.getReservations();
      setReservations(data);
      setFilteredReservations(data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = reservations.filter(res => 
      res.name.toLowerCase().includes(query) ||
      res.phone.toLowerCase().includes(query) ||
      (res.id || '').toLowerCase().includes(query) ||
      res.identity.toLowerCase().includes(query)
    );
    setFilteredReservations(filtered);
  }, [searchQuery, reservations]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await dbService.deleteReservation(id);
      setReservations(prev => prev.filter(res => res.id !== id));
      setDeletingId(null);
    } catch (error) {
      console.error('Failed to delete reservation:', error);
      alert('删除失败，请重试');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRes || !editingRes.id) return;

    setIsUpdating(true);
    try {
      const updated = await dbService.updateReservation(editingRes.id, editingRes);
      setReservations(prev => prev.map(res => res.id === updated.id ? updated : res));
      setEditingRes(null);
    } catch (error) {
      console.error('Failed to update reservation:', error);
      alert('更新失败，请重试');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExport = () => {
    if (filteredReservations.length === 0) return;

    const headers = ['预约编号', '提交时间', '姓名', '身份/人数', '联系电话', '预约日期', '预约时间', '备注信息'];
    
    const csvRows = filteredReservations.map(res => {
      const submitTime = new Date(res.created_at!).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const escapeCSV = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
      
      return [
        escapeCSV(res.id || ''),
        escapeCSV(submitTime),
        escapeCSV(res.name),
        escapeCSV(res.identity),
        escapeCSV(res.phone),
        escapeCSV(res.visit_date),
        escapeCSV(res.visit_time),
        escapeCSV(res.remarks)
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `展馆预约数据_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold tracking-tight">预约管理系统</h1>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            退出登录
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">预约记录</h2>
            <p className="text-zinc-400">查看并管理所有来自展馆预约模块的提交信息。</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
              <input 
                type="text"
                placeholder="搜索姓名、电话或编号..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-full sm:w-64"
              />
            </div>
            
            <button
              onClick={handleExport}
              disabled={filteredReservations.length === 0 || isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-medium border border-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              导出 CSV
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-12 text-center">
            <Database className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              {searchQuery ? '未找到匹配结果' : '暂无预约数据'}
            </h3>
            <p className="text-zinc-400">
              {searchQuery ? `尝试搜索其他关键词或清除搜索框。` : '目前还没有人提交展馆预约。'}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-emerald-400 hover:underline text-sm"
              >
                清除搜索
              </button>
            )}
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/50">
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">预约编号</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">提交时间</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">姓名</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">身份/人数</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">联系电话</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">预约日期</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 whitespace-nowrap">预约时间</th>
                    <th className="p-4 text-sm font-medium text-zinc-400">备注信息</th>
                    <th className="p-4 text-sm font-medium text-zinc-400 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 text-sm font-mono text-emerald-400 whitespace-nowrap">
                        {res.id}
                      </td>
                      <td className="p-4 text-sm text-zinc-300 whitespace-nowrap">
                        {new Date(res.created_at!).toLocaleString('zh-CN', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-4 text-sm font-medium text-white whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-zinc-500" /> {res.name}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-zinc-500" /> {res.identity}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-zinc-500" /> {res.phone}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-400" /> {res.visit_date}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-400" /> {res.visit_time}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-zinc-400 max-w-xs truncate" title={res.remarks}>
                        {res.remarks || <span className="text-zinc-600 italic">无备注</span>}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setEditingRes(res)}
                            className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all"
                            title="编辑"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setDeletingId(res.id || null)}
                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingRes && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-400" />
                编辑预约信息
              </h3>
              <button 
                onClick={() => setEditingRes(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">姓名</label>
                  <input 
                    type="text"
                    required
                    value={editingRes.name}
                    onChange={(e) => setEditingRes({...editingRes, name: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">身份/人数</label>
                  <input 
                    type="text"
                    required
                    value={editingRes.identity}
                    onChange={(e) => setEditingRes({...editingRes, identity: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">联系电话</label>
                <input 
                  type="tel"
                  required
                  value={editingRes.phone}
                  onChange={(e) => setEditingRes({...editingRes, phone: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">预约日期</label>
                  <input 
                    type="date"
                    required
                    value={editingRes.visit_date}
                    onChange={(e) => setEditingRes({...editingRes, visit_date: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">预约时间</label>
                  <input 
                    type="time"
                    required
                    value={editingRes.visit_time}
                    onChange={(e) => setEditingRes({...editingRes, visit_time: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">备注信息</label>
                <textarea 
                  rows={3}
                  value={editingRes.remarks}
                  onChange={(e) => setEditingRes({...editingRes, remarks: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingRes(null)}
                  className="flex-1 px-6 py-3 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-emerald-500 text-black rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      保存修改
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">确认删除？</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                此操作将永久删除该预约记录，删除后将无法恢复。
              </p>
            </div>
            
            <div className="p-6 bg-black/20 border-t border-white/10 flex gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => handleDelete(deletingId)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  '确认删除'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
