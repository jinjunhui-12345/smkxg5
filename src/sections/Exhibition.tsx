import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const exhibits = [
  {
    id: 1,
    title: '人体解剖学',
    category: '基础医学',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 2,
    title: '病理标本',
    category: '临床医学',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
  },
  {
    id: 3,
    title: '基因组学',
    category: '前沿科学',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: '中医药文化',
    category: '传统医学',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1974&auto=format&fit=crop',
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
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#"
            className="group flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="font-medium">进入全景展厅</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {exhibits.map((exhibit, index) => (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
