import Image from 'next/image';
import Button from '../ui/Button';
import { ArrowRight, Bot, Gauge, Sparkles } from 'lucide-react';
import { STATS } from '../../lib/constants';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAzMiAxOCIgeG1sbnM9Imh0dHA6Ii93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIGZpbGw9IiMwNzBiMTEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjUiIHI9IjEyIiBmaWxsPSIjMzMyYjE0Ii8+PC9zdmc+';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(0,245,228,0.2),transparent_24rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-base-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-md border border-brand-mint/35 bg-gradient-to-br from-[#02d8ce] via-[#00bdb4] to-[#07837f] p-5 sm:p-8 lg:p-10 shadow-[0_0_80px_rgba(0,245,228,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.32),transparent_18rem)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.18),transparent_28%,rgba(4,16,18,0.28)_74%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded border border-[#041012]/20 bg-[#041012] px-3 py-1.5 text-label uppercase text-brand-mint mb-5">
                <Bot size={13} />
                IA aplicada a operaciones
              </span>

              <h1 className="text-[48px] md:text-[76px] lg:text-[88px] leading-[0.92] font-serif text-[#eafffb] mb-5">
                Inteligencia operativa para empresas
              </h1>

              <p className="text-body-lg text-[#052326]/78 font-medium max-w-xl mb-7 leading-relaxed">
                Agentes IA especializados por sector, conectados a tus procesos y medidos con ROI real desde el primer ano.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/presupuestador" variant="primary" size="lg" className="bg-[#041012] text-brand-mint hover:bg-[#0b2428]">
                  Calcular ROI
                  <ArrowRight size={16} />
                </Button>
                <Button href="/servicios" variant="secondary" size="lg" className="border-[#041012]/30 bg-white/15 text-[#041012] hover:bg-white/25">
                  Explorar agentes
                </Button>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 max-w-lg">
                {STATS.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded border border-[#041012]/18 bg-[#041012]/12 p-4 backdrop-blur">
                    <div className="text-[28px] leading-none font-serif text-[#eafffb]">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="mt-2 text-[11px] leading-snug text-[#052326]/75">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[470px]">
              <div className="absolute inset-x-0 bottom-0 h-[390px] overflow-hidden rounded-md border border-white/25 bg-[#061214]">
                <Image
                  src="/images/ai-luminous/hero.png"
                  alt="Equipo trabajando con automatizacion e inteligencia artificial"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-center opacity-85 saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061214] via-[#061214]/15 to-transparent" />
              </div>

              <div className="absolute left-0 top-6 w-[260px] rounded-md border border-white/35 bg-[#061214]/92 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-base-text">Agent stack</span>
                  <Sparkles size={16} className="text-brand-mint" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-1">
                  <span className="h-2 rounded bg-brand-mint" />
                  <span className="h-2 rounded bg-brand-mint/70" />
                  <span className="h-2 rounded bg-brand-mint/35" />
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-base-muted">
                  Venta, soporte y operaciones conectadas en un unico marco de automatizacion.
                </p>
              </div>

              <div className="absolute right-0 bottom-8 hidden w-[235px] rounded-md border border-white/35 bg-[#061214]/92 p-4 backdrop-blur-md sm:block">
                <div className="flex items-center gap-2 text-body-sm text-base-text">
                  <Gauge size={16} className="text-brand-mint" />
                  Precision ROI
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-brand-mint" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-base-muted">
                  <span>Impacto estimado</span>
                  <span>82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ['Deteccion predictiva', '/images/ai-luminous/banca.png'],
            ['Agentes autonomos', '/images/ai-luminous/tech.png'],
            ['Soporte inteligente', '/images/ai-luminous/telecom.png'],
          ].map(([title, image]) => (
            <div key={title} className="group overflow-hidden rounded-md border border-brand-mint/35 bg-[#081116]">
              <div className="relative h-40">
                <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-75 transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081116] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-[20px] text-base-text">{title}</h3>
                  <span className="text-[11px] text-brand-mint">[inteligencia sectorial]</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
