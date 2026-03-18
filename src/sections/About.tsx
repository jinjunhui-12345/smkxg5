import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" ref={ref} className="relative py-32 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-6 font-semibold"
            >
              01 / 展馆介绍
            </motion.h2>
            <motion.h3 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              跨越时空的<br />医学对话
            </motion.h3>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
            >
              生命科学馆以医学发展史为主线，融合现代科技与人文关怀。在这里，我们不仅展示人体结构的精妙，更讲述医学先驱探索生命的动人故事。
            </motion.p>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              馆内设有基础医学、临床医学、预防医学等多个核心展区，通过沉浸式互动体验，让每一位参观者都能深刻理解生命的价值与医学的使命。
            </motion.p>
          </motion.div>
        </div>

        {/* Right: Images Parallax */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-10 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1780&auto=format&fit=crop"
              alt="Medical equipment"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 bottom-10 w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-2xl z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop"
              alt="Microscope"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
