import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';

export default function UseCaseList({ casos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {casos.map(caso => (
        <Link
          key={caso.id}
          href={`/servicios/${caso.slug}`}
          className="group flex items-center justify-between p-4 rounded-xl bg-navy-800/30 border border-navy-600/30 hover:border-gold-400/30 hover:bg-navy-700/20 transition-all"
        >
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white text-sm group-hover:text-gold-400 transition-colors">{caso.c}</div>
            <div className="text-xs text-slate-500 mt-1">{caso.prob} &middot; Desde &euro;{caso.ini.toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-2 ml-3 shrink-0">
            <Badge type={caso.t} />
            <ArrowRight size={14} className="text-slate-600 group-hover:text-gold-400 transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}
