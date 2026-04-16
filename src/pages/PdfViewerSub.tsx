import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function PdfViewerSub() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const pdfFile = 'https://ulbbsffdjkdyzasvkhnq.supabase.co/storage/v1/object/sign/lsmpdf/lsmbooks2.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMzVkN2NlYi0zNTFmLTQ2MTItOGQzNi01YzhkYjVmZjJiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsc21wZGYvbHNtYm9va3MyLnBkZiIsImlhdCI6MTc3NjMxNDk2OCwiZXhwIjoxNzc3MDkyNTY4fQ.GT2PR0AluvaQF5BIEwracRt8Xk0hdrDIfYKYa9saWSE';
  const externalLink = 'https://pan.quark.cn/s/e88e047e7702';

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateWidth = () => {
      const container = document.getElementById('pdf-container');
      if (container) {
        setContainerWidth(container.clientWidth - 48); // Padding adjustment
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link 
            to="/atlas" 
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </Link>
          <h1 className="text-base md:text-lg font-bold tracking-tight whitespace-nowrap">
            展馆副图册<span className="text-emerald-400 ml-0.5">.</span>
          </h1>
        </div>

        {/* Controls - Only Page Navigation */}
        <div className="flex items-center gap-3 bg-zinc-800/50 px-4 py-1.5 rounded-full border border-white/5 mx-2">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(p => p - 1)}
            className="p-1.5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1 px-2 border-x border-white/10">
            <span className="text-sm font-bold text-emerald-400">{pageNumber}</span>
            <span className="text-zinc-500 text-xs">/</span>
            <span className="text-zinc-400 text-xs">{numPages || '--'}</span>
          </div>

          <button
            disabled={pageNumber >= (numPages || 0)}
            onClick={() => setPageNumber(p => p + 1)}
            className="p-1.5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden md:block w-32" /> {/* Spacer to balance header */}
      </header>

      {/* PDF Container */}
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto bg-zinc-950" id="pdf-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex justify-center items-start min-h-full"
        >
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                  <div className="absolute inset-0 blur-lg bg-emerald-500/20 animate-pulse" />
                </div>
                <div className="space-y-3">
                  <p className="text-zinc-200 text-lg font-bold tracking-tight animate-pulse">正在解析 PDF 资源...</p>
                  <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
                    文件较大请耐心等待，推荐使用电脑端浏览以获得最佳体验。
                  </p>
                </div>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center py-20 gap-8 text-center px-6">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                  <Download className="w-10 h-10 text-red-500" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-xl font-bold text-white mb-3">PDF 加载失败</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    可能是由于文件过大、网络连接不稳定或浏览器安全策略拦截。您可以尝试通过以下备用方案访问：
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <a 
                      href={externalLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all group shadow-lg shadow-emerald-500/20"
                    >
                      <span>通过夸克网盘访问</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href={pdfFile} 
                        target="_blank"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-medium"
                      >
                        在新窗口打开
                      </a>
                      <a 
                        href={pdfFile} 
                        download
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-medium"
                      >
                        直接下载
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <div className="shadow-2xl rounded-sm overflow-hidden bg-white">
              <Page 
                pageNumber={pageNumber} 
                width={Math.min(containerWidth, 1200)}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading={
                  <div className="bg-zinc-900 flex items-center justify-center" style={{ width: containerWidth, height: containerWidth * 1.4 }}>
                    <Loader2 className="w-8 h-8 text-emerald-500/50 animate-spin" />
                  </div>
                }
              />
            </div>
          </Document>
        </motion.div>
        
        <footer className="py-8 text-center text-zinc-700 text-[10px] tracking-[0.4em] uppercase">
          &copy; 2026 生命科学馆版权所有
        </footer>
      </main>
    </div>
  );
}
