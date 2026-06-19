import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { STATS } from '../../lib/constants';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <span className="text-label uppercase text-brand-mint tracking-widest mb-6 block">
              Consultoria especializada en IA
            </span>

            <h1 className="text-display-lg md:text-display-xl font-serif text-base-text mb-6">
              Transformamos empresas con{' '}
              <em className="text-brand-blue-soft italic">Inteligencia Artificial</em>
            </h1>

            <p className="text-body-lg text-base-muted font-light max-w-lg mb-10 leading-relaxed">
              Agentes IA especializados por sector. Analizamos tu caso, detectamos sinergias y garantizamos un ROI positivo desde el primer ano.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/presupuestador" variant="primary" size="lg">
                Calcular ROI
                <ArrowRight size={16} />
              </Button>
              <Button href="/servicios" variant="secondary" size="lg">
                Conocer servicios
              </Button>
            </div>
          </div>

          {/* Right column — metrics */}
          <div className="hidden lg:block border-l border-border pl-16">
            <div className="space-y-10">
              {STATS.slice(0, 3).map((stat, i) => (
                <div key={i}>
                  <div className="font-serif italic text-[48px] leading-none text-brand-blue-soft">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-body-sm text-base-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-border">
              <div className="font-serif italic text-[64px] leading-none text-brand-mint">
                {STATS[3].value}{STATS[3].suffix}
              </div>
              <div className="text-body-sm text-base-muted mt-1">{STATS[3].label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
