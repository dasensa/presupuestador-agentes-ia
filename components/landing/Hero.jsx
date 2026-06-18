import Button from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(251,191,36,0.06) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Consultoria especializada en IA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 animate-slide-up">
            Transformamos empresas con{' '}
            <span className="text-gradient-gold">Inteligencia Artificial</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Agentes IA especializados por sector. Analizamos tu caso, detectamos sinergias y garantizamos un ROI positivo desde el primer ano.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button href="/presupuestador" variant="primary" size="lg">
              Calcular ROI
              <ArrowRight size={18} />
            </Button>
            <Button href="/servicios" variant="secondary" size="lg">
              Conocer servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
