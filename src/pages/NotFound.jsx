import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-2 text-2xl font-bold">We couldn't find that page</h1>
      <p className="mt-2 text-slate-500">The link may be old, or the item isn't part of this demo catalogue.</p>
      <Link to="/" className="mt-6 inline-block bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand">Back to home</Link>
    </div>
  );
}
