import { useState } from 'react';
import { Calculator, AlertTriangle, TrendingUp } from 'lucide-react';
import { ROI_CATEGORIES } from '../../data/roi-variables';
import { getCategoryForCaso, calcBeneficioMensual, calcROIPersonalizado } from '../../lib/roi-calculator';
import Tooltip from '../ui/Tooltip';

export default function QuickROICalculator({ caso }) {
  const category = getCategoryForCaso(caso);
  const cat = ROI_CATEGORIES[category];
  const [values, setValues] = useState({});

  if (!cat) return null;

  const update = (key, val) => setValues(prev => ({ ...prev, [key]: val }));

  const hasValues = cat.fields.some(f => values[f.key]);
  const benefMensual = calcBeneficioMensual(category, values);
  const invAnual = caso.ini + caso.rec * 12;
  const roi = calcROIPersonalizado(category, values, invAnual);

  return (
    <div className="glass-card p-6 md:p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
          <Calculator size={20} className="text-gold-400" />
        </div>
        <div>
          <h2 className="text-lg font-display font-bold text-white">Calcula tu ROI real</h2>
          <p className="text-xs text-slate-400">Introduce tus datos para un calculo personalizado</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cat.fields.map(field => (
          <div key={field.key}>
            <label className="flex items-center text-xs font-semibold text-slate-400 mb-1.5">
              {field.label}{field.unit && ` (${field.unit})`}
              {field.tooltip && <Tooltip text={field.tooltip} />}
            </label>
            <input
              type={field.type}
              step={field.step || '1'}
              placeholder={field.placeholder}
              value={values[field.key] || ''}
              onChange={e => update(field.key, e.target.value)}
              className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-colors"
            />
          </div>
        ))}
      </div>

      {hasValues && benefMensual > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          <div className="glass-card p-4 border-red-500/30 bg-red-500/5">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-400" />
              <span className="text-xs font-bold text-red-300">COSTE DE INACCION /MES</span>
            </div>
            <p className="text-2xl font-display font-bold text-red-400">
              &euro;{Math.round(benefMensual).toLocaleString()}
            </p>
          </div>
          <div className="glass-card p-4 border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">ROI PERSONALIZADO</span>
            </div>
            <p className="text-2xl font-display font-bold text-emerald-400">
              {Math.round(roi)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
