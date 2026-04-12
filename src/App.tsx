/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

const PdfViewer = lazy(() => import('./pages/PdfViewer'));
const PdfViewerSub = lazy(() => import('./pages/PdfViewerSub'));
const AtlasSelection = lazy(() => import('./pages/AtlasSelection'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/atlas" element={<AtlasSelection />} />
          <Route path="/atlas/main" element={<PdfViewer />} />
          <Route path="/atlas/sub" element={<PdfViewerSub />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
