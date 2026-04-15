import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const exhibits = [
  {
    id: 1,
    title: '线上展馆',
    category: '云览生命，触手可及',
    description: '云端探秘生命馆，沉浸式解锁生命奥秘',
    image: 'https://lsmdescription.pages.dev/photo/xszg.jpg',
    link: 'https://www.720yuntu.com/720v2/player/269564',
    isInternal: false,
  },
  {
    id: 2,
    title: '解剖图册',
    category: '匠心编著，图解生命',
    description: '精编生命图鉴，专业解读人体结构',
    image: 'https://lsmdescription.pages.dev/photo/jptc.png',
    link: '/atlas',
    isInternal: true,
  },
  {
    id: 3,
    title: '标本查阅',
    category: '数字馆藏，精准检索',
    description: '401个3D解剖模型，一键速查人体系统',
    image: 'https://lsmdescription.pages.dev/photo/mxjs.png',
    link: 'https://lsmmodeldirectory.pages.dev/',
    isInternal: false,
  },
  {
    id: 4,
    title: '科普合集',
    category: '科普赋能，智享科学',
    description: '数字科普汇新知，轻松读懂生命科学',
    image: 'https://lsmdescription.pages.dev/photo/kphj.png',
    link: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg5Nzg2MjA0NA==&action=getalbum&album_id=2604116913841225730&scene=126&sessionid=1775975087810#wechat_redirect',
    isInternal: false,
  },
];

export default function Exhibition() {
  return (
    <section id="exhibition" className="py-32 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4 font-semibold"
            >
              03 / 线上展馆
            </motion.h2>
            <motion.h3 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              云端漫步
            </motion.h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exhibits.map((exhibit, index) => (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden block"
            >
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white/90 mb-4">
                    {exhibit.category}
                  </span>
                  <h4 className="text-3xl font-bold text-white mb-2">{exhibit.title}</h4>
                  <p className="text-zinc-300 text-sm mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {exhibit.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div />
                    {exhibit.isInternal ? (
                      <Link
                        to={exhibit.link}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-emerald-500 hover:text-black transition-all duration-300 group/btn"
                      >
                        <span className="text-xs font-medium">点击跳转</span>
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </Link>
                    ) : (
                      <a
                        href={exhibit.link}
                        target={exhibit.link !== '#' ? "_blank" : undefined}
                        rel={exhibit.link !== '#' ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-emerald-500 hover:text-black transition-all duration-300 group/btn"
                      >
                        <span className="text-xs font-medium">点击跳转</span>
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
