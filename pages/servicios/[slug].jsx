import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Bot, CheckCircle2, Database, Gauge, GitBranch,
  Headphones, Layers3, LockKeyhole, MessageSquareText, ShieldCheck, Sparkles,
  Target, UserCheck, Workflow,
} from 'lucide-react';
import { getCasoBySlug, getAllSlugs, getCasosBySector, SECTORES_META } from '../../data/casos';
import { calcBeneficio } from '../../lib/calculations';
import { getAgentDesign } from '../../lib/agent-design';
import Badge from '../../components/ui/Badge';
import QuickROICalculator from '../../components/servicios/QuickROICalculator';
import {
  GlassCard, LuminousBackground, LuminousButton, SectionBadge,
} from '../../components/luminous/LuminousKit';
import { SITE } from '../../lib/constants';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAzMiAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIGZpbGw9IiMwZTFhMmIiLz48cmVjdCB4PSIxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE4IiBmaWxsPSIjMTQyNzNkIi8+PC9zdmc+';

export async function getStaticPaths() {
  return { paths: getAllSlugs().map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const caso = getCasoBySlug(params.slug);
  if (!caso) return { notFound: true };

  const sectorCasos = getCasosBySector(caso.s).filter((item) => item.id !== caso.id);
  return {
    props: {
      caso,
      design: getAgentDesign(caso),
      sectorCasos: sectorCasos.slice(0, 4),
      beneficio: calcBeneficio(caso.t, caso.ini, caso.rec),
      imageSrc: SECTORES_META[caso.s].image,
    },
  };
}

function DetailSection({ id, badge, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-10 md:py-14">
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="mt-5 max-w-4xl font-serif text-display-sm text-slate-950 md:text-display-md">{title}</h2>
      {intro && <p className="mt-4 max-w-3xl text-body-lg leading-relaxed text-slate-500">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function AgentePage({ caso, design, sectorCasos, beneficio, imageSrc }) {
  const canonical = `${SITE.url}/servicios/${caso.slug}`;
  const socialImage = `${SITE.url}${imageSrc}`;
  const annualCost = caso.ini + (caso.rec * 12);
  const roi = annualCost > 0 ? Math.round(((beneficio - annualCost) / annualCost) * 100) : 0;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: caso.c,
    description: design.mission,
    serviceType: `${design.role} para ${caso.s}`,
    areaServed: 'ES',
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: caso.ini, url: canonical },
  };

  return (
    <>
      <Head>
        <title>{`${caso.c}: capacidades del agente IA | AgentIA`}</title>
        <meta name="description" content={caso.desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${caso.c} — Capacidades y diseño`} />
        <meta property="og:description" content={design.mission} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <LuminousBackground>
        <div>
          <section className="pt-28 pb-10 md:pt-36 md:pb-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Link href="/servicios" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600">
                <ArrowLeft size={16} /> Volver a agentes y sectores
              </Link>

              <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
                <GlassCard className="flex flex-col justify-between p-7 md:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge type={caso.t} />
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{caso.s} · {caso.prob}</span>
                    </div>
                    <p className="mt-8 text-sm font-semibold text-blue-600">{design.role}</p>
                    <h1 className="mt-3 font-serif text-[48px] leading-[0.98] text-slate-950 md:text-[72px]">{caso.c}</h1>
                    <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">{design.mission}</p>
                  </div>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <LuminousButton href={`/presupuestador?agent=${caso.slug}`}>
                      Presupuestar este agente <ArrowRight size={16} />
                    </LuminousButton>
                    <LuminousButton href="#capacidades" variant="secondary">Ver capacidades</LuminousButton>
                  </div>
                </GlassCard>

                <GlassCard className="relative min-h-[440px] overflow-hidden p-0">
                  <Image
                    src={imageSrc}
                    alt={`Equipo de ${caso.s} utilizando el agente ${caso.c}`}
                    fill priority fetchPriority="high" placeholder="blur" blurDataURL={BLUR_DATA_URL}
                    sizes="(min-width:1024px) 46vw, 100vw" className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182f]/90 via-[#07182f]/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/25 bg-[#07182f]/75 p-5 text-white backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950"><Bot size={21} /></span>
                      <div><p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Misión operativa</p><p className="mt-1 font-serif text-xl">{caso.desc}</p></div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  ['Inversión inicial', `${caso.ini.toLocaleString()} EUR`, Target],
                  ['Operación mensual', `${caso.rec.toLocaleString()} EUR`, Gauge],
                  ['Beneficio estimado', `${Math.round(beneficio).toLocaleString()} EUR/año`, Sparkles],
                  ['ROI orientativo', `${roi}%`, CheckCircle2],
                ].map(([label, value, Icon]) => (
                  <GlassCard key={label} className="p-4 md:p-5">
                    <Icon size={18} className="text-blue-600" />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">{label}</p>
                    <p className="mt-1 font-serif text-xl text-slate-950 md:text-2xl">{value}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          <div className="sticky top-[76px] z-30 border-y border-slate-200/80 bg-white/85 backdrop-blur-xl">
            <nav aria-label="Contenido del agente" className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold text-slate-500 sm:px-6 lg:px-8">
              <a href="#capacidades" className="whitespace-nowrap hover:text-blue-600">Capacidades</a>
              <a href="#funcionamiento" className="whitespace-nowrap hover:text-blue-600">Funcionamiento</a>
              <a href="#integraciones" className="whitespace-nowrap hover:text-blue-600">Integraciones</a>
              <a href="#seguridad" className="whitespace-nowrap hover:text-blue-600">Seguridad</a>
              <a href="#implantacion" className="whitespace-nowrap hover:text-blue-600">Implantación</a>
              <a href="#roi" className="whitespace-nowrap hover:text-blue-600">ROI</a>
            </nav>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DetailSection id="capacidades" badge="Diseño funcional" title={`Qué puede hacer el agente ${caso.c}`} intro="Capacidades configuradas para resolver el proceso, colaborar con el equipo humano y dejar cada acción trazada.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {design.capabilities.map((capability, index) => {
                  const icons = [Bot, MessageSquareText, Database, GitBranch, UserCheck, Gauge];
                  const Icon = icons[index % icons.length];
                  return (
                    <GlassCard hover key={capability.title} className="p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Icon size={20} /></span>
                      <h3 className="mt-5 font-serif text-xl text-slate-950">{capability.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-500">{capability.description}</p>
                    </GlassCard>
                  );
                })}
              </div>
            </DetailSection>

            <DetailSection id="funcionamiento" badge="Flujo operativo" title="Cómo trabaja de principio a fin" intro="El flujo se adapta a las reglas de la empresa, pero mantiene controles claros antes de consultar datos, decidir o actuar.">
              <GlassCard className="p-6 md:p-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                  {design.workflow.map((item) => (
                    <div key={item.step} className="relative rounded-3xl border border-slate-200 bg-white/70 p-5">
                      <span className="font-mono text-sm font-semibold text-blue-600">0{item.step}</span>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <GlassCard className="p-6 md:p-8">
                  <SectionBadge icon={MessageSquareText}>Ejemplo de ejecución</SectionBadge>
                  <div className="mt-6 space-y-4">
                    {design.example.map((message, index) => (
                      <div key={message.actor} className={`rounded-2xl p-4 ${index === 0 ? 'bg-slate-100' : 'border border-blue-100 bg-blue-50/60'}`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-600">{message.actor}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{message.text}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-6 md:p-8">
                  <SectionBadge icon={Gauge}>Indicadores de éxito</SectionBadge>
                  <h3 className="mt-5 font-serif text-3xl text-slate-950">Qué conviene medir</h3>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {design.metrics.map((metric) => (
                      <div key={metric} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm font-semibold text-slate-700">
                        <CheckCircle2 size={18} className="shrink-0 text-emerald-500" /> {metric}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300">Papel del equipo humano</p>
                    <p className="mt-3 text-sm leading-7">{design.humanRole}</p>
                  </div>
                </GlassCard>
              </div>
            </DetailSection>

            <DetailSection id="integraciones" badge="Arquitectura" title="Canales y sistemas que puede conectar" intro="Las integraciones definitivas dependen del stack de la empresa. Estas son las conexiones naturales para este agente.">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <GlassCard className="p-6 md:p-8">
                  <div className="flex items-center gap-3"><Headphones className="text-blue-600" /><h3 className="font-serif text-2xl text-slate-950">Canales</h3></div>
                  <div className="mt-6 space-y-3">{design.channels.map((channel) => <div key={channel} className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={17} className="text-cyan-500" />{channel}</div>)}</div>
                </GlassCard>
                <GlassCard className="p-6 md:p-8">
                  <div className="flex items-center gap-3"><Database className="text-blue-600" /><h3 className="font-serif text-2xl text-slate-950">Sistemas</h3></div>
                  <div className="mt-6 space-y-3">{design.integrations.map((integration) => <div key={integration} className="flex items-center gap-3 text-sm text-slate-600"><Layers3 size={17} className="text-cyan-500" />{integration}</div>)}</div>
                </GlassCard>
              </div>
            </DetailSection>

            <DetailSection id="seguridad" badge="Gobierno y control" title="Qué hace solo y cuándo interviene una persona" intro="La autonomía se amplía únicamente cuando existen datos, reglas y evidencias suficientes.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {design.controls.map((control, index) => (
                  <GlassCard key={control} className="flex gap-4 p-5">
                    {index === 0 ? <ShieldCheck className="shrink-0 text-emerald-500" /> : <LockKeyhole className="shrink-0 text-blue-600" />}
                    <p className="text-sm leading-7 text-slate-600">{control}</p>
                  </GlassCard>
                ))}
              </div>
            </DetailSection>

            <DetailSection id="implantacion" badge="Roadmap realista" title="Cómo se implanta este agente">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {design.implementation.map((phase, index) => (
                  <GlassCard hover key={phase.phase} className="p-5">
                    <p className="font-mono text-sm font-semibold text-blue-600">0{index + 1}</p>
                    <h3 className="mt-4 font-serif text-2xl text-slate-950">{phase.phase}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{phase.detail}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-600">{phase.duration}</p>
                  </GlassCard>
                ))}
              </div>
            </DetailSection>

            <section id="roi" className="scroll-mt-28 py-10 md:py-14">
              <QuickROICalculator caso={caso} />
            </section>

            {sectorCasos.length > 0 && (
              <DetailSection badge="Equipo de agentes" title={`Agentes complementarios para ${caso.s}`}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sectorCasos.map((item) => (
                    <Link key={item.id} href={`/servicios/${item.slug}`} className="group rounded-3xl border border-slate-200 bg-white/75 p-5 transition-all hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                      <Badge type={item.t} />
                      <h3 className="mt-5 font-serif text-xl text-slate-950">{item.c}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{item.desc}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">Ver agente <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                    </Link>
                  ))}
                </div>
              </DetailSection>
            )}

            <section className="pb-20 pt-8 md:pb-28">
              <GlassCard className="relative overflow-hidden p-8 text-center md:p-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.18),transparent_45%)]" />
                <div className="relative">
                  <SectionBadge icon={Workflow}>Siguiente paso</SectionBadge>
                  <h2 className="mx-auto mt-5 max-w-3xl font-serif text-display-md text-slate-950">Diseña el alcance real de {caso.c}</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-body-lg text-slate-500">Adapta capacidades, integraciones y nivel de autonomía a tus procesos antes de estimar la inversión final.</p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <LuminousButton href={`/presupuestador?agent=${caso.slug}`}>Crear simulación <ArrowRight size={16} /></LuminousButton>
                    <LuminousButton href="/contacto" variant="secondary">Solicitar una sesión de diseño</LuminousButton>
                  </div>
                </div>
              </GlassCard>
            </section>
          </div>
        </div>
      </LuminousBackground>
    </>
  );
}
