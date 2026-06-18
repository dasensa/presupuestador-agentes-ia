import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-card p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 via-transparent to-accent-500/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Descubre el ROI de la IA en tu sector
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
              Usa nuestro presupuestador para calcular el impacto real de los agentes IA en tu empresa. Sin compromiso.
            </p>
            <Button href="/presupuestador" variant="primary" size="lg">
              Calcular ahora
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
