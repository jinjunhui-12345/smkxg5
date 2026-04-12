import { motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const aboutImages = [
  'https://lsmdescription.pages.dev/photo/img001.jpg',
  'https://lsmdescription.pages.dev/photo/img002.jpg',
  'https://lsmdescription.pages.dev/photo/img003.jpg',
  'https://lsmdescription.pages.dev/photo/img004.jpg',
  'https://lsmdescription.pages.dev/photo/img005.jpg',
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % aboutImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [nextImage]);

  return (
    <section id="about" className="relative py-32 bg-zinc-950 text-white overflow-hidden">
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
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="mb-8"
            >
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                跨越时空的<br />医学对话
              </h3>
            </motion.div>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
            >
              生命科学馆以医学发展史为主线，融合现代科技与人文关怀。在这里，我们不仅展示人体结构的精妙，更讲述医学先驱探索生命的动人故事。
            </motion.p>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10"
            >
              馆内设有基础医学、临床医学、预防医学等多个核心展区，通过沉浸式互动体验，让每一位参观者都能深刻理解生命的价值与医学的使命。
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <a 
                href="https://lsmdescription.pages.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black rounded-full font-bold text-lg hover:bg-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <span>探索展馆详情</span>
                <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Staggered Layered Image Display */}
        <div className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center lg:-mt-12">
          <div className="relative w-full h-full flex items-center justify-center">
            {aboutImages.map((img, index) => {
              // Calculate relative position to current index
              const total = aboutImages.length;
              const offset = (index - currentIndex + total) % total;
              
              // Define positions for a staggered, layered look
              let x: string | number = 0;
              let y: string | number = 0;
              let scale = 0.5;
              let zIndex = 0;
              let opacity = 0;
              let rotate = 0;

              if (offset === 0) { // Active
                x = 0;
                y = 0;
                scale = 1;
                zIndex = 30;
                opacity = 1;
                rotate = 0;
              } else if (offset === 1) { // Next (Right)
                x = '30%';
                y = 50;
                scale = 0.85;
                zIndex = 20;
                opacity = 0.4;
                rotate = 10;
              } else if (offset === total - 1) { // Prev (Left)
                x = '-30%';
                y = 50;
                scale = 0.85;
                zIndex = 20;
                opacity = 0.4;
                rotate = -10;
              } else { // Others (hidden)
                x = offset < total / 2 ? '60%' : '-60%';
                y = 120;
                scale = 0.7;
                zIndex = 10;
                opacity = 0;
                rotate = offset < total / 2 ? 20 : -20;
              }

              return (
                <motion.div
                  key={index}
                  style={{ originY: 1 }} // Rotate and scale from the bottom
                  drag={offset === 0 ? "x" : false} // Only active image is draggable
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    const swipeThreshold = 50;
                    if (info.offset.x < -swipeThreshold) {
                      nextImage();
                    } else if (info.offset.x > swipeThreshold) {
                      prevImage();
                    }
                  }}
                  animate={{
                    x,
                    y,
                    scale,
                    zIndex,
                    opacity,
                    rotate,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25
                  }}
                  className="absolute w-[75%] h-[65%] md:w-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer bottom-0 touch-none"
                  onClick={() => {
                    if (offset !== 0) {
                      setDirection(offset === total - 1 ? -1 : 1);
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <img
                    src={img}
                    alt={`Medical science ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Glassmorphism overlay on non-active images */}
                  {offset !== 0 && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-500" />
                  )}
                </motion.div>
              );
            })}

            {/* Navigation Controls */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 z-40">
              <button
                onClick={prevImage}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-500 hover:text-black transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {aboutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-emerald-400' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextImage}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-500 hover:text-black transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Background Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
