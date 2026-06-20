import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-border bg-[#0b1017] p-8 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(255,198,46,0.16),transparent_24rem)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:items-end">
            <div>
              <span className="text-label uppercase text-brand-amber tracking-widest mb-4 block">
                Siguiente paso
              </span>
              <h2 className="text-display-sm md:text-display-md font-serif text-base-text mb-4 max-w-2xl">
                Descubre el ROI de la IA en tu sector
              </h2>
              <p className="text-body-lg text-base-muted font-light max-w-2xl">
                Usa nuestro presupuestador para calcular el impacto real de los agentes IA en tu empresa. Sin compromiso.
              </p>
            </div>
            <Button href="/presupuestador" variant="primary" size="lg">
              Calcular ahora
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
