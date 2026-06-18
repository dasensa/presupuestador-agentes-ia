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
    <div className="glass-card p-4 mb-8">
      <div className="flex gap-2 flex-wrap">
        {sectores.map(s => {
          const meta = SECTORES_META[s];
          const Icon = meta ? iconMap[meta.icon] : null;
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selected === s
                  ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30 shadow-sm'
                  : 'bg-navy-700/30 text-slate-400 border border-transparent hover:bg-navy-700/60 hover:text-white'
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
