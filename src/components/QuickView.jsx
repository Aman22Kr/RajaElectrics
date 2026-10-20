import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BY_SLUG } from '../data/products';
import { useStore } from '../context/StoreContext';
import { inr } from '../utils/format';
import ProductImage from './ProductImage';

export default function QuickView() {
  const { quick, closeQuick, addToCart, m } = useStore();
  const p = quick ? BY_SLUG[quick] : null;
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && closeQuick();
    if (p) document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [p, closeQuick]);
  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4" initial={{ opacity: m.on ? 0 : 1 }} animate={{ opacity: 1 }} exit={{ opacity: m.on ? 0 : 1 }} transition={{ duration: m.dur / 2 }}>
          <div className="absolute inset-0 bg-black/60" onClick={closeQuick} />
          <motion.div role="dialog" aria-modal="true" aria-label={p.title} className="relative grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-y-auto bg-white p-5 md:grid-cols-2"
            initial={{ y: m.on ? m.dist : 0, scale: m.on ? 0.96 : 1 }} animate={{ y: 0, scale: 1 }} exit={{ y: m.on ? m.dist : 0, scale: m.on ? 0.96 : 1 }} transition={{ duration: m.dur }}>
            <button onClick={closeQuick} aria-label="Close" className="absolute right-3 top-3 z-10"><X /></button>
            <ProductImage product={p} className="aspect-square w-full" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase text-slate-500">{p.brand}</span>
              <h2 className="mt-1 text-lg font-bold leading-snug">{p.title}</h2>
              <p className="mt-3 text-xl font-bold">{inr(p.sale)} {p.regular > p.sale && <span className="ml-2 text-sm font-normal text-slate-400 line-through">{inr(p.regular)}</span>}</p>
              {p.discount > 0 && <p className="text-sm font-semibold text-brand">Save {p.discount}%</p>}
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="mt-auto flex gap-2 pt-5">
                <button onClick={() => { addToCart(p.slug); closeQuick(); }} className="flex-1 bg-ink py-3 text-sm font-semibold text-white hover:bg-brand">Add to cart</button>
                <Link to={`/products/${p.slug}`} onClick={closeQuick} className="flex-1 border border-ink py-3 text-center text-sm font-semibold hover:border-brand hover:text-brand">Full details</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
