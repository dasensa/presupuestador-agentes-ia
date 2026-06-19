import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 md:p-16 text-center" style={{ background: 'rgba(0,87,255,0.08)', border: '1px solid rgba(0,87,255,0.2)' }}>
          <h2 className="text-display-sm md:text-display-md font-serif text-base-text mb-4">
            Descubre el ROI de la IA{' '}
            <em className="text-brand-blue-soft italic">en tu sector</em>
          </h2>
          <p className="text-body-lg text-base-muted font-light max-w-2xl mx-auto mb-8">
            Usa nuestro presupuestador para calcular el impacto real de los agentes IA en tu empresa. Sin compromiso.
          </p>
          <Button href="/presupuestador" variant="primary" size="lg">
            Calcular ahora
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
