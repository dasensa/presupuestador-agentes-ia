import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Layers3, Target, TrendingUp } from 'lucide-react';
import { SECTORES_META, getCasosBySector, getSectores } from '../../data/casos';
import { calcBeneficio } from '../../lib/calculations';
import {
  GlassCard,
  LuminousBackground,
  LuminousButton,
  MetricCard,
  SectionBadge,
} from '../../components/luminous/LuminousKit';
import Badge from '../../components/ui/Badge';
import { SITE } from '../../lib/constants';

function anchorFor(name) {
  return name.toLowerCase().replace('/', '-');
}

const FUNCTION_LABELS = {
  ventas: 'Ventas',
  'atencion-cliente': 'Atención al cliente',
  'soporte-tecnico': 'Soporte técnico',
  operaciones: 'Operaciones',
  finanzas: 'Finanzas',
  rrhh: 'Recursos humanos',
  backoffice: 'Backoffice',
  reporting: 'Reporting',
};

const FUNCTION_KEYWORDS = {
  ventas: ['lead', 'conversion', 'admisiones', 'prestamos', 'upselling', 'ventas', 'recomendador'],
  'atencion-cliente': ['atencion', 'cliente', 'postventa', 'consultas', 'resultados', 'conserjeria'],
  'soporte-tecnico': ['soporte', 'diagnostico', 'averias', 'incidencias', 'knowledge', 'tickets'],
  operaciones: ['operacion', 'automatizacion', 'procesamiento', 'reabastecimiento', 'rutas', 'check-in'],
  finanzas: ['cobro', 'factura', 'impagos', 'financ', 'fraude', 'kyc'],
  rrhh: ['onboarding', 'empleado', 'interno', 'solicitudes', 'orientacion'],
  backoffice: ['documental', 'devoluciones', 'becas', 'validacion', 'matriculacion', 'peritaje'],
  reporting: ['reporting', 'analisis', 'datos', 'eficiencia', 'consumo', 'lectura'],
};

function matchesFunction(caso, functionSlug) {
  if (!functionSlug || !FUNCTION_KEYWORDS[functionSlug]) return true;
  const text = `${caso.c} ${caso.desc} ${caso.prob} ${caso.t}`.toLowerCase();
  return FUNCTION_KEYWORDS[functionSlug].some((keyword) => text.includes(keyword));
}

export default function ServiciosPage() {
  const router = useRouter();
  const sectores = getSectores();
  const [active, setActive] = useState(sectores[0]);
  const activeFunction = typeof router.query.funcion === 'string' && FUNCTION_LABELS[router.query.funcion]
    ? router.query.funcion
    : '';
  const activeCases = getCasosBySector(active);
  const visibleCases = activeFunction
    ? activeCases.filter((caso) => matchesFunction(caso, activeFunction))
    : activeCases;
  const activeMeta = SECTORES_META[active];
  const minPrice = Math.min(...activeCases.map((caso) => caso.ini));

  useEffect(() => {
    if (!activeFunction) return;
    const matchingSector = sectores.find((name) => (
      getCasosBySector(name).some((caso) => matchesFunction(caso, activeFunction))
    ));
    if (matchingSector) setActive(matchingSector);
  }, [activeFunction]);

  const bestCases = useMemo(() => (
    visibleCases
      .map((caso) => ({ ...caso, beneficio: calcBeneficio(caso.t, caso.ini, caso.rec) }))
      .sort((a, b) => b.beneficio - a.beneficio)
      .slice(0, 5)
  ), [visibleCases]);

  return (
    <>
      <Head>
        <title>Agentes IA por sector — AgentIA</title>
        <meta
          name="description"
          content="Mapa de inteligencia sectorial para diseñar agentes IA por industria, priorizar casos de uso y simular inversión y ROI."
        />
        <link rel="canonical" href={`${SITE.url}/servicios`} />
        <meta property="og:title" content="Agentes IA por sector — AgentIA" />
        <meta property="og:description" content="Explora agentes IA y casos de uso priorizados para diez sectores." />
        <meta property="og:url" content={`${SITE.url}/servicios`} />
        <meta property="og:image" content={`${SITE.url}/images/verticals-editorial/retail.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <LuminousBackground>
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <SectionBadge icon={Building2}>Sector Intelligence Map</SectionBadge>
                <h1 className="mt-6 max-w-3xl font-serif text-[48px] leading-[1] text-slate-950 md:text-[76px]">
                  Agentes IA diseñados por sector
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Cada industria tiene procesos, restricciones y oportunidades distintas. AgentIA prioriza los casos de uso con mayor impacto.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <MetricCard value="70+" label="Casos" icon={Layers3} />
                <MetricCard value="10" label="Sectores" icon={Building2} />
                <MetricCard value="ROI" label="Simulable" icon={TrendingUp} />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <GlassCard className="p-4 md:p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sectores.map((name) => {
                    const casos = getCasosBySector(name);
                    const meta = SECTORES_META[name];
                    const selected = active === name;
                    return (
                      <button
                        key={name}
                        id={anchorFor(name)}
                        onClick={() => setActive(name)}
                        className={`group overflow-hidden rounded-3xl border text-left transition-all ${
                          selected
                            ? 'border-blue-300 bg-blue-50/70 shadow-[0_18px_45px_rgba(37,99,235,0.12)]'
                            : 'border-slate-200 bg-white/70 hover:border-cyan-200 hover:bg-white'
                        }`}
                      >
                        <div className="relative h-32 overflow-hidden">
                          <Image src={meta.image} alt={`Equipo del sector ${name}`} fill sizes="(min-width:1024px) 22vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
                          <span className="absolute bottom-3 right-3 rounded-full border border-white/30 bg-white/85 px-2.5 py-1 text-xs font-semibold text-slate-600 backdrop-blur">{casos.length} casos</span>
                        </div>
                        <div className="p-4">
                        <h2 className="font-serif text-2xl text-slate-950">{name}</h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{meta.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard id="agentes" className="scroll-mt-28 p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <SectionBadge icon={Target}>{activeFunction ? `Función: ${FUNCTION_LABELS[activeFunction]}` : 'Panel sectorial'}</SectionBadge>
                    <h2 className="mt-5 font-serif text-display-sm text-slate-950">{active}</h2>
                    <p className="mt-4 max-w-2xl text-body text-slate-500">{activeMeta.longDescription}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5 text-right">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Inversion desde</div>
                    <div className="font-serif text-3xl text-slate-950">{minPrice.toLocaleString()} EUR</div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-white/75 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Dolor principal</div>
                    <div className="mt-2 text-sm font-medium text-slate-700">{activeMeta.description}</div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white/75 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Agentes recomendados</div>
                    <div className="mt-2 text-sm font-medium text-slate-700">{visibleCases.slice(0, 2).map((c) => c.c).join(' + ') || 'Sin coincidencias en este sector'}</div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white/75 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">ROI orientativo</div>
                    <div className="mt-2 text-sm font-medium text-emerald-600">Estimable en presupuestador</div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-2xl text-slate-950">
                    {activeFunction ? `Agentes de ${FUNCTION_LABELS[activeFunction]}` : 'Casos de uso prioritarios'}
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {bestCases.map((caso) => (
                      <Link
                        key={caso.id}
                        href={`/servicios/${caso.slug}`}
                        className="group rounded-3xl border border-slate-200 bg-white/75 p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_18px_45px_rgba(6,182,212,0.12)]"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-serif text-xl text-slate-950">{caso.c}</h4>
                              <Badge type={caso.t} />
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">{caso.desc}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3 text-sm font-semibold text-blue-600">
                            Presupuestar
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LuminousButton href={`/presupuestador?sector=${encodeURIComponent(active)}`}>
                    Presupuestar este sector
                    <ArrowRight size={16} />
                  </LuminousButton>
                  <LuminousButton href="/contacto" variant="secondary">
                    Hablar con AgentIA
                  </LuminousButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      </LuminousBackground>
    </>
  );
}
