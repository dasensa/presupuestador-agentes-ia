import { BarChart3, GitMerge, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

const icons = { BarChart3, GitMerge, TrendingUp };

const VALUE_PROPS = [
  {
    icon: 'BarChart3',
    title: 'Analisis Sectorial',
    description: 'Casos de uso validados y adaptados a las necesidades especificas de cada industria con datos reales del mercado.',
  },
  {
    icon: 'GitMerge',
    title: 'Sinergias Inteligentes',
    description: 'Deteccion automatica de sinergias entre agentes para maximizar el retorno de la inversion con descuentos por bundling.',
  },
  {
    icon: 'TrendingUp',
    title: 'ROI Garantizado',
    description: 'Modelos de calculo probados que aseguran un retorno positivo desde el primer ano con metricas transparentes.',
  },
];

export default function ValueProposition() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Por que AgentIA"
          title="Tu partner estrategico en IA"
          description="Combinamos conocimiento sectorial profundo con tecnologia de vanguardia para entregar resultados medibles."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((prop, i) => {
            const Icon = icons[prop.icon];
            return (
              <Card key={i} hover>
                <div className="w-10 h-10 flex items-center justify-center mb-5 border border-border">
                  <Icon size={20} className="text-brand-mint" />
                </div>
                <h3 className="font-serif text-[20px] text-base-text mb-3">{prop.title}</h3>
                <p className="text-body-sm text-base-muted leading-relaxed">{prop.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
