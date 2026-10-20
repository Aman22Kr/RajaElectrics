import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, BRANDS } from '../data/products';
import usePageTitle from '../hooks/usePageTitle';
import { useStore } from '../context/StoreContext';
import ProductRow from '../components/ProductRow';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const SLIDES = [
  { src: 'https://mahajanelectronics.com/cdn/shop/files/15-04_21515ceb-9f21-4c61-be00-b1f528dadce7.jpg?v=1740028871&width=1600', to: '/collections/all', title: 'Everything for your home', sub: 'Appliances, audio, TVs and more' },
  { src: 'https://mahajanelectronics.com/cdn/shop/files/15-05_0ad77f9b-341a-42e0-9160-f615115c10d2.jpg?v=1740028876&width=1600', to: '/collections/mobile-phone', title: 'Latest mobiles & watches', sub: 'Smart devices at sample prices' },
];

function Hero() {
  const { m } = useStore();
  const [i, setI] = useState(0);
  const [failed, setFailed] = useState({});
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!m.on || paused) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [m.on, paused]);
  const go = (d) => setI((x) => (x + d + SLIDES.length) % SLIDES.length);
  return (
    <section aria-roledescription="carousel" aria-label="Featured offers" className="relative overflow-hidden bg-slate-100" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex transition-transform ease-out" style={{ transform: `translateX(-${i * 100}%)`, transitionDuration: `${m.on ? m.dur + 0.2 : 0}s` }}>
        {SLIDES.map((s, k) => (
          <Link key={s.to} to={s.to} className="relative block aspect-[16/7] w-full shrink-0 md:aspect-[16/5]" aria-hidden={k !== i} tabIndex={k === i ? 0 : -1}>
            {failed[k] ? (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-brand to-brand-dark text-center text-white">
                <h2 className="text-2xl font-extrabold md:text-5xl">{s.title}</h2><p className="mt-2 md:text-lg">{s.sub}</p>
              </div>
            ) : <img src={s.src} alt={s.title} loading={k === 0 ? 'eager' : 'lazy'} onError={() => setFailed((f) => ({ ...f, [k]: true }))} className="h-full w-full object-cover" />}
          </Link>
        ))}
      </div>
      <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"><ChevronLeft size={20} /></button>
      <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"><ChevronRight size={20} /></button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-brand' : 'w-2 bg-white/80'}`} />)}
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle('');
  const by = (c) => PRODUCTS.filter((p) => p.cat === c);
  const deals = [...PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 8);
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <Reveal><h2 className="mb-4 text-xl font-bold md:text-2xl">Shop By Brand</h2></Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {BRANDS.slice(0, 12).map((b, i) => (
            <Reveal key={b} index={i}>
              <Link to={`/collections/all?brand=${encodeURIComponent(b)}`} className="flex h-20 items-center justify-center border border-slate-200 bg-white text-center text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:-translate-y-1 hover:border-brand hover:text-brand hover:shadow-lg">{b}</Link>
            </Reveal>
          ))}
        </div>
      </section>
      <ProductRow title="Featured collection" to="/collections/coffe-maker" items={by('coffee').slice(0, 12)} />
      <ProductRow title="Best Sellers" to="/collections/vacuum-cleaner" items={by('vacuum')} />
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <Reveal className="mb-4 border-b border-slate-200 pb-3"><h2 className="text-xl font-bold md:text-2xl">Deal Of The Day</h2></Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{deals.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div>
      </section>
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <Reveal className="mb-4 flex items-end justify-between border-b border-slate-200 pb-3">
          <div><h2 className="text-xl font-bold md:text-2xl">New Arrivals</h2><p className="text-sm text-slate-500">Latest launches: new models added regularly (sample data).</p></div>
          <Link to="/collections/newest-arrival" className="bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-brand">Shop Now</Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">{PRODUCTS.filter((p) => p.isNew).slice(0, 10).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div>
      </section>
      <ProductRow title="Mobile" to="/collections/mobile-phone" items={by('mobile')} />
    </>
  );
}
