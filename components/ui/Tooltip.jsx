import { useState } from 'react';
import { Info } from 'lucide-react';

export default function Tooltip({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex ml-1.5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-slate-500 hover:text-gold-400 transition-colors"
      >
        <Info size={14} />
      </button>
      {open && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 text-xs text-slate-200 bg-navy-700 border border-navy-600 rounded-lg shadow-xl animate-fade-in">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-navy-700" />
        </span>
      )}
    </span>
  );
}
