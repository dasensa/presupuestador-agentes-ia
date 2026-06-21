import Link from 'next/link';
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
      <div className="absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="absolute -right-24 top-20 -z-10 h-96 w-96 rounded-full bg-violet-200/45 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-200/35 blur-3xl" />
      {children}
    </div>
  );
}

export function GlassCard({ children, className = '', hover = false }) {
  return (
    <div className={`${hover ? 'ds-card-hover' : 'ds-card'} ${className}`}>
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
  const all = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${classes} ${className}`;

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
    <GlassCard className="relative min-h-[430px] overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.22),transparent_34%),radial-gradient(circle_at_64%_35%,rgba(139,92,246,0.18),transparent_24%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodePositions.map((node) => (
          <line
            key={node.label}
            x1="50"
            y1="50"
            x2={parseFloat(node.x) + 8}
            y2={parseFloat(node.y) + 4}
            stroke="url(#agentLine)"
            strokeWidth="0.35"
          />
        ))}
        <defs>
          <linearGradient id="agentLine" x1="0" x2="1">
            <stop stopColor="#2563eb" stopOpacity="0.14" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.55" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_28px_80px_rgba(37,99,235,0.22)] backdrop-blur-2xl">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
            <BrainCircuit size={25} />
          </div>
          <div className="font-serif text-2xl text-slate-950">AgentIA</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">builder</div>
        </div>
      </div>
      {nodePositions.map((node, i) => (
        <FloatingAgentNode
          key={node.label}
          label={node.label}
          icon={node.icon}
          className={i % 2 === 0 ? 'animate-[float_7s_ease-in-out_infinite]' : 'animate-[float_8s_ease-in-out_infinite_reverse]'}
          style={{ left: node.x, top: node.y }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }
      `}</style>
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

export function AgentFunctionCard({ title, description, badge, icon: Icon = Bot }) {
  return (
    <GlassCard hover className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 ring-1 ring-slate-200">
          <Icon size={20} />
        </div>
        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-700">{badge}</span>
      </div>
      <h3 className="mt-5 font-serif text-xl text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>
    </GlassCard>
  );
}

export function SectorCard({ name, meta, casos }) {
  const minPrice = Math.min(...casos.map((caso) => caso.ini));
  const recommended = casos.slice(0, 2).map((caso) => caso.c).join(' + ');
  return (
    <GlassCard hover className="flex h-full flex-col p-5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
          <Building2 size={22} />
        </div>
        <span className="text-xs font-semibold text-slate-400">{casos.length} casos</span>
      </div>
      <h3 className="font-serif text-2xl text-slate-950">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{meta.description}</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
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
    </GlassCard>
  );
}

export function RoiPreviewCard({ sector = 'Telecom', selectedIds }) {
  const casosMap = buildCasosMap();
  const fallbackIds = getCasosBySector(sector).slice(0, 3).map((caso) => caso.id);
  const resumen = calcResumen(selectedIds?.length ? selectedIds : fallbackIds, casosMap);
  const roi = Math.round(resumen.roiBundled * 100);
  return (
    <GlassCard className="overflow-hidden p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <SectionBadge icon={Gauge}>Preview ROI</SectionBadge>
          <h3 className="mt-5 font-serif text-3xl text-slate-950">Visualiza el impacto antes de invertir</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">Una estimacion preliminar para decidir con datos antes del despliegue.</p>
        </div>
        <div className="hidden rounded-2xl bg-emerald-50 px-4 py-3 text-right sm:block">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">ROI estimado</div>
          <div className="font-serif text-4xl text-emerald-600">{roi}%</div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Sector', sector],
          ['Agentes', `${resumen.selectedCasos.length}`],
          ['Inversion', `${Math.round(resumen.invBundled).toLocaleString()} EUR`],
          ['Retorno anual', `${Math.round(resumen.beneficioBundled).toLocaleString()} EUR`],
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
          <span>{Math.min(95, Math.max(35, roi / 4))}%</span>
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
  { title: 'Ventas', description: 'Cualifica leads, recomienda ofertas y activa oportunidades comerciales.', badge: 'conversion', icon: BriefcaseBusiness },
  { title: 'Atencion cliente', description: 'Resuelve consultas frecuentes y escala casos complejos con contexto.', badge: 'servicio', icon: Headphones },
  { title: 'Soporte tecnico', description: 'Diagnostica incidencias y guia pasos de resolucion automatizados.', badge: 'N1/N2', icon: CircuitBoard },
  { title: 'Operaciones', description: 'Coordina tareas repetitivas, incidencias y flujos entre sistemas.', badge: 'workflow', icon: Workflow },
  { title: 'Finanzas', description: 'Automatiza cobros, validaciones y reporting financiero operativo.', badge: 'control', icon: Euro },
  { title: 'RR. HH.', description: 'Acompana onboarding, preguntas internas y solicitudes administrativas.', badge: 'people ops', icon: Users },
  { title: 'Backoffice', description: 'Procesa documentos, actualiza datos y reduce trabajo manual.', badge: 'documental', icon: Cpu },
  { title: 'Reporting', description: 'Genera resumenes ejecutivos y alertas accionables sobre KPIs.', badge: 'insights', icon: LineChart },
];

export const processSteps = [
  { step: '01', title: 'Detectamos procesos', description: 'Priorizamos tareas repetitivas y cuellos de botella con impacto economico.', icon: Network },
  { step: '02', title: 'Disenamos agentes', description: 'Convertimos procesos en agentes por funcion, canal y nivel de integracion.', icon: Bot },
  { step: '03', title: 'Calculamos impacto', description: 'Estimamos inversion, ahorro, retorno y sinergias antes de decidir.', icon: TrendingUp },
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
