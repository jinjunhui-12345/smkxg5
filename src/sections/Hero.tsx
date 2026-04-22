import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

const navLinks = [
  { name: '展馆介绍', href: '#about' },
  { name: '学生风采', href: '#students' },
  { name: '线上展馆', href: '#exhibition' },
  { name: '展馆预约', href: '#reservation' },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white dark:bg-black flex items-center justify-center transition-colors duration-300">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2070&auto=format&fit=crop"
          alt="Microscopic view or medical abstract"
          className="w-full h-full object-cover opacity-40 dark:opacity-40 grayscale-[0.5] dark:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/50 to-white dark:from-black/20 dark:via-black/50 dark:to-black" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-zinc-900 dark:text-white">
            生命科学馆
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-white/70 max-w-2xl font-light tracking-wide mb-12">
            探索生命的奥秘，感知医学的温度。
            <br className="hidden md:block" />
            Rethink. Reimagine. Redo.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-white/50">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-8 h-12 rounded-full border border-zinc-200 dark:border-white/20 flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-emerald-500 dark:bg-white rounded-full" />
            </motion.div>

            {/* Hero Navigation Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-12"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full border border-zinc-200 dark:border-white/20 text-base md:text-lg font-medium text-zinc-600 dark:text-white/90 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors tracking-wider flex items-center gap-2"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
