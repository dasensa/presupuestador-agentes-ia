import { Check } from 'lucide-react';
import Badge from '../ui/Badge';

export default function CaseCard({ caso, checked, onToggle, popular = false }) {
  const baseStyle = checked
    ? 'bg-[rgba(0,87,255,0.07)] border-brand-blue'
    : popular
      ? 'bg-[rgba(0,240,160,0.04)] border-[rgba(0,240,160,0.25)]'
      : 'border-border-subtle hover:border-border-hover';

  return (
    <label className={`flex items-center p-4 cursor-pointer transition-all border ${baseStyle}`}>
      <div className={`w-5 h-5 flex items-center justify-center shrink-0 border transition-colors ${
        checked ? 'bg-brand-blue border-brand-blue' : 'border-border-input'
      }`}>
        {checked && <Check size={12} className="text-white" />}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[14px] text-base-text">{caso.c}</span>
          {popular && !checked && (
            <span className="text-[9px] uppercase tracking-wider font-medium text-brand-mint bg-brand-mint/10 px-1.5 py-0.5">
              Mas popular
            </span>
          )}
        </div>
        <div className="text-body-sm text-base-subtle mt-0.5">
          &euro;{caso.ini.toLocaleString()} + &euro;{caso.rec.toLocaleString()}/mes &middot; {caso.prob}
        </div>
      </div>
      <Badge type={caso.t} className="ml-3 shrink-0" />
    </label>
  );
}
