import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full bg-white dark:bg-zinc-800 backdrop-blur-md border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shadow-2xl hover:shadow-emerald-500/20 transition-all cursor-pointer ring-1 ring-black/5 dark:ring-white/10"
      title="切换深色/浅色模式"
    >
      {theme === 'dark' ? (
        <Moon className="w-6 h-6 text-indigo-400" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-500" />
      )}
    </motion.button>
  );
}
