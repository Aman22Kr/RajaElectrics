import { Link } from 'react-router-dom';
import { BY_SLUG } from '../data/products';
import { useStore } from '../context/StoreContext';
import usePageTitle from '../hooks/usePageTitle';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  usePageTitle('Saved items');
  const { wishlist } = useStore();
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <h1 className="text-2xl font-bold">Saved items</h1>
      <p className="mt-1 text-sm text-slate-500">Saved in this browser only.</p>
      {wishlist.length === 0 ? (
        <div className="mt-8 text-center"><p>You haven't saved anything yet.</p><Link to="/collections/all" className="mt-4 inline-block bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-brand">Shop our products</Link></div>
      ) : <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">{wishlist.map((s, i) => <ProductCard key={s} product={BY_SLUG[s]} index={i} />)}</div>}
    </div>
  );
}
