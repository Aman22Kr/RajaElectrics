import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Heart, Menu as MenuIcon, ShoppingCart, User, X } from 'lucide-react';
import { QUICK_SETTINGS as S } from '../config';
import { MENU } from '../data/menu';
import { useStore } from '../context/StoreContext';
import SearchBox from './SearchBox';

const href = (n) => `/collections/${n.handle}`;

function Desktop() {
  return (
    <nav aria-label="Main" className="hidden border-b border-slate-200 bg-white lg:block">
      <ul className="mx-auto flex max-w-[1400px] items-center justify-between px-4">
        {MENU.map((n, i) => {
          const right = i >= MENU.length - 3;
          const cls = 'flex items-center gap-1 px-2 py-3 text-[13px] font-semibold uppercase tracking-wide hover:text-brand';
          return (
            <li key={n.label} className="group/top relative">
              {n.handle ? <Link to={href(n)} className={cls}>{n.label}{n.children.length > 0 && <ChevronDown size={14} />}</Link>
                : <button className={cls}>{n.label}<ChevronDown size={14} /></button>}
              {n.children.length > 0 && (
                <ul className={`invisible absolute top-full z-40 min-w-[240px] translate-y-2 border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-focus-within/top:visible group-focus-within/top:translate-y-0 group-focus-within/top:opacity-100 group-hover/top:visible group-hover/top:translate-y-0 group-hover/top:opacity-100 ${right ? 'right-0' : 'left-0'}`}>
                  {n.children.map((c, j) => (
                    <li key={c.handle + j} className="group/sub relative">
                      <Link to={href(c)} className="flex items-center justify-between px-4 py-2 text-sm hover:bg-brand-light hover:text-brand">{c.label}{c.children.length > 0 && <ChevronRight size={14} />}</Link>
                      {c.children.length > 0 && (
                        <ul className={`invisible absolute top-0 min-w-[220px] border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-150 group-focus-within/sub:visible group-focus-within/sub:opacity-100 group-hover/sub:visible group-hover/sub:opacity-100 ${right ? 'right-full' : 'left-full'}`}>
                          {c.children.map((g, k) => <li key={g.handle + k}><Link to={href(g)} className="block px-4 py-2 text-sm hover:bg-brand-light hover:text-brand">{g.label}</Link></li>)}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileItem({ n, depth = 0, close }) {
  const [open, setOpen] = useState(false);
  const has = n.children.length > 0;
  return (
    <li>
      <div className="flex items-center border-b border-slate-100" style={{ paddingLeft: depth * 14 }}>
        {n.handle ? <Link to={href(n)} onClick={close} className="flex-1 py-3 text-sm font-medium">{n.label}</Link> : <span className="flex-1 py-3 text-sm font-medium">{n.label}</span>}
        {has && <button aria-label={`Toggle ${n.label}`} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="p-3"><ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} /></button>}
      </div>
      {has && open && <ul>{n.children.map((c, i) => <MobileItem key={c.handle + i} n={c} depth={depth + 1} close={close} />)}</ul>}
    </li>
  );
}

export default function Header() {
  const { cartCount, wishlist, profile, m } = useStore();
  const [drawer, setDrawer] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-brand px-4 py-1.5 text-center text-xs font-medium text-white">{S.topBarText} · {S.phone}</div>
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3">
        <button className="lg:hidden" aria-label="Open menu" onClick={() => setDrawer(true)}><MenuIcon /></button>
        <Link to="/" className="shrink-0 text-xl font-extrabold tracking-tight md:text-2xl"><span className="text-brand">Raja</span>Electrics</Link>
        <div className="mx-2 hidden flex-1 md:block"><SearchBox /></div>
        <div className="ml-auto flex items-center gap-4 text-sm">
          <Link to="/account" className="hidden items-center gap-1 hover:text-brand sm:flex"><User size={18} />{profile ? profile.name.split(' ')[0] : 'Login / Signup'}</Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-brand"><Heart size={20} />{wishlist.length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-ink px-1.5 text-[10px] text-white">{wishlist.length}</span>}</Link>
          <Link to="/cart" aria-label={`Cart, ${cartCount} items`} className="relative flex items-center gap-1 hover:text-brand"><ShoppingCart size={20} /><span className="hidden sm:inline">Cart</span>
            <span className="rounded-full bg-brand px-1.5 text-[11px] font-bold text-white">{cartCount}</span></Link>
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden"><SearchBox /></div>
      <Desktop />
      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: m.on ? 0 : 1 }} animate={{ opacity: 1 }} exit={{ opacity: m.on ? 0 : 1 }} transition={{ duration: m.dur / 2 }}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
            <motion.div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white" initial={{ x: m.on ? '-100%' : 0 }} animate={{ x: 0 }} exit={{ x: m.on ? '-100%' : 0 }} transition={{ duration: m.dur, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-center justify-between border-b border-slate-200 p-4"><span className="font-bold">Main menu</span><button aria-label="Close menu" onClick={() => setDrawer(false)}><X /></button></div>
              <ul className="flex-1 overflow-y-auto px-2">{MENU.map((n, i) => <MobileItem key={n.label + i} n={n} close={() => setDrawer(false)} />)}</ul>
              <div className="border-t border-slate-200 p-4 text-sm"><p className="font-semibold">Need help?</p><p className="text-slate-600">{S.phone}</p><p className="text-slate-600">{S.email}</p>
                <Link to="/account" onClick={() => setDrawer(false)} className="mt-3 inline-block font-semibold text-brand">Login / Signup</Link></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
