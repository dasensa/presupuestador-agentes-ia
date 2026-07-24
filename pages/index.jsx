import Head from 'next/head';
import { ArrowRight, Gauge, Layers3, LineChart, Map, Route } from 'lucide-react';
import { SECTORES_META, getCasosBySector } from '../data/casos';
import { SITE } from '../lib/constants';
import {
  AgentConstellation,
  AgentFunctionCard,
  GlassCard,
  LuminousBackground,
  LuminousButton,
  MetricCard,
  ProcessFlowCard,
  RoiPreviewCard,
  SectionBadge,
  SectorCard,
  agentFunctions,
  processSteps,
} from '../components/luminous/LuminousKit';

export default function HomePage() {
  const sectores = Object.entries(SECTORES_META);

  return (
    <>
      <Head>
        <title>{`${SITE.name} — Construye tu agente IA`}</title>
        <meta
          name="description"
          content="Describe el agente IA que necesitas y genera automáticamente una primera versión con controles, pruebas y despliegue por fases."
        />
        <link rel="canonical" href={SITE.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${SITE.name} — Construye tu agente IA`} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:url" content={SITE.url} />
        <meta property="og:image" content={`${SITE.url}/images/verticals-editorial/banca.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <LuminousBackground>
        <section className="pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <SectionBadge>{'Procesos -> Agentes -> Impacto -> ROI'}</SectionBadge>
                <h1 className="mt-7 max-w-4xl font-serif text-[54px] leading-[0.96] tracking-tight text-slate-950 md:text-[82px]">
                  Solicita tu agente. AgentIA construye la primera versión.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                  Describe el objetivo, el canal y la autonomía. Nuestra fábrica de agentes genera la especificación, los controles y las pruebas antes de crear un entorno seguro de demostración.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <LuminousButton href="/crear-agente">
                    Crear mi agente
                    <ArrowRight size={16} />
                  </LuminousButton>
                  <LuminousButton href="/servicios" variant="secondary">
                    Ver agentes por sector
                  </LuminousButton>
                </div>
              </div>
              <AgentConstellation />
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <MetricCard value="70+" label="Plantillas sectoriales" description="Puntos de partida reutilizables para construir más rápido." icon={Layers3} />
              <MetricCard value="10" label="Sectores" description="Mapas de agentes adaptados a cada industria." icon={Map} />
              <MetricCard value="Evals" label="Antes de desplegar" description="Pruebas de calidad, seguridad, coste y escalado humano." icon={Gauge} />
              <MetricCard value="Sandbox" label="Antes de producción" description="Primera versión aislada, controlada y reversible." icon={Route} />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionBadge icon={LineChart}>De proceso a agente</SectionBadge>
              <h2 className="mt-5 font-serif text-display-md text-slate-950">Convierte procesos repetitivos en agentes inteligentes</h2>
              <p className="mt-4 text-body-lg text-slate-500">
                De la solicitud al sandbox: una ruta automatizada con aprobación antes de producción.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {processSteps.map((item) => <ProcessFlowCard key={item.step} {...item} />)}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionBadge>Agent Factory</SectionBadge>
                <h2 className="mt-5 font-serif text-display-md text-slate-950">Agentes especializados construidos desde plantillas</h2>
              </div>
              <p className="max-w-xl text-body text-slate-500">
                La plataforma combina módulos, conocimiento, controles y evaluaciones según tu proceso, canal y nivel de autonomía.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agentFunctions.map((agent) => <AgentFunctionCard key={agent.title} {...agent} />)}
            </div>
            <div className="mt-8 text-center">
              <LuminousButton href="/servicios" variant="secondary">
                Explorar todos los agentes y sectores
                <ArrowRight size={16} />
              </LuminousButton>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionBadge>Sectores inteligentes</SectionBadge>
                <h2 className="mt-5 font-serif text-display-md text-slate-950">IA diseñada para cada sector</h2>
              </div>
              <p className="max-w-xl text-body text-slate-500">
                Cada industria tiene procesos, restricciones y oportunidades distintas. AgentIA prioriza los casos de mayor impacto.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sectores.map(([name, meta]) => (
                <SectorCard key={name} name={name} meta={meta} casos={getCasosBySector(name)} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RoiPreviewCard />
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassCard className="relative overflow-hidden p-8 text-center md:p-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.18),transparent_40%)]" />
              <div className="relative">
                <SectionBadge>Construcción guiada</SectionBadge>
                <h2 className="mx-auto mt-5 max-w-3xl font-serif text-display-md text-slate-950">
                  Describe el agente. Recibe su primera especificación.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-body-lg text-slate-500">
                  Configura misión, canal, conocimiento y autonomía. AgentIA prepara automáticamente controles y pruebas antes del sandbox.
                </p>
                <LuminousButton href="/crear-agente" className="mt-8">
                  Crear mi agente
                  <ArrowRight size={16} />
                </LuminousButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </LuminousBackground>
    </>
  );
}
