import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modalContent: Record<string, { title: string; content: string }> = {
    privacy: {
      title: '隐私政策',
      content: `本隐私政策适用于生命科学馆官方网站：https://lsmhaust.pages.dev/，以下简称 “本网站”，旨在说明我们如何收集、使用、存储、保护及处理您在访问与使用本网站过程中产生的个人信息。您使用本网站即表示您同意本政策内容。
一、信息收集范围
1.	自动收集信息
您浏览网站时，系统可能自动记录您的 IP 地址、浏览器类型、操作系统、访问时间、浏览页面、停留时长等非个人身份信息，仅用于网站优化、流量统计与安全防护。
2.	主动提供信息
您在进行展馆预约、咨询留言、团队申请等操作时，可能主动提供姓名、联系电话、电子邮箱、单位 / 学校名称、参观人数、参观时间等信息，用于预约核验、服务对接、通知与回访。
3.	其他信息
如您自愿参与留言、反馈、投稿等互动，我们可能收集您主动提交的文字、图片等内容。
二、信息使用目的
1.	提供并维护线上展馆、预约、咨询、科普等服务；
2.	核验参观预约信息，保障参观秩序与安全；
3.	回复咨询、处理反馈、发送参观提醒等通知；
4.	统计访问数据，优化网站功能、内容与体验；
5.	防范恶意攻击、欺诈等安全风险，保障网站稳定运行；
6.	遵守法律法规及监管要求。
三、信息共享与披露
我们不会向第三方出售、出租或非法转让您的个人信息。仅在以下情形下可依法共享或披露：
1.	经您明确同意；
2.	为履行预约、接待等服务必需，且仅向必要合作方提供最小必要信息；
3.	依据法律法规、司法机关或行政机关的强制性要求；
4.	为保护本馆、用户及公众的生命财产安全与合法权益。
四、信息安全保护
1.	采取技术与管理措施保护个人信息，防止未经授权访问、泄露、篡改或损毁；
2.	对预约、联系等敏感信息采取加密、脱敏处理；
3.	仅授权必要工作人员接触个人信息，实行最小权限管理；
4.	如发生信息安全事件，将依法及时处置并告知用户。
五、用户权利
1.	您可依法对个人信息行使以下权利：
2.	查询、更正不准确或不完整的个人信息；
3.	删除超出使用必要、违反约定或法律法规规定应删除的信息；
4.	撤回同意（不影响撤回前已合法进行的信息处理）；
5.	要求对个人信息处理规则进行解释说明。
请通过本网站公示的联系方式行使权利，我们将在法定期限内核验身份并予以回复。
六、未成年人保护
本网站面向公众提供科普与教育服务。未满 18 周岁未成年人应在监护人指导下使用本网站及预约服务。如发现未经授权收集未成年人个人信息，将立即予以删除。
七、政策更新
本政策可能因法律法规更新、服务调整等原因修订，修订后将在本网站显著位置公示。重大变更将通过网站公告、邮件等方式通知。

` // TODO: 手动添加隐私政策内容
    },
    terms: {
      title: '使用条款',
      content: `欢迎访问生命科学馆网站：https://lsmhaust.pages.dev/，访问、浏览或使用本网站，即表示您已阅读、理解并同意遵守本使用条款。
一、网站用途
本网站为生命科学馆官方平台，提供展馆介绍、学生风采展示、线上展馆、科普教育、参观预约等公益服务，旨在传播生命科学与医学知识、弘扬医学人文精神。
二、使用规则
遵守《中华人民共和国网络安全法》《著作权法》《个人信息保护法》等法律法规及公序良俗；
不得利用本网站从事违法、违规、侵权、扰乱网站秩序或危害他人安全的行为；
不得恶意爬虫、攻击、入侵、篡改网站数据或功能；
预约信息须真实、准确、有效，不得冒用他人信息、虚假预约或恶意占号；
尊重网站及相关方的知识产权，不得擅自盗用、篡改、传播网站内容。
三、内容与知识产权
本网站包含文字、图片、图标、版式、设计、视频、数据、标本图解、科普内容等，除明确标注公共领域或第三方授权外，知识产权归生命科学馆或相关权利人所有；
允许个人学习、研究、科普分享等非商业用途合理使用，使用时须注明来源；
未经书面许可，任何单位及个人不得复制、修改、发行、展演、商用或用于其他营利目的。
四、预约与参观相关约定
本馆面向公众免费开放，实行预约制，需至少提前 1 个工作日预约；
团队参观须按要求提供真实证明材料，本馆有权核验与审核；
预约成功后请按约定时间参观；如需改期或取消，请及时告知；
无故多次爽约、恶意预约或扰乱秩序，本馆可限制预约权限。
五、免责声明
因不可抗力、网络故障、第三方攻击、政府行为等不可归责于本馆的原因，导致网站中断、信息错误或损失，本馆不承担责任；
您对自身账号、密码、设备及网络环境安全负责，因个人保管不当造成损失，本馆不承担责任；
本网站可能包含指向第三方平台的链接，第三方平台的内容与行为由其自行负责。
六、条款修改
本馆可根据运营需要、法律法规更新等修订使用条款，修订后在网站公示即生效。您继续使用本网站即视为接受修订后条款。
七、争议解决
因使用本网站产生的争议，双方优先友好协商解决；协商不成，提交本馆所在地依法处理。` // TODO: 手动添加使用条款内容
    },
    thanks: {
      title: '本站致谢',
      content: `      谨向为本网站建设付出努力的各位师生致以衷心感谢！
      本网站整体搭建与开发工作由黄恒恒、金俊辉完成，梁家铭、李梓豪为项目推进提供了重要协助与支持。
      同时，感谢医学部综合办胡伊乐主任、基础医学与法医学院王冬梅院长、曹悦岩老师、高雨斐老师在网站建设期间给予的指导与帮助！`// TODO: 手动添加致谢内容
    }
  };

  return (
    <footer className="bg-zinc-50 dark:bg-black text-zinc-600 dark:text-zinc-500 py-12 border-t border-zinc-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">
            LSM<span className="text-emerald-500">.</span>
          </a>
          <p className="text-sm">生命科学馆官方网站</p>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <button 
            onClick={() => setActiveModal('privacy')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            隐私政策
          </button>
          <button 
            onClick={() => setActiveModal('terms')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            使用条款
          </button>
          <button 
            onClick={() => setActiveModal('thanks')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            本站致谢
          </button>
        </div>

        <div className="text-sm">
          &copy; {new Date().getFullYear()} Life Science Museum. All rights reserved.
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{modalContent[activeModal].title}</h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {modalContent[activeModal].content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
