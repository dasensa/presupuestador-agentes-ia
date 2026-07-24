import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Building2, CheckCircle2,
  CircuitBoard, Cpu, Euro, Gauge, Headphones, LineChart, Network, Sparkles,
  TrendingUp, Users, Workflow, Zap,
} from 'lucide-react';
import { calcResumen } from '../../lib/calculations';
import { buildCasosMap, getCasosBySector } from '../../data/casos';

export function LuminousBackground({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-20 bg-white" />
      <div className="absolute inset-0 -z-10 luminous-grid opacity-70" />
      <div className="absolute -left-32 top-10 -z-10 hidden h-80 w-80 rounded-full bg-cyan-200/45 blur-3xl md:block" />
      <div className="absolute -right-24 top-20 -z-10 hidden h-96 w-96 rounded-full bg-violet-200/45 blur-3xl md:block" />
      <div className="absolute bottom-0 left-1/3 -z-10 hidden h-96 w-96 rounded-full bg-blue-200/35 blur-3xl md:block" />
      {children}
    </div>
  );
}

export function GlassCard({ children, className = '', hover = false, ...props }) {
  return (
    <div className={`${hover ? 'ds-card-hover' : 'ds-card'} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionBadge({ children, icon: Icon = Sparkles }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600 shadow-sm">
      <Icon size={13} />
      {children}
    </span>
  );
}

export function LuminousButton({ href, children, variant = 'primary', className = '', ...props }) {
  const classes = variant === 'primary'
    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(37,99,235,0.34)]'
    : 'border border-slate-200 bg-white/75 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_18px_45px_rgba(6,182,212,0.14)]';
  const all = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${classes} ${className}`;

  if (href) return <Link href={href} className={all} {...props}>{children}</Link>;
  return <button className={all} {...props}>{children}</button>;
}

const nodePositions = [
  { label: 'Ventas IA', x: '9%', y: '18%', icon: BriefcaseBusiness },
  { label: 'Soporte IA', x: '68%', y: '10%', icon: Headphones },
  { label: 'Operaciones IA', x: '78%', y: '47%', icon: Workflow },
  { label: 'Finanzas IA', x: '60%', y: '78%', icon: Euro },
  { label: 'Backoffice IA', x: '13%', y: '70%', icon: Cpu },
  { label: 'Atencion cliente', x: '5%', y: '45%', icon: Users },
];

export function FloatingAgentNode({ label, icon: Icon = Bot, className = '', style }) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold text-slate-800">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
          <Icon size={14} />
        </span>
        {label}
      </div>
    </div>
  );
}

export function AgentConstellation() {
  return (
    <GlassCard className="relative min-h-[500px] overflow-hidden border-white/80">
      <Image src="/images/verticals-editorial/banca.webp" alt="Equipo profesional analizando una oportunidad de automatizacion" fill priority sizes="(min-width:1024px) 54vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07182f]/75 via-transparent to-white/10" />
      <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 backdrop-blur-xl">Estrategia + personas + IA</div>
      <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/25 bg-[#07182f]/75 p-5 text-white backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 text-slate-950"><BrainCircuit size={21} /></div>
          <div><div className="font-serif text-2xl">De la oportunidad al agente</div><p className="mt-1 text-sm text-slate-200">Diseño, integración y medición con equipos reales.</p></div>
        </div>
      </div>
    </GlassCard>
  );
}

export function MetricCard({ value, label, description, icon: Icon = LineChart }) {
  return (
    <GlassCard hover className="p-5">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <div className="font-serif text-4xl text-slate-950">{value}</div>
      <div className="mt-1 text-sm font-semibold text-slate-800">{label}</div>
      {description && <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>}
    </GlassCard>
  );
}

export function ProcessFlowCard({ step, title, description, icon: Icon }) {
  return (
    <GlassCard hover className="relative p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
          <Icon size={20} />
        </div>
        <span className="font-mono text-xs font-semibold text-slate-400">{step}</span>
      </div>
      <h3 className="font-serif text-xl text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>
    </GlassCard>
  );
}

export function AgentFunctionCard({ title, description, badge, process, icon: Icon = Bot }) {
  return (
    <Link
      href={`/servicios?funcion=${process}#agentes`}
      aria-label={`Ver agentes recomendados para ${title}`}
      className="group block rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
    >
      <GlassCard hover className="h-full p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 ring-1 ring-slate-200">
            <Icon size={20} />
          </div>
          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700">{badge}</span>
        </div>
        <h3 className="mt-5 font-serif text-xl text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          Ver agentes <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </GlassCard>
    </Link>
  );
}

export function SectorCard({ name, meta, casos }) {
  const minPrice = Math.min(...casos.map((caso) => caso.ini));
  const recommended = casos.slice(0, 2).map((caso) => caso.c).join(' + ');
  return (
    <GlassCard hover className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative h-44 overflow-hidden">
        <Image src={meta.image} alt={`Profesionales del sector ${name}`} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">{casos.length} casos</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
      <h3 className="font-serif text-3xl text-slate-950">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{meta.description}</p>
      <div className="mt-5 border-l-2 border-cyan-400 bg-slate-50/70 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Agentes recomendados</div>
        <div className="mt-2 text-sm font-medium text-slate-700">{recommended}</div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-5">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Inversion desde</div>
          <div className="font-serif text-xl text-slate-950">{minPrice.toLocaleString()} EUR</div>
        </div>
        <Link href={`/presupuestador?sector=${encodeURIComponent(name)}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white transition-transform hover:-translate-y-0.5">
          <ArrowRight size={16} />
        </Link>
      </div>
      </div>
    </GlassCard>
  );
}

export function RoiPreviewCard({ sector = 'Telecom', selectedIds }) {
  const casosMap = buildCasosMap();
  const fallbackIds = getCasosBySector(sector).slice(0, 3).map((caso) => caso.id);
  const resumen = calcResumen(selectedIds?.length ? selectedIds : fallbackIds, casosMap);
  return (
    <GlassCard className="overflow-hidden p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <SectionBadge icon={Gauge}>Preview ROI</SectionBadge>
          <h3 className="mt-5 font-serif text-3xl text-slate-950">Visualiza el impacto antes de invertir</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">Una estimación preliminar para decidir con datos antes del despliegue.</p>
        </div>
        <div className="hidden rounded-2xl bg-emerald-50 px-4 py-3 text-right sm:block">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">ROI verificable</div>
          <div className="font-serif text-2xl text-emerald-600">Con datos reales</div>
          <div className="mt-1 text-[10px] text-emerald-700">sin porcentajes prefijados</div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Sector', sector],
          ['Agentes', `${resumen.selectedCasos.length}`],
          ['Inversion', `${Math.round(resumen.invBundled).toLocaleString()} EUR`],
          ['Modelo', '3 escenarios'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white/75 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</div>
            <div className="mt-2 font-serif text-xl text-slate-950">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
          <span>Impacto operativo</span>
          <span>Datos + hipótesis</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
        </div>
      </div>
      <LuminousButton href="/presupuestador" className="mt-8">
        Calcular mi caso real
        <ArrowRight size={16} />
      </LuminousButton>
    </GlassCard>
  );
}

export const agentFunctions = [
  { title: 'Ventas', process: 'ventas', description: 'Cualifica leads, recomienda ofertas y activa oportunidades comerciales.', badge: 'conversion', icon: BriefcaseBusiness },
  { title: 'Atención al cliente', process: 'atencion-cliente', description: 'Resuelve consultas frecuentes y escala casos complejos con contexto.', badge: 'servicio', icon: Headphones },
  { title: 'Soporte técnico', process: 'soporte-tecnico', description: 'Diagnostica incidencias y guía pasos de resolución automatizados.', badge: 'N1/N2', icon: CircuitBoard },
  { title: 'Operaciones', process: 'operaciones', description: 'Coordina tareas repetitivas, incidencias y flujos entre sistemas.', badge: 'workflow', icon: Workflow },
  { title: 'Finanzas', process: 'finanzas', description: 'Automatiza cobros, validaciones y reporting financiero operativo.', badge: 'control', icon: Euro },
  { title: 'RR. HH.', process: 'rrhh', description: 'Acompaña onboarding, preguntas internas y solicitudes administrativas.', badge: 'people ops', icon: Users },
  { title: 'Backoffice', process: 'backoffice', description: 'Procesa documentos, actualiza datos y reduce trabajo manual.', badge: 'documental', icon: Cpu },
  { title: 'Reporting', process: 'reporting', description: 'Genera resúmenes ejecutivos y alertas accionables sobre KPIs.', badge: 'insights', icon: LineChart },
];

export const processSteps = [
  { step: '01', title: 'Detectamos procesos', description: 'Priorizamos tareas repetitivas y cuellos de botella con impacto economico.', icon: Network },
  { step: '02', title: 'Diseñamos agentes', description: 'Convertimos procesos en agentes por función, canal y nivel de integración.', icon: Bot },
  { step: '03', title: 'Calculamos impacto', description: 'Estimamos inversión, ahorro, retorno y sinergias antes de decidir.', icon: TrendingUp },
  { step: '04', title: 'Desplegamos por fases', description: 'Creamos un roadmap realista con pilotos, integraciones y escalado.', icon: Zap },
];

export function MiniCheck({ children }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={18} />
      <span className="text-sm leading-relaxed text-slate-600">{children}</span>
    </div>
  );
}
