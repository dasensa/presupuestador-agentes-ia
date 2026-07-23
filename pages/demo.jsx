import { useState } from 'react';
import Head from 'next/head';
import { MessageSquareText, Sparkles } from 'lucide-react';
import { SITE } from '../lib/constants';
import { LuminousBackground, GlassCard, SectionBadge } from '../components/luminous/LuminousKit';
import Badge from '../components/ui/Badge';
import ChatWidgetDemo from '../components/demo/ChatWidgetDemo';
import { DEMOS } from '../components/demo/demoData';

export default function DemoPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const demo = DEMOS[activeIndex];

  return (
    <>
      <Head>
        <title>Demo interactiva de agentes — AgentIA</title>
        <meta name="description" content="Prueba una simulación interactiva de tres agentes del catálogo AgentIA: chatbot recomendador, chat postventa y automatización de devoluciones." />
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
              Una simulación fiel al diseño de arquitectura de cada agente, montada sobre una web de ejemplo.
              Elige un caso y dale a reproducir.
            </p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {DEMOS.map((d, i) => (
                <button
                  key={d.code}
                  type="button"
                  aria-pressed={activeIndex === i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    activeIndex === i
                      ? 'border-blue-300 bg-blue-50 shadow-[0_18px_45px_rgba(37,99,235,0.12)]'
                      : 'border-slate-200 bg-white/70 hover:border-cyan-200'
                  }`}
                >
                  <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {d.code} · {d.sector}
                  </span>
                  <span className="mt-0.5 block font-serif text-[15px] text-slate-950">{d.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Badge type={demo.channel} />
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{demo.sector}</span>
              <p className="text-sm italic text-slate-500">{demo.tagline}</p>
            </div>

            <div className="mt-6">
              <ChatWidgetDemo key={demo.code} demo={demo} />
            </div>

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
