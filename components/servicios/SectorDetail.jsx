import {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
} from 'lucide-react';
import Button from '../ui/Button';
import UseCaseList from './UseCaseList';

const iconMap = {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
};

export default function SectorDetail({ name, meta, casos }) {
  const Icon = iconMap[meta.icon];
  const anchor = name.toLowerCase().replace('/', '-');

  return (
    <section id={anchor} className="py-12 scroll-mt-32">
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
              <Icon size={24} className="text-gold-400" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-white">{name}</h2>
              <p className="text-slate-400 text-sm mt-1">{meta.longDescription}</p>
            </div>
          </div>
          <Button
            href={`/presupuestador?sector=${encodeURIComponent(name)}`}
            variant="secondary"
            size="sm"
            className="shrink-0 self-start"
          >
            Presupuestar sector
          </Button>
        </div>

        <UseCaseList casos={casos} />

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          <span>{casos.length} casos de uso</span>
          <span>&middot;</span>
          <span>Desde &euro;{Math.min(...casos.map(c => c.ini)).toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}
