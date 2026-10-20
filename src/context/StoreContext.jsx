import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import useLocalStorage from '../hooks/useLocalStorage';
import { QUICK_SETTINGS, SPEEDS, INTENSITIES } from '../config';
import { BY_SLUG } from '../data/products';
import { clearStore } from '../utils/storage';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const DUR = { SLOW: 0.8, NORMAL: 0.5, FAST: 0.25 };
const STAGGER = { SLOW: 0.12, NORMAL: 0.07, FAST: 0.04 };
const DIST = { SUBTLE: 8, MEDIUM: 18, STRONG: 36 };

const isStrArr = (v) => Array.isArray(v) && v.every((s) => typeof s === 'string');
const isCart = (v) => Array.isArray(v) && v.every((i) => i && typeof i.slug === 'string' && Number.isInteger(i.qty) && i.qty > 0);

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', [], isCart);
  const [wishlist, setWishlist] = useLocalStorage('wishlist', [], isStrArr);
  const [recent, setRecent] = useLocalStorage('recent', [], isStrArr);
  const [searches, setSearches] = useLocalStorage('searches', [], isStrArr);
  const [motionPrefs, setMotionPrefs] = useLocalStorage('motion', QUICK_SETTINGS.animation,
    (v) => v && SPEEDS.includes(v.speed) && INTENSITIES.includes(v.intensity));
  const [profile, setProfile] = useLocalStorage('profile', null, (v) => v === null || (v && typeof v.name === 'string'));
  const [toast, setToast] = useState(null);
  const [quick, setQuick] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((msg) => setToast({ msg, id: Date.now() }), []);

  const m = useMemo(() => {
    const on = !reduced && motionPrefs.speed !== 'OFF';
    const sp = motionPrefs.speed === 'OFF' ? 'NORMAL' : motionPrefs.speed;
    return { on, dur: on ? DUR[sp] : 0, stagger: STAGGER[sp], dist: DIST[motionPrefs.intensity] };
  }, [reduced, motionPrefs]);

  const addToCart = useCallback((slug, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.slug === slug);
      return found ? c.map((i) => (i.slug === slug ? { ...i, qty: Math.min(10, i.qty + qty) } : i)) : [...c, { slug, qty }];
    });
    notify('Added to cart');
  }, [setCart, notify]);
  const setQty = (slug, qty) => setCart((c) => (qty < 1 ? c.filter((i) => i.slug !== slug) : c.map((i) => (i.slug === slug ? { ...i, qty: Math.min(10, qty) } : i))));
  const removeFromCart = (slug) => setCart((c) => c.filter((i) => i.slug !== slug));
  const clearCart = () => setCart([]);

  const toggleWish = (slug) => {
    const has = wishlist.includes(slug);
    setWishlist((w) => (has ? w.filter((s) => s !== slug) : [slug, ...w]));
    notify(has ? 'Removed from saved items' : 'Saved to wishlist');
  };
  const pushRecent = useCallback((slug) => setRecent((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, 12)), [setRecent]);
  const addSearch = (term) => setSearches((s) => [term, ...s.filter((x) => x.toLowerCase() !== term.toLowerCase())].slice(0, 8));

  const resetAll = () => { clearStore(); window.location.reload(); };

  const cartLines = useMemo(() => cart.map((i) => ({ product: BY_SLUG[i.slug], qty: i.qty })).filter((l) => l.product), [cart]);
  const cartCount = cartLines.reduce((n, l) => n + l.qty, 0);
  const cartTotal = cartLines.reduce((n, l) => n + l.qty * l.product.sale, 0);

  const value = {
    m, motionPrefs, setMotionPrefs, cartLines, cartCount, cartTotal, addToCart, setQty, removeFromCart, clearCart,
    wishlist: wishlist.filter((s) => BY_SLUG[s]), isWished: (s) => wishlist.includes(s), toggleWish,
    recent: recent.map((s) => BY_SLUG[s]).filter(Boolean), pushRecent,
    searches, addSearch, clearSearches: () => setSearches([]),
    profile, setProfile, toast, notify, quick, openQuick: setQuick, closeQuick: () => setQuick(null), resetAll,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
