import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { BY_SLUG, CAT_LABEL, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import usePageTitle from '../hooks/usePageTitle';
import { inr } from '../utils/format';
import ProductImage from '../components/ProductImage';
import ProductRow from '../components/ProductRow';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const p = BY_SLUG[slug];
  const { addToCart, toggleWish, isWished, pushRecent, recent } = useStore();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');
  usePageTitle(p?.title);
  useEffect(() => { if (p) { pushRecent(p.slug); setQty(1); } }, [p, pushRecent]);
  if (!p) return <NotFound />;
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 10);
  const seen = recent.filter((x) => x.slug !== p.slug).slice(0, 10);
  const specs = [['Brand', p.brand], ['Category', CAT_LABEL[p.cat]], ['Warranty', 'As per brand policy (demo)'], ['Availability', 'In stock (demo)']];
  return (
    <>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-8 md:grid-cols-2">
        <div className="relative"><ProductImage product={p} iconSize={96} className="aspect-square w-full border border-slate-200" />
          {p.discount > 0 && <span className="absolute left-3 top-3 bg-brand px-3 py-1 text-xs font-bold text-white">Save {p.discount}%</span>}</div>
        <div>
          <nav className="mb-2 text-xs text-slate-500"><Link to="/" className="hover:text-brand">Home</Link> / <Link to="/collections/all" className="hover:text-brand">Products</Link> / {CAT_LABEL[p.cat]}</nav>
          <Link to={`/collections/all?brand=${encodeURIComponent(p.brand)}`} className="text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-brand">{p.brand}</Link>
          <h1 className="mt-1 text-2xl font-bold leading-snug">{p.title}</h1>
          <p className="mt-4 text-2xl font-bold">{inr(p.sale)} {p.regular > p.sale && <span className="ml-3 text-base font-normal text-slate-400 line-through">{inr(p.regular)}</span>}</p>
          {p.sample && <p className="mt-2 inline-block bg-amber-50 px-2 py-1 text-xs text-amber-700">Sample listing: the price is illustrative.</p>}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-slate-300">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-slate-100"><Minus size={14} /></button>
              <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} className="p-3 hover:bg-slate-100"><Plus size={14} /></button>
            </div>
            <button onClick={() => toggleWish(p.slug)} aria-pressed={isWished(p.slug)} aria-label="Toggle wishlist" className="border border-slate-300 p-3 hover:border-brand"><Heart size={18} className={isWished(p.slug) ? 'fill-red-500 text-red-500' : ''} /></button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button onClick={() => addToCart(p.slug, qty)} className="border border-ink py-3 text-sm font-semibold hover:bg-ink hover:text-white">Add to cart</button>
            <button onClick={() => { addToCart(p.slug, qty); nav('/cart'); }} className="bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-dark">Buy it now (demo)</button>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Truck size={16} className="text-brand" />Delivery promise shown for demo only</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand" />Brand warranty (demo text)</li>
          </ul>
          <div className="mt-8 border-b border-slate-200">
            {[['desc', 'Description'], ['specs', 'Specifications']].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`mr-6 border-b-2 pb-2 text-sm font-semibold ${tab === k ? 'border-brand text-brand' : 'border-transparent'}`}>{l}</button>)}
          </div>
          {tab === 'desc' ? (
            <div className="mt-4 text-sm leading-relaxed text-slate-600"><p>{p.title}.</p><ul className="mt-3 list-disc pl-5">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></div>
          ) : (
            <table className="mt-4 w-full text-sm"><tbody>{specs.map(([k, v]) => <tr key={k} className="border-b border-slate-100"><th className="w-1/3 py-2 text-left font-semibold">{k}</th><td className="py-2 text-slate-600">{v}</td></tr>)}</tbody></table>
          )}
        </div>
      </div>
      <ProductRow title="You may also like" to={`/search?cat=${p.cat}`} items={related} />
      <ProductRow title="Recently viewed" items={seen} />
    </>
  );
}
