import { useState } from 'react';
import { Wind, Snowflake, Shirt, Smartphone, Speaker, Tv, Fan, Coffee, Zap, Flame, Droplets, UtensilsCrossed, Lock, Package } from 'lucide-react';
import { IMAGES } from '../data/images';

const ICONS = {
  'air-purifier': Wind, refrigerator: Snowflake, 'deep-freezer': Snowflake, 'visi-cooler': Snowflake, 'washing-machine': Shirt, dryer: Shirt,
  mobile: Smartphone, audio: Speaker, tv: Tv, ac: Snowflake, cooler: Fan, coffee: Coffee, vacuum: Zap, kitchen: UtensilsCrossed,
  'built-in': UtensilsCrossed, 'water-purifier': Droplets, heater: Flame, dishwasher: Droplets, microwave: UtensilsCrossed, 'smart-home': Lock,
};

export default function ProductImage({ product, className = '', iconSize = 56 }) {
  const [bad, setBad] = useState(false);
  const src = IMAGES[product.slug];
  const Icon = ICONS[product.cat] || Package;
  if (src && !bad) {
    return <img src={src} alt={product.title} loading="lazy" onError={() => setBad(true)} className={`object-contain bg-white ${className}`} />;
  }
  return (
    <div role="img" aria-label={product.title} className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 text-slate-400 ${className}`}>
      <Icon size={iconSize} strokeWidth={1.25} />
      <span className="mt-2 px-2 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">{product.brand}</span>
    </div>
  );
}
