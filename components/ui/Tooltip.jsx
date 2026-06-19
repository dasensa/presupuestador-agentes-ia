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
        className="text-base-subtle hover:text-brand-blue transition-colors"
      >
        <Info size={14} />
      </button>
      {open && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 text-body-sm text-base-text bg-base-bg border border-border animate-fade-in">
          {text}
        </span>
      )}
    </span>
  );
}
