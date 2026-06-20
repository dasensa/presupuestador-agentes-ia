import Image from 'next/image';
import Button from '../ui/Button';
import { ArrowRight, Bot, Database, Gauge } from 'lucide-react';
import { STATS } from '../../lib/constants';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAzMiAxOCIgeG1sbnM9Imh0dHA6Ii93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIGZpbGw9IiMwNzBiMTEiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjUiIHI9IjEyIiBmaWxsPSIjMzMyYjE0Ii8+PC9zdmc+';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,198,46,0.2),transparent_24rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-base-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.035] px-3 py-1.5 text-label uppercase text-brand-amber mb-6">
              <Bot size={13} />
              Consultoria especializada en IA
            </span>

            <h1 className="text-[46px] md:text-[66px] leading-[1.04] font-serif text-base-text mb-6">
              Construimos el futuro con agentes de IA
            </h1>

            <p className="text-body-lg text-base-muted font-light max-w-xl mb-8 leading-relaxed">
              Automatizacion inteligente para operaciones complejas: casos de uso por sector, sinergias entre agentes y ROI medible desde el primer ano.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button href="/presupuestador" variant="primary" size="lg">
                Calcular ROI
                <ArrowRight size={16} />
              </Button>
              <Button href="/servicios" variant="secondary" size="lg">
                Conocer servicios
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-lg">
              {STATS.slice(0, 3).map((stat) => (
                <div key={stat.label} className="border border-border bg-white/[0.035] p-4">
                  <div className="text-[28px] leading-none font-serif text-base-text">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="mt-2 text-[11px] leading-snug text-base-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-10 bg-[radial-gradient(circle_at_60%_40%,rgba(255,198,46,0.18),transparent_18rem)]" />
            <div className="relative h-[520px] overflow-hidden border border-border bg-[#0c1118]">
              <Image
                src="/images/hero-bg.jpg"
                alt="Equipo trabajando con automatizacion e inteligencia artificial"
                fill
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b11] via-[#070b11]/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b11] via-transparent to-transparent" />
            </div>

            <div className="absolute left-0 bottom-8 w-[260px] border border-border bg-[#111720]/92 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-amber text-[#141008]">
                  <Gauge size={20} />
                </div>
                <div>
                  <div className="text-body-sm text-base-text">ROI operativo</div>
                  <div className="text-[11px] text-base-muted">Priorizacion por impacto y coste</div>
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-white/10">
                <div className="h-full w-[76%] bg-brand-amber" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-base-muted">
                <span>Sinergias</span>
                <span>76%</span>
              </div>
            </div>

            <div className="absolute right-0 top-10 hidden w-[220px] border border-border bg-[#111720]/88 p-4 backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 text-body-sm text-base-text">
                <Database size={16} className="text-brand-amber" />
                Datos conectados
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-base-muted">
                Casos, procesos, canales y sistemas integrados en una hoja de ruta clara.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
