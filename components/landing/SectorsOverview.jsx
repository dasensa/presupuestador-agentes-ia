import Link from 'next/link';
import {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code, ArrowRight,
} from 'lucide-react';
import { SECTORES_META, getCasosBySector } from '../../data/casos';
import SectionHeading from '../ui/SectionHeading';

const iconMap = {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
};

export default function SectorsOverview() {
  const sectores = Object.entries(SECTORES_META);

  return (
    <section className="py-20 md:py-28 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sectores"
          title="Soluciones para cada industria"
          description="Mas de 70 casos de uso distribuidos en 10 sectores clave. Cada agente esta disenado para resolver problemas reales de tu industria."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sectores.map(([name, meta]) => {
            const Icon = iconMap[meta.icon];
            const caseCount = getCasosBySector(name).length;
            return (
              <Link
                key={name}
                href={`/servicios#${name.toLowerCase().replace('/', '-')}`}
                className="group glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/30 hover:shadow-lg hover:shadow-gold-400/5"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center mb-3 group-hover:bg-gold-400/20 transition-colors">
                  <Icon size={20} className="text-gold-400" />
                </div>
                <h3 className="font-display font-bold text-white text-sm mb-1">{name}</h3>
                <p className="text-slate-500 text-xs mb-3">{caseCount} casos de uso</p>
                <div className="flex items-center gap-1 text-gold-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver mas <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
