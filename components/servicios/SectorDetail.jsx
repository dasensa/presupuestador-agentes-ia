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
  const minPrice = Math.min(...casos.map(c => c.ini));

  return (
    <section id={anchor} className="py-12 scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel */}
        <div className="ds-card p-6 lg:p-8">
          <Icon size={24} className="text-brand-mint mb-4" />
          <h2 className="font-serif italic text-display-sm text-base-text mb-3">{name}</h2>
          <p className="text-body-sm text-base-muted leading-relaxed mb-6">{meta.longDescription}</p>

          <div className="space-y-3 mb-6 pt-4 border-t border-border">
            <div className="flex justify-between text-body-sm">
              <span className="text-base-subtle">Casos de uso</span>
              <span className="font-serif italic text-brand-blue-soft">{casos.length}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-base-subtle">Desde</span>
              <span className="font-serif italic text-brand-blue-soft">&euro;{minPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-base-subtle">Tipos</span>
              <span className="text-base-muted">{[...new Set(casos.map(c => c.t))].join(', ')}</span>
            </div>
          </div>

          <Button
            href={`/presupuestador?sector=${encodeURIComponent(name)}`}
            variant="primary"
            size="sm"
            className="w-full"
          >
            Presupuestar sector
          </Button>
        </div>

        {/* Right grid */}
        <div className="lg:col-span-2">
          <UseCaseList casos={casos} />
        </div>
      </div>
    </section>
  );
}
