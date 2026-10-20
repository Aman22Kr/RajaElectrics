import { COLLECTIONS } from './menu';
import { PRODUCTS } from './products';

const norm = (s) => s.toLowerCase();
const itemsFor = (c) => PRODUCTS.filter((p) => c.cats.includes(p.cat) && (!c.brand || norm(p.brand).includes(norm(c.brand))));

export function resolveCollection(handle) {
  if (handle === 'all') return { title: 'All Products', handle, trail: [], children: [], items: PRODUCTS, fallbackFrom: null };
  if (handle === 'newest-arrival') return { title: 'New Arrivals', handle, trail: [], children: [], items: PRODUCTS.filter((p) => p.isNew), fallbackFrom: null };
  const c = COLLECTIONS.get(handle);
  if (!c) return null;
  const title = c.brand && c.label !== c.brand ? `${c.brand} ${c.label}` : c.label;
  const trail = c.trail.slice(0, -1);
  let items = itemsFor(c);
  let fallbackFrom = null;
  if (!items.length) {
    // No sample products for this brand/sub-category: show the nearest parent's products instead.
    for (let i = trail.length - 1; i >= 0 && !items.length; i--) {
      items = itemsFor(trail[i]);
      if (items.length) fallbackFrom = trail[i];
    }
    if (!items.length && c.cats.length) items = PRODUCTS.filter((p) => c.cats.includes(p.cat));
    if (items.length && !fallbackFrom) fallbackFrom = { label: 'this category' };
  }
  return { title, handle, trail, children: c.children, items, fallbackFrom };
}
