import { useState } from 'react';
import { Calculator, CheckCircle2, Clock3, Info } from 'lucide-react';
import { ROI_CATEGORIES } from '../../data/roi-variables';
import { getCategoryForCaso, calcROIModel, ROI_SCENARIOS } from '../../lib/roi-calculator';
import Tooltip from '../ui/Tooltip';

function money(value) {
  return `${Math.round(value).toLocaleString()} €`;
}

export default function QuickROICalculator({ caso, pricing }) {
  const category = getCategoryForCaso(caso);
  const cat = ROI_CATEGORIES[category];
  const [values, setValues] = useState({});
  const [usageVolume, setUsageVolume] = useState('');
  const [factors, setFactors] = useState({ alcance: 60, efectividad: Math.round(cat.mejora * 100), adopcion: 80 });

  if (!cat) return null;

  const complete = cat.fields.every((field) => Number(values[field.key]) > 0) && Number(usageVolume) > 0;
  const models = Object.keys(ROI_SCENARIOS).map((scenario) => ({
    scenario,
    ...ROI_SCENARIOS[scenario],
    ...calcROIModel({ category, vars: values, initialCost: caso.ini, pricing, usageVolume, scenario, factors }),
  }));

  return (
    <div className="ds-card p-6 md:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Calculator size={20} /></div>
        <div>
          <h2 className="font-serif text-3xl text-slate-950">Calcula un ROI basado en tu operación</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">El beneficio se calcula a partir de tu volumen y valor operativo. No depende del precio del agente.</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cat.fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`roi-${field.key}`} className="mb-1.5 flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              {field.label}{field.unit && ` (${field.unit})`}{field.tooltip && <Tooltip text={field.tooltip} />}
            </label>
            <input id={`roi-${field.key}`} type={field.type} min="0" step={field.step || '1'} placeholder={field.placeholder} value={values[field.key] || ''} onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100" />
          </div>
        ))}
        <div>
          <label htmlFor="roi-usage-volume" className="mb-1.5 flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            Consumo facturable mensual ({pricing.unitPlural})
          </label>
          <input id="roi-usage-volume" type="number" min="0" step="1" placeholder={String(pricing.included)} value={usageVolume} onChange={(event) => setUsageVolume(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100" />
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-7">
        <div className="flex items-center gap-2"><Info size={17} className="text-blue-600" /><h3 className="font-serif text-xl text-slate-950">Hipótesis de realización</h3></div>
        <p className="mt-2 text-sm text-slate-500">Ajusta qué parte del volumen entra en alcance, con qué efectividad trabaja el agente y qué adopción alcanzará.</p>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ['alcance', 'Volumen en alcance'], ['efectividad', 'Mejora o automatización'], ['adopcion', 'Adopción del proceso'],
          ].map(([key, label]) => (
            <label key={key} htmlFor={`factor-${key}`} className="block">
              <span className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500"><span>{label}</span><span>{factors[key]}%</span></span>
              <input id={`factor-${key}`} type="range" min="10" max="100" step="5" value={factors[key]} onChange={(event) => setFactors((prev) => ({ ...prev, [key]: Number(event.target.value) }))} className="mt-3 w-full accent-blue-600" />
            </label>
          ))}
        </div>
      </div>

      {!complete ? (
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">Completa todos los datos operativos para calcular los escenarios. Los valores grises son ejemplos, no datos asumidos.</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {models.map((model) => (
            <div key={model.scenario} className={`rounded-3xl border p-5 ${model.scenario === 'probable' ? 'border-blue-300 bg-blue-50/70' : 'border-slate-200 bg-white/75'}`}>
              <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">{model.label}</span>{model.scenario === 'probable' && <CheckCircle2 size={17} className="text-blue-600" />}</div>
              <div className={`mt-4 font-serif text-4xl ${model.roi >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{Math.round(model.roi)}%</div>
              <p className="mt-1 text-xs text-slate-500">ROI del primer año</p>
              <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
                <div className="flex justify-between gap-3 text-slate-500"><span>Beneficio anual</span><strong className="text-slate-800">{money(model.beneficioAnual)}</strong></div>
                <div className="flex justify-between gap-3 text-slate-500"><span>Coste primer año</span><strong className="text-slate-800">{money(model.costePrimerAno)}</strong></div>
                <div className="flex justify-between gap-3 text-slate-500"><span>Operación mensual</span><strong className="text-slate-800">{money(model.monthlyOperationCost)}</strong></div>
                <div className="flex justify-between gap-3 text-slate-500"><span>Beneficio neto</span><strong className="text-slate-800">{money(model.beneficioNeto)}</strong></div>
                <div className="flex justify-between gap-3 text-slate-500"><span>Payback</span><strong className="text-slate-800">{model.paybackMonths ? `${model.paybackMonths.toFixed(1)} meses` : 'No alcanzado'}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-100 p-4 text-xs leading-5 text-slate-500">
        <Clock3 size={16} className="mt-0.5 shrink-0" />
        <p>Estimación orientativa sin IVA. El coste incluye la cuota base y el exceso calculado con el consumo indicado. Servicios externos extraordinarios se presupuestan aparte. El escenario probable usa las hipótesis visibles; conservador y alto aplican −35% y +30%.</p>
      </div>
    </div>
  );
}
