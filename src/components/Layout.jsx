import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import Header from './Header';
import Footer from './Footer';
import AdBanner from './AdBanner';
import QuickView from './QuickView';

export default function Layout() {
  const { pathname } = useLocation();
  const { m, toast } = useStore();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <motion.main id="main" key={pathname} className="flex-1" initial={m.on ? { opacity: 0, y: m.dist / 2 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: m.dur }}>
        <Outlet />
      </motion.main>
      <AdBanner />
      <Footer />
      <QuickView />
      <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[80]">
        <AnimatePresence>
          {toast && <motion.div key={toast.id} initial={{ opacity: 0, y: m.on ? 20 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: m.dur / 2 }} className="bg-ink px-4 py-2 text-sm text-white shadow-lg">{toast.msg}</motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}
