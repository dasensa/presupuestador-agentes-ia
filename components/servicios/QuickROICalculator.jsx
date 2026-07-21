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
    <div className="ds-card p-6 md:p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center border border-border">
          <Calculator size={20} className="text-brand-mint" />
        </div>
        <div>
          <h2 className="font-serif text-[20px] text-base-text">Calcula un escenario de ROI</h2>
          <p className="text-body-sm text-base-muted">Introduce tus datos para obtener una estimación personalizada</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cat.fields.map(field => (
          <div key={field.key}>
            <label htmlFor={`roi-${field.key}`} className="flex items-center text-label uppercase text-base-muted tracking-wider mb-1.5">
              {field.label}{field.unit && ` (${field.unit})`}
              {field.tooltip && <Tooltip text={field.tooltip} />}
            </label>
            <input
              id={`roi-${field.key}`}
              type={field.type}
              step={field.step || '1'}
              placeholder={field.placeholder}
              value={values[field.key] || ''}
              onChange={e => update(field.key, e.target.value)}
              className="w-full bg-surface-input border border-border-input px-3 py-2.5 text-body-sm text-base-text placeholder:text-base-subtle focus:outline-none focus:border-border-focus transition-colors"
            />
          </div>
        ))}
      </div>

      {hasValues && benefMensual > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          <div className="ds-card p-4" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-400" />
              <span className="text-label uppercase text-red-300 tracking-wider">Oportunidad estimada /mes</span>
            </div>
            <p className="font-serif italic text-[28px] text-red-400">
              &euro;{Math.round(benefMensual).toLocaleString()}
            </p>
          </div>
          <div className="ds-card p-4" style={{ borderColor: 'rgba(0,240,160,0.25)' }}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-brand-mint" />
              <span className="text-label uppercase text-brand-mint tracking-wider">ROI personalizado</span>
            </div>
            <p className="font-serif italic text-[28px] text-brand-mint">
              {Math.round(roi)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
