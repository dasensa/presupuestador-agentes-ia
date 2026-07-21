import Image from 'next/image';
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
    title: 'ROI orientativo',
    description: 'Modelos de calculo probados que aseguran un retorno positivo desde el primer ano con metricas transparentes.',
  },
];

export default function ValueProposition() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end mb-14">
          <SectionHeading
            eyebrow="Por que AgentIA"
            title="IA aplicada con datos reales"
            description="Combinamos conocimiento sectorial profundo con tecnologia de vanguardia para entregar resultados medibles."
            align="left"
          />

          <div className="relative h-[320px] overflow-hidden rounded-md border border-brand-mint/30 bg-[#071014]">
            <Image
              src="/images/ai-luminous/tech.png"
              alt="Equipo de tecnologia coordinando automatizaciones de IA"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-80 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071014]/90 via-[#071014]/25 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-md border border-brand-mint/35 bg-[#061214]/88 p-4 backdrop-blur-md">
              <div className="text-[28px] leading-none font-serif text-brand-mint">Datos</div>
              <div className="mt-1 text-[11px] text-base-muted">ROI medio proyectado</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((prop, i) => {
            const Icon = icons[prop.icon];
            return (
              <Card key={i} hover>
                <div className="w-11 h-11 flex items-center justify-center mb-5 rounded bg-brand-mint text-[#041012]">
                  <Icon size={20} />
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
