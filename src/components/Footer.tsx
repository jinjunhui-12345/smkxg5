import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-500 py-12 border-t border-white/10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" className="text-2xl font-bold tracking-tighter text-white">
            LSM<span className="text-emerald-400">.</span>
          </a>
          <p className="text-sm">生命科学馆在线门户网站</p>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="hover:text-white transition-colors">使用条款</a>
          <a href="#" className="hover:text-white transition-colors">联系我们</a>
        </div>

        <div className="text-sm">
          &copy; {new Date().getFullYear()} Life Science Museum. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
