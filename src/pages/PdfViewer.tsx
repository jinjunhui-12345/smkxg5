import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
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
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link 
            to="/" 
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </Link>
          <h1 className="text-base md:text-lg font-bold tracking-tight whitespace-nowrap">
            解剖图册<span className="text-emerald-400 ml-0.5">.</span>
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 md:gap-4 bg-zinc-800/50 px-2 md:px-4 py-1.5 rounded-full border border-white/5 mx-2 overflow-hidden">
          <div className="hidden sm:flex items-center gap-1 border-r border-white/10 pr-2 md:pr-4 mr-1 md:mr-2">
            <button 
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
              title="缩小"
            >
              <ZoomOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <span className="text-[10px] md:text-xs font-mono w-10 md:w-12 text-center whitespace-nowrap">{Math.round(scale * 100)}%</span>
            <button 
              onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
              title="放大"
            >
              <ZoomIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(p => p - 1)}
              className="p-1 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-colors"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">
              {pageNumber} / {numPages || '--'}
            </span>
            <button
              disabled={pageNumber >= (numPages || 0)}
              onClick={() => setPageNumber(p => p + 1)}
              className="p-1 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-colors"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <a 
            href="/lsmbooks.pdf" 
            download 
            className="hidden md:flex items-center gap-2 ml-2 md:ml-4 pl-2 md:pl-4 border-l border-white/10 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">下载</span>
          </a>
        </div>

        <div className="hidden xl:block text-[10px] text-zinc-500 font-medium tracking-[0.2em] uppercase whitespace-nowrap">
          PDF.js Engine
        </div>
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
            file="/lsmbooks.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-zinc-500 text-sm animate-pulse">正在解析 PDF 资源...</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                  <Download className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <p className="text-zinc-300 font-medium mb-2">无法加载 PDF 文件</p>
                  <p className="text-zinc-500 text-sm max-w-xs">请确保文件已正确上传至服务器，或尝试直接下载查看。</p>
                </div>
                <a 
                  href="/lsmbooks.pdf" 
                  target="_blank"
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-sm"
                >
                  在新窗口中打开
                </a>
              </div>
            }
          >
            <div className="shadow-2xl rounded-sm overflow-hidden bg-white">
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                width={Math.min(containerWidth, 1200)}
                renderAnnotationLayer={true}
                renderTextLayer={true}
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
          &copy; 2024 LSM Digital Anatomy Atlas
        </footer>
      </main>
    </div>
  );
}
