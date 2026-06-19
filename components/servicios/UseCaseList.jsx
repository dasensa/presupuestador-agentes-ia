import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { calcBeneficio } from '../../lib/calculations';

export default function UseCaseList({ casos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {casos.map(caso => {
        const roi = calcBeneficio(caso.t, caso.ini, caso.rec);
        return (
          <Link
            key={caso.id}
            href={`/servicios/${caso.slug}`}
            className="group ds-card-hover p-4 flex items-center justify-between transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[15px] text-base-text group-hover:text-brand-blue-soft transition-colors">{caso.c}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge type={caso.t} />
                <span className="text-body-sm text-base-subtle">&euro;{caso.ini.toLocaleString()}</span>
                <span className="text-body-sm text-brand-mint">+{Math.round(roi / (caso.ini + caso.rec * 12) * 100)}% ROI</span>
              </div>
            </div>
            <ArrowRight size={14} className="text-base-subtle group-hover:text-brand-blue transition-colors ml-3 shrink-0" />
          </Link>
        );
      })}
    </div>
  );
}
