import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { QUICK_SETTINGS as S } from '../config';
import useLocalStorage from '../hooks/useLocalStorage';
import usePageTitle from '../hooks/usePageTitle';

export default function Contact() {
  usePageTitle('Contact us');
  const [draft, setDraft] = useLocalStorage('contactDraft', { name: '', email: '', message: '' }, (v) => v && typeof v.message === 'string');
  const [sent, setSent] = useState(false);
  const field = 'w-full border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none';
  return (
    <div className="mx-auto grid max-w-[1000px] gap-10 px-4 py-10 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-bold">Need help?</h1>
        <p className="mt-3 flex items-center gap-2 text-sm"><Phone size={16} className="text-brand" />{S.phone}</p>
        <p className="mt-2 flex items-center gap-2 text-sm"><Mail size={16} className="text-brand" />{S.email}</p>
        <p className="mt-4 text-xs text-slate-500">Placeholder contact details: edit them in src/config.js.</p>
      </div>
      {sent ? (
        <div className="bg-brand-light p-6 text-sm"><p className="font-bold">Message saved on this device.</p><p className="mt-2">This demo form does not send anything to a server.</p>
          <button onClick={() => { setSent(false); setDraft({ name: '', email: '', message: '' }); }} className="mt-4 font-semibold text-brand">Write another</button></div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
          <input required className={field} placeholder="Name" aria-label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <input type="email" required className={field} placeholder="Email" aria-label="Email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          <textarea required rows={5} className={field} placeholder="How can we help?" aria-label="Message" value={draft.message} onChange={(e) => setDraft({ ...draft, message: e.target.value })} />
          <button className="w-full bg-ink py-3 text-sm font-semibold text-white hover:bg-brand">Send (demo)</button>
          <p className="text-xs text-slate-500">Drafts are kept in your browser so you don't lose them on refresh.</p>
        </form>
      )}
    </div>
  );
}
