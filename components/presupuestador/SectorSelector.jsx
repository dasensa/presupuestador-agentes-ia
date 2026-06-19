import {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
} from 'lucide-react';
import { SECTORES_META } from '../../data/casos';

const iconMap = {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
};

export default function SectorSelector({ sectores, selected, onChange }) {
  return (
    <div className="ds-card p-4 mb-8">
      <div className="flex gap-2 flex-wrap">
        {sectores.map(s => {
          const meta = SECTORES_META[s];
          const Icon = meta ? iconMap[meta.icon] : null;
          const isSelected = selected === s;
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`flex items-center gap-2 px-4 py-2 text-body-sm font-medium transition-all ${
                isSelected
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/40'
                  : 'text-base-muted border border-transparent hover:text-base-text hover:border-border'
              }`}
            >
              {Icon && <Icon size={14} />}
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
