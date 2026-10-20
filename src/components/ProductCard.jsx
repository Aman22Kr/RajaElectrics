import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { inr } from '../utils/format';
import Reveal from './Reveal';
import ProductImage from './ProductImage';

export default function ProductCard({ product: p, index = 0 }) {
  const { addToCart, toggleWish, isWished, openQuick } = useStore();
  const wished = isWished(p.slug);
  return (
    <Reveal index={index} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {p.discount > 0 && <span className="absolute left-2 top-2 z-10 bg-brand px-2 py-1 text-[11px] font-bold text-white">Save {p.discount}%</span>}
        <button onClick={() => toggleWish(p.slug)} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={wished}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 shadow transition hover:scale-110">
          <Heart size={16} className={wished ? 'fill-red-500 text-red-500' : 'text-slate-500'} />
        </button>
        <Link to={`/products/${p.slug}`} className="block overflow-hidden">
          <ProductImage product={p} className="aspect-square w-full transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <div className="flex flex-1 flex-col p-3">
          <Link to={`/collections/all?brand=${encodeURIComponent(p.brand)}`} className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-brand">{p.brand}</Link>
          <Link to={`/products/${p.slug}`} className="mt-1 line-clamp-2 text-sm font-medium leading-snug hover:text-brand">{p.title}</Link>
          <div className="mt-2 text-sm">
            <span className="font-bold text-ink">{inr(p.sale)}</span>
            {p.regular > p.sale && <span className="ml-2 text-xs text-slate-400 line-through">{inr(p.regular)}</span>}
          </div>
          {p.sample && <span className="mt-1 text-[10px] uppercase tracking-wide text-amber-600">Sample listing</span>}
          <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
            <button onClick={() => addToCart(p.slug)} className="border border-ink bg-ink px-2 py-2 text-xs font-semibold text-white transition hover:border-brand hover:bg-brand">Add to cart</button>
            <button onClick={() => openQuick(p.slug)} className="border border-slate-300 px-2 py-2 text-xs font-semibold transition hover:border-brand hover:text-brand">Quick view</button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
