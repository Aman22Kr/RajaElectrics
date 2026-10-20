import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { resolveCollection } from '../data/collections';
import usePageTitle from '../hooks/usePageTitle';
import ProductCard from '../components/ProductCard';
import NotFound from './NotFound';

const PRICE = { u5: [0, 5000], '5-25': [5000, 25000], '25-75': [25000, 75000], o75: [75000, Infinity] };
const PRICE_LABEL = { u5: 'Under Rs. 5,000', '5-25': 'Rs. 5,000 – 25,000', '25-75': 'Rs. 25,000 – 75,000', o75: 'Above Rs. 75,000' };
const SORTS = {
  featured: ['Featured', null], 'price-asc': ['Price: low to high', (a, b) => a.sale - b.sale], 'price-desc': ['Price: high to low', (a, b) => b.sale - a.sale],
  discount: ['Biggest discount', (a, b) => b.discount - a.discount], az: ['Name: A–Z', (a, b) => a.title.localeCompare(b.title)],
};

export default function Collection() {
  const { handle } = useParams();
  const col = resolveCollection(handle);
  const [sp, setSp] = useSearchParams();
  const [shown, setShown] = useState(12);
  const [panel, setPanel] = useState(false);
  usePageTitle(col?.title);

  const brands = sp.getAll('brand');
  const sort = SORTS[sp.get('sort')] ? sp.get('sort') : 'featured';
  const price = PRICE[sp.get('price')] ? sp.get('price') : '';
  const base = col?.items ?? [];
  const brandList = useMemo(() => [...new Set(base.map((p) => p.brand))].sort(), [base]);
  const items = useMemo(() => {
    let r = base.filter((p) => (!brands.length || brands.some((b) => b.toLowerCase() === p.brand.toLowerCase())) && (!price || (p.sale >= PRICE[price][0] && p.sale < PRICE[price][1])));
    const fn = SORTS[sort][1];
    return fn ? [...r].sort(fn) : r;
  }, [base, brands.join('|'), price, sort]);

  if (!col) return <NotFound />;
  const update = (fn) => { const n = new URLSearchParams(sp); fn(n); setSp(n, { replace: true }); setShown(12); };
  const toggleBrand = (b) => update((n) => { const cur = n.getAll('brand'); n.delete('brand'); (cur.includes(b) ? cur.filter((x) => x !== b) : [...cur, b]).forEach((x) => n.append('brand', x)); });

  const filters = (
    <div className="space-y-6 text-sm">
      <div><p className="mb-2 font-bold uppercase tracking-wide">Brand</p>
        {brandList.length === 0 && <p className="text-slate-500">No brands</p>}
        {brandList.map((b) => <label key={b} className="flex cursor-pointer items-center gap-2 py-1"><input type="checkbox" checked={brands.some((x) => x.toLowerCase() === b.toLowerCase())} onChange={() => toggleBrand(b)} className="accent-brand" />{b}</label>)}</div>
      <div><p className="mb-2 font-bold uppercase tracking-wide">Price</p>
        {['', ...Object.keys(PRICE)].map((k) => <label key={k} className="flex cursor-pointer items-center gap-2 py-1"><input type="radio" name="price" checked={price === k} onChange={() => update((n) => (k ? n.set('price', k) : n.delete('price')))} className="accent-brand" />{k ? PRICE_LABEL[k] : 'Any price'}</label>)}</div>
      {(brands.length > 0 || price) && <button onClick={() => update((n) => { n.delete('brand'); n.delete('price'); })} className="font-semibold text-brand hover:underline">Clear filters</button>}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-slate-500">
        <Link to="/" className="hover:text-brand">Home</Link>
        {col.trail.filter((t) => t.handle).map((t) => <span key={t.handle + t.label}> / <Link to={`/collections/${t.handle}`} className="hover:text-brand">{t.label}</Link></span>)}
        <span> / {col.title}</span>
      </nav>
      <h1 className="text-2xl font-bold md:text-3xl">{col.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{items.length} product{items.length === 1 ? '' : 's'}</p>
      {col.fallbackFrom && <p className="mt-3 bg-amber-50 p-3 text-sm text-amber-800">The demo catalogue has no {col.title} products yet, so here is more from {col.fallbackFrom.label}.</p>}
      {col.children.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">{col.children.map((c, i) => c.handle && <Link key={c.handle + i} to={`/collections/${c.handle}`} className="border border-slate-300 px-3 py-1 text-xs font-semibold hover:border-brand hover:text-brand">{c.label}</Link>)}</div>
      )}
      <div className="mt-6 flex items-center justify-between gap-3 border-y border-slate-200 py-3">
        <button onClick={() => setPanel((p) => !p)} className="flex items-center gap-2 text-sm font-semibold lg:hidden"><SlidersHorizontal size={16} />Filters</button>
        <span className="hidden lg:block" />
        <label className="flex items-center gap-2 text-sm">Sort by
          <select value={sort} onChange={(e) => update((n) => n.set('sort', e.target.value))} className="border border-slate-300 px-2 py-1">{Object.entries(SORTS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></label>
      </div>
      {panel && <div className="border-b border-slate-200 py-4 lg:hidden">{filters}</div>}
      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          {items.length === 0 ? (
            <div className="border border-dashed border-slate-300 p-10 text-center">
              <p className="font-semibold">No sample products match here yet.</p>
              <p className="mt-1 text-sm text-slate-500">Try clearing filters or browse everything.</p>
              <Link to="/collections/all" className="mt-4 inline-block bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-brand">Browse all products</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{items.slice(0, shown).map((p, i) => <ProductCard key={p.slug} product={p} index={i % 8} />)}</div>
              {shown < items.length && <div className="mt-8 text-center"><button onClick={() => setShown((s) => s + 12)} className="border border-ink px-8 py-3 text-sm font-semibold hover:bg-ink hover:text-white">Load more</button></div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
