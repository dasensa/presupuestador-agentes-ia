import { useState, useMemo } from 'react';
import Head from 'next/head';
import { MessageSquareText, Sparkles } from 'lucide-react';
import { SITE } from '../lib/constants';
import { LuminousBackground, GlassCard, SectionBadge } from '../components/luminous/LuminousKit';
import Badge from '../components/ui/Badge';
import ChatWidgetDemo from '../components/demo/ChatWidgetDemo';
import VozWidgetDemo from '../components/demo/VozWidgetDemo';
import { DEMOS } from '../components/demo/demoData';

const SECTORS = [...new Set(DEMOS.map((d) => d.sector))];

export default function DemoPage() {
  const [activeSector, setActiveSector] = useState(SECTORS[0]);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);

  const bySector = useMemo(
    () =>
      DEMOS.reduce((acc, d) => {
        (acc[d.sector] = acc[d.sector] || []).push(d);
        return acc;
      }, {}),
    [],
  );

  const sectorDemos = bySector[activeSector] || [];
  const demo = sectorDemos[activeDemoIndex] ?? sectorDemos[0];

  function handleSectorChange(sector) {
    setActiveSector(sector);
    setActiveDemoIndex(0);
  }

  return (
    <>
      <Head>
        <title>Demo interactiva de agentes — AgentIA</title>
        <meta name="description" content="Prueba simulaciones interactivas de agentes AgentIA: Chat, Voz, Automatización e Integración, con escenarios reales por sector." />
        <link rel="canonical" href={`${SITE.url}/demo`} />
        <meta property="og:title" content="Demo interactiva de agentes — AgentIA" />
        <meta property="og:description" content="Mira un agente de AgentIA funcionando sobre una web simulada, antes de desplegarlo en la tuya." />
        <meta property="og:url" content={`${SITE.url}/demo`} />
      </Head>

      <LuminousBackground>
        <section className="pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionBadge icon={MessageSquareText}>Demo interactiva</SectionBadge>
            <h1 className="mt-6 font-serif text-[40px] leading-[1.05] text-slate-950 md:text-[58px]">
              Así se comporta un agente AgentIA
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Simulaciones por sector y tipo de agente, montadas sobre un sitio web de ejemplo.
              Elige sector, selecciona el caso y dale a reproducir.
            </p>

            {/* Sector selector */}
            <div className="mt-10 flex flex-wrap gap-2">
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  type="button"
                  aria-pressed={activeSector === sector}
                  onClick={() => handleSectorChange(sector)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
                    activeSector === sector
                      ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-[0_8px_24px_rgba(37,99,235,0.12)]'
                      : 'border-slate-200 bg-white/70 text-slate-500 hover:border-cyan-200 hover:text-slate-800'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>

            {/* Demo selector — 3 demos per sector */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {sectorDemos.map((d, i) => (
                <button
                  key={d.code}
                  type="button"
                  aria-pressed={activeDemoIndex === i}
                  onClick={() => setActiveDemoIndex(i)}
                  className={`flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all ${
                    activeDemoIndex === i
                      ? 'border-blue-300 bg-blue-50 shadow-[0_18px_45px_rgba(37,99,235,0.12)]'
                      : 'border-slate-200 bg-white/70 hover:border-cyan-200'
                  }`}
                >
                  <Badge type={d.channel} />
                  <span className="font-serif text-[15px] text-slate-950">{d.title}</span>
                </button>
              ))}
            </div>

            {/* Demo tagline */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{demo?.sector}</span>
              <p className="text-sm italic text-slate-500">{demo?.tagline}</p>
            </div>

            {/* Demo widget */}
            <div className="mt-6">
              {demo && (
                demo.channel === 'Voz'
                  ? <VozWidgetDemo key={demo.code} demo={demo} />
                  : <ChatWidgetDemo key={demo.code} demo={demo} />
              )}
            </div>

            {/* KPIs */}
            {demo && (
              <GlassCard className="mt-8 p-6">
                <SectionBadge icon={Sparkles}>KPIs que gobiernan este agente</SectionBadge>
                <div className="mt-4 flex flex-wrap gap-2">
                  {demo.kpis.map((kpi) => (
                    <span key={kpi} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {kpi}
                    </span>
                  ))}
                </div>
              </GlassCard>
            )}

            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              Simulación construida a partir del diseño de arquitectura de cada agente (patrón de nodos n8n, gobierno y KPIs).
              No está conectada a un despliegue n8n real ni a datos de clientes — el sitio web, los pedidos, productos e importes mostrados son ilustrativos.
            </div>
          </div>
        </section>
      </LuminousBackground>
    </>
  );
}
