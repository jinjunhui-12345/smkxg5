import { motion } from 'motion/react';
import { ChevronLeft, ArrowRight, BookOpen, BookCopy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const atlasOptions = [
  {
    id: 'main',
    title: '河南科技大学生命科学馆展馆图册',
    description: '本图册是面向公众的生命科学科普读物，由河南科技大学生命科学馆组织编纂。全书以人体解剖为核心，系统展示脑、心血管、肌肉、骨骼等重要结构的形态与功能，图文规范、讲解通俗。旨在普及生命科学知识，帮助大众认识人体奥秘，提升科学素养。',
    filename: 'lsmbooks.pdf',
    icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
    gradient: 'from-emerald-500/20 to-emerald-500/5'
  },
  {
    id: 'sub',
    title: '河南科技大学生命科学馆展馆副图册',
    description: '本副图册是生命科学主题配套科普图册，由河南科技大学生命科学馆联合解剖科技协会共同编纂。内容聚焦人体局部精细解剖与系统细节，图示精准、阐释严谨。为大众提供专业易懂的解剖知识，助力科学认知与生命健康教育。',
    filename: 'lsmbooks2.pdf',
    icon: <BookCopy className="w-8 h-8 text-blue-400" />,
    gradient: 'from-blue-500/20 to-blue-500/5'
  }
];

export default function AtlasSelection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between px-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
          </Link>
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">解剖图册 <span className="text-emerald-600 dark:text-emerald-400">.</span></h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 md:space-y-12"
        >
          {atlasOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative group overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-gradient-to-br ${option.gradient} p-8 md:p-12 hover:border-emerald-500/30 transition-all duration-500`}
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {option.icon}
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {option.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                    {option.description}
                  </p>
                  <div className="pt-4">
                    <Link
                      to={option.id === 'main' ? '/atlas/main' : '/atlas/sub'}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black font-bold rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-all group/btn"
                    >
                      <span>立即阅读</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Decorative Background Element */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="py-8 text-center text-zinc-600 text-[10px] tracking-[0.3em] uppercase">
        &copy; 2026 生命科学馆版权所有
      </footer>
    </div>
  );
}
