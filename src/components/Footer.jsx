import { Link } from 'react-router-dom';
import { QUICK_SETTINGS as S, SPEEDS, INTENSITIES } from '../config';
import { MENU } from '../data/menu';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { motionPrefs, setMotionPrefs } = useStore();
  const sel = 'border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-white';
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="text-xl font-extrabold text-white"><span className="text-brand">Raja</span>Electrics</p>
          <p className="mt-2 text-sm">{S.tagline}. This is a demo storefront: products, prices and offers are sample data, and nothing here is a real sale.</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-white">Shop</p>
          <ul className="space-y-1 text-sm">{MENU.filter((n) => n.handle).map((n) => <li key={n.label}><Link className="hover:text-brand" to={`/collections/${n.handle}`}>{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-white">Help</p>
          <ul className="space-y-1 text-sm">
            {[['/contact', 'Contact us'], ['/cart', 'Cart'], ['/wishlist', 'Saved items'], ['/account', 'My account'], ['/collections/newest-arrival', 'New arrivals']].map(([to, l]) => <li key={to}><Link className="hover:text-brand" to={to}>{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-white">Motion</p>
          <div className="flex gap-2">
            <select aria-label="Animation speed" className={sel} value={motionPrefs.speed} onChange={(e) => setMotionPrefs({ ...motionPrefs, speed: e.target.value })}>{SPEEDS.map((s) => <option key={s}>{s}</option>)}</select>
            <select aria-label="Animation intensity" className={sel} value={motionPrefs.intensity} onChange={(e) => setMotionPrefs({ ...motionPrefs, intensity: e.target.value })}>{INTENSITIES.map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          <p className="mt-3 text-xs text-slate-400">Your cart, saved items and settings live in this browser only (localStorage). They don't sync across devices.</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} {S.brandName}. Demo project.</div>
    </footer>
  );
}
