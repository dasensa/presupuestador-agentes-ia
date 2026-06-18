import Badge from '../ui/Badge';

export default function CaseCard({ caso, checked, onToggle }) {
  return (
    <label className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${
      checked
        ? 'bg-gold-400/5 border-gold-400/30'
        : 'bg-navy-800/30 border-navy-600/30 hover:bg-navy-700/30 hover:border-navy-600/50'
    }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4 rounded border-navy-600 text-gold-400 focus:ring-gold-400/30 focus:ring-offset-0 bg-navy-800 shrink-0"
      />
      <div className="ml-3 flex-1 min-w-0">
        <div className="font-semibold text-white text-sm">{caso.c}</div>
        <div className="text-xs text-slate-500 mt-0.5">
          &euro;{caso.ini.toLocaleString()} + &euro;{caso.rec.toLocaleString()}/mes &middot; {caso.prob}
        </div>
      </div>
      <Badge type={caso.t} className="ml-3 shrink-0" />
    </label>
  );
}
