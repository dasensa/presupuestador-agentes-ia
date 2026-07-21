import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  ArrowLeft, ArrowRight, Bot, Building2, Check, CheckCircle2, Gauge,
  Mail, Sparkles, Workflow,
} from 'lucide-react';
import {
  SECTORES_META,
  buildCasosMap,
  getCasoBySlug,
  getCasosBySector,
  getSectores,
} from '../data/casos';
import { calcResumen } from '../lib/calculations';
import { adjustBudget, DEFAULT_CONTEXT } from '../lib/budget-context';
import { SITE } from '../lib/constants';
import {
  GlassCard,
  LuminousBackground,
  LuminousButton,
  SectionBadge,
} from '../components/luminous/LuminousKit';
import Badge from '../components/ui/Badge';

const PROCESS_OPTIONS = [
  'Atención al cliente',
  'Captación comercial',
  'Soporte técnico',
  'Operaciones',
  'Finanzas',
  'Recursos humanos',
  'Backoffice',
  'Reporting',
  'Gestión de incidencias',
  'Reservas/citas',
  'Retención/churn',
  'Análisis documental',
];

const PROCESS_QUERY_MAP = {
  ventas: 'Captación comercial',
  'atencion-cliente': 'Atención al cliente',
  'soporte-tecnico': 'Soporte técnico',
  operaciones: 'Operaciones',
  finanzas: 'Finanzas',
  rrhh: 'Recursos humanos',
  backoffice: 'Backoffice',
  reporting: 'Reporting',
};

const STEPS = [
  'Sector',
  'Procesos',
  'Agentes',
  'Contexto',
  'ROI preliminar',
  'Informe',
];

function currency(value) {
  return `${Math.round(value).toLocaleString()} EUR`;
}

function processMatches(caso, processes) {
  if (!processes.length) return true;
  const text = `${caso.c} ${caso.desc} ${caso.prob} ${caso.t}`.toLowerCase();
  const map = {
    'Atención al cliente': ['atencion', 'cliente', 'postventa', 'consultas', 'resultados'],
    'Captación comercial': ['lead', 'conversion', 'admisiones', 'prestamos', 'upselling', 'ventas'],
    'Soporte técnico': ['soporte', 'diagnostico', 'averias', 'incidencias', 'knowledge'],
    Operaciones: ['operacion', 'automatizacion', 'procesamiento', 'workflow', 'gestion'],
    Finanzas: ['cobro', 'factura', 'impagos', 'financ', 'fraude', 'kyc'],
    'Recursos humanos': ['onboarding', 'empleado', 'interno', 'solicitudes', 'people'],
    Backoffice: ['documental', 'devoluciones', 'becas', 'impagos', 'validacion', 'backoffice'],
    Reporting: ['reporting', 'analisis', 'datos', 'eficiencia'],
    'Gestión de incidencias': ['incidencias', 'reclamaciones', 'averias', 'cortes'],
    'Reservas/citas': ['reservas', 'citas', 'check-in', 'conserjeria'],
    'Retención/churn': ['retencion', 'churn', 'loyalty', 'fidelizacion'],
    'Análisis documental': ['documental', 'kyc', 'polizas', 'peritaje', 'validacion'],
  };
  return processes.some((process) => map[process]?.some((word) => text.includes(word)));
}

function Stepper({ step }) {
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
      {STEPS.map((label, index) => {
        const current = index + 1;
        const active = step === current;
        const done = step > current;
        return (
          <div key={label} className={`rounded-2xl border px-3 py-2 text-center text-xs font-semibold transition-all ${active ? 'border-blue-300 bg-blue-50 text-blue-700' : done ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white/70 text-slate-400'}`}>
            <span className="block font-mono">{done ? <Check size={13} className="mx-auto" /> : `0${current}`}</span>
            <span className="mt-1 block">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function BudgetSummarySidebar({ sector, processes, selectedCasos, context, adjusted }) {
  return (
    <GlassCard className="sticky top-24 p-5">
      <SectionBadge icon={Gauge}>Simulacion</SectionBadge>
      <div className="mt-5 space-y-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Sector</div>
          <div className="mt-1 font-serif text-2xl text-slate-950">{sector || 'Pendiente'}</div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Procesos</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(processes.length ? processes : ['Sin seleccionar']).map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{item}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Agentes</div>
          <div className="mt-1 text-sm text-slate-600">{selectedCasos.length} seleccionados</div>
        </div>
        <div className="grid grid-cols-1 gap-3 border-t border-slate-200 pt-4">
          <div className="rounded-2xl bg-blue-50 p-3">
            <div className="text-xs font-semibold text-blue-600">Inversión estimada</div>
            <div className="font-serif text-2xl text-slate-950">{currency(adjusted.inversion)}</div>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3">
            <div className="text-xs font-semibold text-emerald-600">ROI preliminar</div>
            <div className="font-serif text-2xl text-emerald-600">{adjusted.roi}%</div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 text-xs leading-relaxed text-slate-500">
          Estado: {selectedCasos.length ? 'simulación lista para ajustar' : 'elige agentes para calcular impacto'}.
          {context.integracion === 'core' ? ' Integración core considerada.' : ''}
        </div>
      </div>
    </GlassCard>
  );
}

export default function PresupuestadorPage() {
  const router = useRouter();
  const sectores = useMemo(() => getSectores(), []);
  const casosMap = useMemo(() => buildCasosMap(), []);
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState(sectores[0]);
  const [processes, setProcesses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [context, setContext] = useState(DEFAULT_CONTEXT);
  const [lead, setLead] = useState({ nombre: '', email: '', empresa: '', telefono: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const querySector = router.query.sector;
    if (querySector && sectores.includes(querySector)) setSector(querySector);
    const queryProcess = PROCESS_QUERY_MAP[router.query.proceso];
    if (queryProcess) {
      setProcesses([queryProcess]);
      setSelected([]);
      setStep(3);
    }
    if (router.query.agent) {
      const caso = getCasoBySlug(router.query.agent);
      if (caso) {
        setSector(caso.s);
        setSelected([caso.id]);
        setStep(3);
      }
    }
  }, [router.query.agent, router.query.proceso, router.query.sector, sectores]);

  const sectorCases = useMemo(() => getCasosBySector(sector), [sector]);
  const recommended = useMemo(() => (
    sectorCases
      .filter((caso) => processMatches(caso, processes))
      .slice(0, 6)
  ), [sectorCases, processes]);

  useEffect(() => {
    setSelected((prevIds) => {
      if (prevIds.length) return prevIds.filter((id) => sectorCases.some((caso) => caso.id === id));
      return recommended.slice(0, 3).map((caso) => caso.id);
    });
  }, [recommended, sectorCases]);

  const selectedCasos = selected.map((id) => casosMap[id]).filter(Boolean);
  const resumen = calcResumen(selected, casosMap);
  const adjusted = adjustBudget(resumen, context);
  const canContinue = step === 2
    ? processes.length > 0
    : step === 3
      ? selected.length > 0
      : true;

  const next = () => setStep((value) => Math.min(6, value + 1));
  const prev = () => setStep((value) => Math.max(1, value - 1));
  const toggle = (id) => setSelected((prevIds) => prevIds.includes(id) ? prevIds.filter((item) => item !== id) : [...prevIds, id]);
  const toggleProcess = (name) => {
    setProcesses((prevItems) => prevItems.includes(name) ? prevItems.filter((item) => item !== name) : [...prevItems, name]);
    setSelected([]);
  };
  const selectSector = (name) => {
    setSector(name);
    setProcesses([]);
    setSelected([]);
  };

  const submitLead = async (e) => {
    e.preventDefault();
    if (!lead.nombre || !lead.email || !lead.empresa) return;
    setLoading(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/registrar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          sector,
          empleados: context.empleados,
          presupuesto: currency(adjusted.inversion),
          urgencia: context.urgencia,
          selectedIds: selected,
          context,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'No se pudo enviar la simulacion');
      }
      setSent(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Crear simulación ROI — AgentIA</title>
        <meta name="description" content="Diseña tu equipo de agentes IA en seis pasos y recibe una estimación preliminar de inversión, retorno y ROI." />
        <link rel="canonical" href={`${SITE.url}/presupuestador`} />
        <meta property="og:title" content="Crear simulación ROI — AgentIA" />
        <meta property="og:description" content="Configura un equipo de agentes IA y contrasta un escenario preliminar de inversión y retorno." />
        <meta property="og:url" content={`${SITE.url}/presupuestador`} />
        <meta property="og:image" content={`${SITE.url}/images/verticals-editorial/tech.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <LuminousBackground>
        <section className="pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <SectionBadge icon={Sparkles}>BudgetWizard</SectionBadge>
              <h1 className="mt-6 font-serif text-[46px] leading-[1] text-slate-950 md:text-[74px]">Crea tu simulación de agentes IA</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Primero entregamos una estimación visual. Al final, si quieres el informe completo, te pedimos los datos de contacto.
              </p>
            </div>

            <Stepper step={step} />

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
              <GlassCard className="p-6 md:p-8">
                {step > 1 && (
                  <button onClick={prev} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950">
                    <ArrowLeft size={16} />
                    Volver
                  </button>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="font-serif text-display-sm text-slate-950">En que sector opera tu empresa?</h2>
                    <p className="mt-3 text-slate-500">Selecciona el sector para cargar procesos, agentes y precios orientativos.</p>
                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {sectores.map((name) => (
                        <button type="button" aria-pressed={sector === name} key={name} onClick={() => selectSector(name)} className={`rounded-3xl border p-5 text-left transition-all ${sector === name ? 'border-blue-300 bg-blue-50 shadow-[0_18px_45px_rgba(37,99,235,0.12)]' : 'border-slate-200 bg-white/70 hover:border-cyan-200'}`}>
                          <Building2 className="text-blue-600" size={22} />
                          <div className="mt-4 font-serif text-2xl text-slate-950">{name}</div>
                          <p className="mt-2 text-sm text-slate-500">{SECTORES_META[name].description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-serif text-display-sm text-slate-950">Que procesos quieres mejorar?</h2>
                    <p className="mt-3 text-slate-500">Elige uno o varios procesos. AgentIA recomendara agentes segun tu foco.</p>
                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {PROCESS_OPTIONS.map((item) => (
                        <button type="button" aria-pressed={processes.includes(item)} key={item} onClick={() => toggleProcess(item)} className={`rounded-3xl border p-4 text-left transition-all ${processes.includes(item) ? 'border-cyan-300 bg-cyan-50 text-cyan-900' : 'border-slate-200 bg-white/70 text-slate-700 hover:border-cyan-200'}`}>
                          <Workflow size={18} className="mb-3 text-blue-600" />
                          <span className="font-semibold">{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-serif text-display-sm text-slate-950">Agentes recomendados</h2>
                    <p className="mt-3 text-slate-500">Puedes ajustar la selección. La inversión y el ROI se actualizan al instante.</p>
                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {recommended.map((caso) => {
                        const active = selected.includes(caso.id);
                        return (
                          <button type="button" aria-pressed={active} key={caso.id} onClick={() => toggle(caso.id)} className={`rounded-3xl border p-5 text-left transition-all ${active ? 'border-blue-300 bg-blue-50 shadow-[0_18px_45px_rgba(37,99,235,0.12)]' : 'border-slate-200 bg-white/70 hover:border-cyan-200'}`}>
                            <div className="flex items-start justify-between gap-4">
                              <Bot size={22} className="text-blue-600" />
                              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{active ? 'Incluido' : 'Anadir'}</span>
                            </div>
                            <h3 className="mt-4 font-serif text-2xl text-slate-950">{caso.c}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">{caso.desc}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Badge type={caso.t} />
                              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">Desde {caso.ini.toLocaleString()} EUR</span>
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">Impacto {caso.prob}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="font-serif text-display-sm text-slate-950">Ajusta el contexto de tu empresa</h2>
                    <p className="mt-3 text-slate-500">Estos factores ajustan la estimación preliminar sin pedir datos personales.</p>
                    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                      {[
                        ['empleados', 'Tamano empresa', [['1-20', '1-20'], ['21-100', '21-100'], ['101-500', '101-500'], ['500+', '500+']]],
                        ['volumen', 'Volumen mensual', [['bajo', 'Bajo'], ['medio', 'Medio'], ['alto', 'Alto'], ['enterprise', 'Enterprise']]],
                        ['integracion', 'Nivel de integracion', [['baja', 'Baja'], ['media', 'Media'], ['alta', 'Alta'], ['core', 'Core/ERP']]],
                        ['urgencia', 'Urgencia despliegue', [['flexible', 'Flexible'], ['normal', 'Normal'], ['rapida', 'Rapida']]],
                      ].map(([key, label, options]) => (
                        <label key={key} htmlFor={`context-${key}`} className="block">
                          <span className="text-label uppercase tracking-wider text-slate-500">{label}</span>
                          <select
                            id={`context-${key}`}
                            value={context[key]}
                            onChange={(e) => setContext((prev) => ({ ...prev, [key]: e.target.value }))}
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                          >
                            {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                          </select>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h2 className="font-serif text-display-sm text-slate-950">Estimacion preliminar</h2>
                    <p className="mt-3 text-slate-500">Una primera lectura para decidir si merece avanzar a un informe completo.</p>
                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[
                        ['Inversión estimada', currency(adjusted.inversion), 'blue'],
                        ['Retorno estimado', currency(adjusted.retorno), 'emerald'],
                        ['ROI estimado', `${adjusted.roi}%`, 'emerald'],
                        ['Despliegue aproximado', adjusted.meses, 'blue'],
                      ].map(([label, value, tone]) => (
                        <div key={label} className={`rounded-3xl p-5 ${tone === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                          <div className={`text-xs font-semibold uppercase tracking-[0.12em] ${tone === 'emerald' ? 'text-emerald-600' : 'text-blue-600'}`}>{label}</div>
                          <div className="mt-2 font-serif text-3xl text-slate-950">{value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 rounded-3xl border border-slate-200 bg-white/75 p-5">
                      <div className="mb-3 flex justify-between text-sm font-semibold text-slate-500">
                        <span>Impacto neto estimado</span>
                        <span>{currency(adjusted.ahorro)}</span>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <h2 className="font-serif text-display-sm text-slate-950">Recibe el informe completo</h2>
                    <p className="mt-3 text-slate-500">Te pedimos los datos al final para enviarte el informe y revisar el caso con un consultor.</p>
                    {sent ? (
                      <div className="mt-8 rounded-3xl bg-emerald-50 p-6">
                        <CheckCircle2 className="text-emerald-600" size={30} />
                        <h3 className="mt-4 font-serif text-2xl text-slate-950">Solicitud recibida</h3>
                        <p className="mt-2 text-sm text-slate-600">Revisaremos la simulación y contactaremos contigo.</p>
                      </div>
                    ) : (
                      <form onSubmit={submitLead} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                          ['nombre', 'Nombre', 'text', true],
                          ['email', 'Email corporativo', 'email', true],
                          ['empresa', 'Empresa', 'text', true],
                          ['telefono', 'Telefono opcional', 'tel', false],
                        ].map(([key, label, type, required]) => (
                          <label key={key} className="block">
                            <span className="text-label uppercase tracking-wider text-slate-500">{label}{required ? ' *' : ''}</span>
                            <input
                              type={type}
                              required={required}
                              value={lead[key]}
                              onChange={(e) => setLead((prev) => ({ ...prev, [key]: e.target.value }))}
                              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                            />
                          </label>
                        ))}
                        <div className="md:col-span-2">
                          <LuminousButton type="submit" disabled={loading}>
                            <Mail size={16} />
                            {loading ? 'Enviando...' : 'Recibir informe y revisar con un consultor'}
                          </LuminousButton>
                          {submitError && <p role="alert" className="mt-3 text-sm text-red-600">{submitError}</p>}
                          <p className="mt-3 text-xs leading-relaxed text-slate-500">Al enviar aceptas que usemos estos datos para remitirte la simulación y responder a tu solicitud. Consulta nuestra política de privacidad.</p>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {step < 6 && (
                  <div className="mt-10 flex justify-end">
                    <LuminousButton onClick={next} disabled={!canContinue}>
                      {step === 5 ? 'Recibir informe completo' : 'Continuar'}
                      <ArrowRight size={16} />
                    </LuminousButton>
                    {!canContinue && <p className="ml-4 self-center text-sm text-slate-500">Selecciona al menos una opcion para continuar.</p>}
                  </div>
                )}
              </GlassCard>

              <BudgetSummarySidebar
                sector={sector}
                processes={processes}
                selectedCasos={selectedCasos}
                context={context}
                adjusted={adjusted}
              />
            </div>
          </div>
        </section>
      </LuminousBackground>
    </>
  );
}
