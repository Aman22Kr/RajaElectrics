import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

export default function ProductRow({ title, to, items }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: 'smooth' });
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <Reveal className="mb-4 flex items-end justify-between border-b border-slate-200 pb-3">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        <div className="flex items-center gap-3">
          {to && <Link to={to} className="text-sm font-semibold text-brand hover:underline">View all</Link>}
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className="hidden rounded-full border border-slate-300 p-1.5 hover:border-brand hover:text-brand md:block"><ChevronLeft size={16} /></button>
          <button onClick={() => scroll(1)} aria-label="Scroll right" className="hidden rounded-full border border-slate-300 p-1.5 hover:border-brand hover:text-brand md:block"><ChevronRight size={16} /></button>
        </div>
      </Reveal>
      <div ref={ref} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
        {items.map((p, i) => (
          <div key={p.slug} className="w-[200px] shrink-0 snap-start sm:w-[230px] lg:w-[250px]"><ProductCard product={p} index={i} /></div>
        ))}
      </div>
    </section>
  );
}
