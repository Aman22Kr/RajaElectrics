import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import usePageTitle from '../hooks/usePageTitle';

export default function Account() {
  usePageTitle('My account');
  const { profile, setProfile, wishlist, cartCount, recent, resetAll, notify } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const field = 'w-full border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none';
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold">{profile ? `Hello, ${profile.name}` : 'Login / Signup'}</h1>
      <p className="mt-2 bg-amber-50 p-3 text-sm text-amber-800">This is a demo profile, not a real account. No password is asked for, nothing is sent to a server, and the details stay in this browser and device only.</p>
      {profile ? (
        <div className="mt-6 space-y-4 text-sm">
          <p>Saved items: <strong>{wishlist.length}</strong> · Items in cart: <strong>{cartCount}</strong> · Recently viewed: <strong>{recent.length}</strong></p>
          <div className="flex gap-3">
            <button onClick={() => { setProfile(null); notify('Signed out'); }} className="border border-ink px-4 py-2 font-semibold hover:bg-ink hover:text-white">Sign out</button>
            <button onClick={() => window.confirm('Clear cart, saved items, history and settings from this browser?') && resetAll()} className="border border-red-300 px-4 py-2 font-semibold text-red-600 hover:bg-red-50">Clear all local data</button>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setProfile({ name: name.trim(), email: email.trim() }); notify('Demo profile saved on this device'); }} className="mt-6 space-y-3">
          <input required className={field} placeholder="Your name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" className={field} placeholder="Email (optional)" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="w-full bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-dark">Create demo profile</button>
        </form>
      )}
    </div>
  );
}
