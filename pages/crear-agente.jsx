import { useState } from 'react';
import Head from 'next/head';
import {
  ArrowRight, Bot, CheckCircle2, ClipboardCheck, Gauge, Layers3,
  LockKeyhole, Rocket, ShieldCheck, Sparkles, TestTube2,
} from 'lucide-react';
import { getSectores } from '../data/casos';
import { SITE } from '../lib/constants';
import {
  GlassCard, LuminousBackground, LuminousButton, SectionBadge,
} from '../components/luminous/LuminousKit';

const INITIAL = {
  name: '',
  sector: 'Retail',
  objective: '',
  process: 'Atención al cliente',
  channel: 'web',
  volume: 'bajo',
  autonomy: 'informar',
  plan: 'essential',
  knowledge: '',
  systems: '',
  sensitiveData: false,
};

const fieldClass = 'mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100';

function Choice({ active, onClick, title, detail }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-2xl border p-4 text-left transition-all ${active ? 'border-blue-400 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white/70 hover:border-cyan-200'}`}>
      <span className="font-semibold text-slate-950">{title}</span>
      <span className="mt-1 block text-xs leading-5 text-slate-500">{detail}</span>
    </button>
  );
}

export default function CrearAgentePage() {
  const sectores = getSectores();
  const [form, setForm] = useState(INITIAL);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const build = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('/api/construir-agente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.errors?.join(' ') || 'No se pudo construir la especificación.');
      setResult(data.blueprint);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Construye tu agente IA — AgentIA</title>
        <meta name="description" content="Describe el agente que necesitas y genera automáticamente una especificación segura, evaluable y lista para sandbox." />
        <link rel="canonical" href={`${SITE.url}/crear-agente`} />
      </Head>
      <LuminousBackground>
        <section className="pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <SectionBadge icon={Sparkles}>Agent Factory</SectionBadge>
              <h1 className="mt-6 font-serif text-[48px] leading-[0.98] text-slate-950 md:text-[76px]">Solicita un agente. El sistema construye su primera versión.</h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Define objetivo, canal, autonomía y conocimiento. AgentIA genera una especificación versionada, controles y pruebas antes de crear el entorno de demostración.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <GlassCard className="p-6 md:p-8">
                <form onSubmit={build} className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3"><Bot className="text-blue-600" /><h2 className="font-serif text-3xl text-slate-950">1. Define la misión</h2></div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <label><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Nombre del agente</span><input required className={fieldClass} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej. Asistente de reservas" /></label>
                      <label><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sector</span><select className={fieldClass} value={form.sector} onChange={(e) => set('sector', e.target.value)}>{sectores.map((sector) => <option key={sector}>{sector}</option>)}</select></label>
                      <label><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Proceso</span><input required className={fieldClass} value={form.process} onChange={(e) => set('process', e.target.value)} /></label>
                      <label><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Volumen mensual</span><select className={fieldClass} value={form.volume} onChange={(e) => set('volume', e.target.value)}><option value="bajo">Hasta 1.000</option><option value="medio">Hasta 5.000</option><option value="alto">Hasta 20.000</option></select></label>
                    </div>
                    <label className="mt-4 block"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">¿Qué debe conseguir?</span><textarea required minLength={20} rows={4} className={fieldClass} value={form.objective} onChange={(e) => set('objective', e.target.value)} placeholder="Describe el resultado esperado, qué puede hacer y cuándo debe derivar a una persona." /></label>
                  </div>

                  <div>
                    <div className="flex items-center gap-3"><Layers3 className="text-blue-600" /><h2 className="font-serif text-3xl text-slate-950">2. Configura el alcance</h2></div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[['web', 'Chat web', 'Listo para automatización inicial'], ['whatsapp', 'WhatsApp', 'Requiere alta y validación del canal'], ['voz', 'Voz', 'Requiere telefonía, guiones y QA'], ['email', 'Correo', 'Requiere dominio, permisos y controles']].map(([value, title, detail]) => <Choice key={value} active={form.channel === value} onClick={() => set('channel', value)} title={title} detail={detail} />)}
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[['informar', 'Informar', 'Responde y orienta'], ['proponer', 'Proponer', 'Prepara acciones para aprobación'], ['ejecutar', 'Ejecutar', 'Actúa con confirmación y auditoría']].map(([value, title, detail]) => <Choice key={value} active={form.autonomy === value} onClick={() => set('autonomy', value)} title={title} detail={detail} />)}
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <label><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fuentes de conocimiento</span><textarea rows={3} className={fieldClass} value={form.knowledge} onChange={(e) => set('knowledge', e.target.value)} placeholder="Web, manuales, FAQs, políticas..." /></label>
                      <label><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sistemas externos</span><textarea rows={3} className={fieldClass} value={form.systems} onChange={(e) => set('systems', e.target.value)} placeholder="CRM, ERP, agenda... Opcional" /></label>
                    </div>
                    <label className="mt-4 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900"><input type="checkbox" className="mt-1" checked={form.sensitiveData} onChange={(e) => set('sensitiveData', e.target.checked)} /><span>El agente tratará datos sensibles, sanitarios, financieros o especialmente protegidos.</span></label>
                  </div>

                  <div>
                    <div className="flex items-center gap-3"><Gauge className="text-blue-600" /><h2 className="font-serif text-3xl text-slate-950">3. Selecciona el nivel</h2></div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Choice active={form.plan === 'essential'} onClick={() => set('plan', 'essential')} title="Essential" detail="Conocimiento, escalado humano, analítica y límites de consumo." />
                      <Choice active={form.plan === 'advanced'} onClick={() => set('plan', 'advanced')} title="Advanced" detail="Acciones, evaluaciones continuas, entornos, versiones y analítica avanzada." />
                    </div>
                  </div>

                  <LuminousButton type="submit" disabled={loading}>
                    {loading ? 'Construyendo especificación…' : 'Construir primera versión'}
                    <ArrowRight size={16} />
                  </LuminousButton>
                  {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                </form>
              </GlassCard>

              <div className="space-y-6">
                {result ? (
                  <GlassCard className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div><SectionBadge icon={CheckCircle2}>{result.status}</SectionBadge><h2 className="mt-5 font-serif text-4xl text-slate-950">{result.name}</h2><p className="mt-2 text-slate-500">{result.role}</p></div>
                      <Rocket className="text-blue-600" size={32} />
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-blue-50 p-4"><strong className="block text-blue-700">Plantilla</strong>{result.template}</div>
                      <div className="rounded-2xl bg-emerald-50 p-4"><strong className="block text-emerald-700">Plan</strong>{result.plan}</div>
                      <div className="rounded-2xl bg-slate-100 p-4"><strong className="block text-slate-700">Canal</strong>{result.channel}</div>
                      <div className="rounded-2xl bg-slate-100 p-4"><strong className="block text-slate-700">Bolsa</strong>{result.includedInteractions.toLocaleString('es-ES')} interacciones</div>
                    </div>
                    <div className="mt-6"><h3 className="flex items-center gap-2 font-semibold text-slate-950"><ShieldCheck size={18} className="text-blue-600" />Controles generados</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{result.controls.map((item) => <li key={item}>• {item}</li>)}</ul></div>
                    <div className="mt-6"><h3 className="flex items-center gap-2 font-semibold text-slate-950"><TestTube2 size={18} className="text-blue-600" />Suite de evaluación</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{result.tests.map((item) => <li key={item}>• {item}</li>)}</ul></div>
                    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"><strong>Siguiente paso:</strong> {result.deployment.next}. Producción solo después de superar las pruebas y recibir aprobación.</div>
                  </GlassCard>
                ) : (
                  <GlassCard className="p-6 md:p-8">
                    <SectionBadge icon={ClipboardCheck}>Resultado automático</SectionBadge>
                    <h2 className="mt-5 font-serif text-4xl text-slate-950">Una especificación lista para evaluar</h2>
                    <div className="mt-6 space-y-4">
                      {[[LockKeyhole, 'Controles y permisos', 'El nivel de autonomía determina confirmaciones, trazabilidad y revisión humana.'], [TestTube2, 'Pruebas automáticas', 'El sistema genera casos frecuentes, excepciones, seguridad, coste y escalado.'], [Rocket, 'Sandbox antes de producción', 'La primera versión se crea en un entorno aislado y versionado.']].map(([Icon, title, text]) => <div key={title} className="flex gap-4 rounded-2xl bg-white/70 p-4"><Icon className="shrink-0 text-blue-600" /><div><strong className="text-slate-950">{title}</strong><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div></div>)}
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>
          </div>
        </section>
      </LuminousBackground>
    </>
  );
}

