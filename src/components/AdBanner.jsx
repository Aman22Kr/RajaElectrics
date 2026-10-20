export default function AdBanner() {
  return (
    <aside aria-label="Advertisement" className="border-t border-slate-200 bg-slate-50 py-3">
      <div className="mx-auto flex h-20 max-w-[728px] flex-col items-center justify-center border border-dashed border-slate-300 bg-white text-slate-400">
        <span className="text-[10px] uppercase tracking-widest">Advertisement</span>
        <span className="text-xs">Ad space · 728 × 90</span>
      </div>
    </aside>
  );
}
