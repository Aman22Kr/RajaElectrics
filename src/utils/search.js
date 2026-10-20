import { PRODUCTS } from '../data/products';

export function searchProducts(query, cat = 'all') {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  return PRODUCTS.filter((p) => (cat === 'all' || p.cat === cat) && tokens.every((t) => p.hay.includes(t)));
}
