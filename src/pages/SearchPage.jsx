import { useSearchParams } from 'react-router-dom';
import { CAT_LABEL } from '../data/products';
import { searchProducts } from '../utils/search';
import usePageTitle from '../hooks/usePageTitle';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') || '';
  const cat = CAT_LABEL[sp.get('cat')] ? sp.get('cat') : 'all';
  const sort = sp.get('sort') || 'relevance';
  usePageTitle(q ? `Search: ${q}` : 'Search');
  let items = searchProducts(q, cat);
  if (sort === 'price-asc') items = [...items].sort((a, b) => a.sale - b.sale);
  if (sort === 'price-desc') items = [...items].sort((a, b) => b.sale - a.sale);
  const set = (k, v) => { const n = new URLSearchParams(sp); v && v !== 'all' && v !== 'relevance' ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <h1 className="text-2xl font-bold">{q ? <>Search results for “{q}”</> : 'Browse by search'}</h1>
      <p className="mt-1 text-sm text-slate-500">{items.length} result{items.length === 1 ? '' : 's'}</p>
      <div className="mt-4 flex flex-wrap gap-3 border-y border-slate-200 py-3 text-sm">
        <label>Category <select value={cat} onChange={(e) => set('cat', e.target.value)} className="ml-1 border border-slate-300 px-2 py-1"><option value="all">All</option>{Object.entries(CAT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        <label>Sort <select value={sort} onChange={(e) => set('sort', e.target.value)} className="ml-1 border border-slate-300 px-2 py-1"><option value="relevance">Relevance</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
      </div>
      {items.length === 0 ? <p className="mt-10 text-center text-slate-500">Nothing matched “{q}”. Try a brand (e.g. Dyson) or a product type (e.g. air fryer).</p>
        : <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">{items.map((p, i) => <ProductCard key={p.slug} product={p} index={i % 8} />)}</div>}
    </div>
  );
}
