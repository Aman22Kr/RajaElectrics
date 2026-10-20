import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import useLocalStorage from '../hooks/useLocalStorage';
import usePageTitle from '../hooks/usePageTitle';
import { inr } from '../utils/format';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  usePageTitle('Cart');
  const { cartLines, cartTotal, setQty, removeFromCart, clearCart } = useStore();
  // Draft contains no payment or password data.
  const [draft, setDraft] = useLocalStorage('checkoutDraft', { name: '', phone: '', city: '' }, (v) => v && typeof v.name === 'string');
  const [done, setDone] = useState(false);
  const field = 'w-full border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none';

  if (done) return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Demo order recorded locally</h1>
      <p className="mt-3 text-slate-600">No payment was taken and nothing was sent to a server. This is a demonstration checkout.</p>
      <Link to="/" className="mt-6 inline-block bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand">Continue shopping</Link>
    </div>
  );
  if (!cartLines.length) return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Your cart is empty</h1>
      <Link to="/collections/all" className="mt-6 inline-block bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand">Shop our products</Link>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Your cart</h1><button onClick={clearCart} className="text-sm text-slate-500 hover:text-red-600">Empty cart</button></div>
        <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {cartLines.map(({ product: p, qty }) => (
            <li key={p.slug} className="flex gap-4 py-4">
              <Link to={`/products/${p.slug}`} className="w-24 shrink-0"><ProductImage product={p} iconSize={32} className="aspect-square w-full" /></Link>
              <div className="flex-1">
                <Link to={`/products/${p.slug}`} className="line-clamp-2 text-sm font-medium hover:text-brand">{p.title}</Link>
                <p className="mt-1 text-sm font-bold">{inr(p.sale)}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border border-slate-300">
                    <button aria-label="Decrease" onClick={() => setQty(p.slug, qty - 1)} className="p-2 hover:bg-slate-100"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(p.slug, qty + 1)} className="p-2 hover:bg-slate-100"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(p.slug)} aria-label="Remove item" className="text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="hidden w-32 text-right text-sm font-bold sm:block">{inr(p.sale * qty)}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); clearCart(); setDone(true); }} className="h-fit space-y-3 border border-slate-200 p-5">
        <h2 className="text-lg font-bold">Order summary</h2>
        <p className="flex justify-between text-sm"><span>Subtotal</span><strong>{inr(cartTotal)}</strong></p>
        <p className="bg-amber-50 p-2 text-xs text-amber-800">Demo checkout: no payment is processed and no order is placed.</p>
        <input required className={field} placeholder="Full name" aria-label="Full name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <input className={field} placeholder="Phone (optional)" aria-label="Phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
        <input required className={field} placeholder="City" aria-label="City" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
        <button className="w-full bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-dark">Place demo order</button>
      </form>
    </div>
  );
}
