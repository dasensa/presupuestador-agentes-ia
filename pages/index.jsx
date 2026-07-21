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
        <title>{`${SITE.name} — Disena tu equipo de agentes IA`}</title>
        <meta
          name="description"
          content="Disena tu equipo de agentes IA, identifica procesos de alto impacto y calcula una simulacion de ROI antes de desplegar."
        />
      </Head>

      <LuminousBackground>
        <section className="pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <SectionBadge>{'Procesos -> Agentes -> Impacto -> ROI'}</SectionBadge>
                <h1 className="mt-7 max-w-4xl font-serif text-[54px] leading-[0.96] tracking-tight text-slate-950 md:text-[82px]">
                  Disena tu equipo de agentes IA
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                  Identificamos los procesos con mayor potencial, disenamos agentes inteligentes por funcion y calculamos el impacto economico antes de desplegarlos.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <LuminousButton href="/presupuestador">
                    Crear mi simulacion
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
              <MetricCard value="70+" label="Casos de uso" description="Biblioteca sectorial para priorizar automatizaciones reales." icon={Layers3} />
              <MetricCard value="10" label="Sectores" description="Mapas de agentes adaptados a cada industria." icon={Map} />
              <MetricCard value="ROI" label="Antes de desplegar" description="Estimacion economica preliminar para decidir con datos." icon={Gauge} />
              <MetricCard value="Roadmap" label="Por fases" description="Pilotos, integraciones y escalado con una ruta clara." icon={Route} />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <SectionBadge icon={LineChart}>De proceso a agente</SectionBadge>
              <h2 className="mt-5 font-serif text-display-md text-slate-950">Convierte procesos repetitivos en agentes inteligentes</h2>
              <p className="mt-4 text-body-lg text-slate-500">
                Del diagnostico al despliegue: una ruta clara para automatizar con impacto medible.
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
                <SectionBadge>Agent builder</SectionBadge>
                <h2 className="mt-5 font-serif text-display-md text-slate-950">Agentes especializados por funcion</h2>
              </div>
              <p className="max-w-xl text-body text-slate-500">
                Combina modulos por funcion para construir un equipo de agentes alineado con tus procesos, canales y sistemas.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agentFunctions.map((agent) => <AgentFunctionCard key={agent.title} {...agent} />)}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionBadge>Sectores inteligentes</SectionBadge>
                <h2 className="mt-5 font-serif text-display-md text-slate-950">IA disenada para cada sector</h2>
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
                <SectionBadge>Simulacion inicial</SectionBadge>
                <h2 className="mx-auto mt-5 max-w-3xl font-serif text-display-md text-slate-950">
                  Empieza por una simulacion. Decide con datos.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-body-lg text-slate-500">
                  Selecciona tu sector, identifica procesos y recibe una estimacion inicial de inversion, retorno e impacto operativo.
                </p>
                <LuminousButton href="/presupuestador" className="mt-8">
                  Crear mi simulacion
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
