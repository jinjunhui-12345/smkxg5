import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const exhibits = [
  {
    id: 1,
    title: '线上展馆',
    category: '全景体验',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop',
    link: 'https://www.720yuntu.com/720v2/player/269564',
  },
  {
    id: 2,
    title: '解剖图册',
    category: '专业图解',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
    link: '#', // 预留跳转链接输入位置
  },
  {
    id: 3,
    title: '标本查阅',
    category: '数字档案',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: '科普合集',
    category: '医学科普',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1974&auto=format&fit=crop',
    link: '#',
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
            <motion.a
              key={exhibit.id}
              href={exhibit.link}
              target={exhibit.link !== '#' ? "_blank" : undefined}
              rel={exhibit.link !== '#' ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer block"
            >
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white/90 mb-4">
                    {exhibit.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h4 className="text-3xl font-bold text-white">{exhibit.title}</h4>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
