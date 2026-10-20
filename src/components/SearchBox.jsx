import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Search } from 'lucide-react';
import { CAT_LABEL } from '../data/products';
import { searchProducts } from '../utils/search';
import { inr } from '../utils/format';
import { useStore } from '../context/StoreContext';

export default function SearchBox({ onDone }) {
  const { searches, addSearch, clearSearches } = useStore();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setFocus(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const hits = q.trim() ? searchProducts(q, cat).slice(0, 6) : [];
  const go = (term = q) => {
    const t = term.trim();
    if (!t && cat === 'all') return;
    if (t) addSearch(t);
    setFocus(false);
    onDone?.();
    nav(`/search?q=${encodeURIComponent(t)}${cat !== 'all' ? `&cat=${cat}` : ''}`);
  };

  return (
    <div ref={ref} className="relative w-full">
      <form role="search" onSubmit={(e) => { e.preventDefault(); go(); }} className="flex overflow-hidden rounded-sm border border-slate-300 bg-white focus-within:border-brand">
        <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)} className="hidden max-w-[150px] border-r border-slate-200 bg-slate-50 px-2 text-xs md:block">
          <option value="all">All categories</option>
          {Object.entries(CAT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} placeholder="Search for products, brands…" aria-label="Search products" className="min-w-0 flex-1 px-3 py-2 text-sm outline-none" />
        <button type="submit" aria-label="Search" className="bg-brand px-4 text-white transition hover:bg-brand-dark"><Search size={18} /></button>
      </form>
      {focus && (hits.length > 0 || (!q && searches.length > 0)) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-slate-200 bg-white shadow-xl">
          {hits.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} onClick={() => { addSearch(q.trim()); setFocus(false); onDone?.(); }} className="flex items-center justify-between gap-3 border-b border-slate-100 px-3 py-2 text-sm hover:bg-brand-light">
              <span className="line-clamp-1">{p.title}</span><span className="shrink-0 text-xs font-semibold">{inr(p.sale)}</span>
            </Link>
          ))}
          {!q && (
            <>
              <div className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wide text-slate-500">Recent searches
                <button onClick={clearSearches} className="normal-case text-brand hover:underline">Clear</button></div>
              {searches.map((s) => (
                <button key={s} onClick={() => { setQ(s); go(s); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-brand-light"><Clock size={14} className="text-slate-400" />{s}</button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
