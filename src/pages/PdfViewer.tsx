import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PdfViewer() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">解剖图册 <span className="text-emerald-400">.</span></h1>
        </div>
        <div className="hidden md:block text-[10px] text-zinc-500 font-medium tracking-[0.2em] uppercase">
          Digital Anatomy Atlas
        </div>
      </header>

      {/* PDF Container */}
      <main className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full h-[calc(100vh-64px)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative flex flex-col"
        >
          {/* Loading State Background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
              <p className="text-zinc-500 text-sm animate-pulse">正在加载图册...</p>
            </div>
          </div>
          
          <object
            data="/lsmbooks.pdf"
            type="application/pdf"
            className="w-full h-full flex-1"
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-zinc-900">
              <p className="text-zinc-400 mb-6">您的浏览器无法直接显示 PDF 文件。</p>
              <a 
                href="/lsmbooks.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 text-black rounded-full font-bold hover:bg-emerald-400 transition-all"
              >
                直接打开 PDF 图册
              </a>
            </div>
          </object>
        </motion.div>
        
        <footer className="py-4 text-center text-zinc-600 text-[10px] tracking-[0.3em] uppercase">
          &copy; 2024 LSM. All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}
