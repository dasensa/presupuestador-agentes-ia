import Badge from '../ui/Badge';

export default function UseCaseList({ casos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {casos.map(caso => (
        <div
          key={caso.id}
          className="flex items-center justify-between p-4 rounded-xl bg-navy-800/30 border border-navy-600/30 hover:border-navy-600/60 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white text-sm">{caso.c}</div>
            <div className="text-xs text-slate-500 mt-1">{caso.prob} &middot; Desde &euro;{caso.ini.toLocaleString()}</div>
          </div>
          <Badge type={caso.t} className="ml-3 shrink-0" />
        </div>
      ))}
    </div>
  );
}
