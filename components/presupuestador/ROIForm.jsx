import {
  TrendingUp, Users, Settings, Headphones, ShieldAlert,
  DollarSign, Activity, Cpu,
} from 'lucide-react';
import { ROI_CATEGORIES } from '../../data/roi-variables';
import { getCategoryForCaso } from '../../lib/roi-calculator';
import Card from '../ui/Card';
import Tooltip from '../ui/Tooltip';

const iconMap = { TrendingUp, Users, Settings, Headphones, ShieldAlert, DollarSign, Activity, Cpu };

export default function ROIForm({ selectedCasos, values, onChange }) {
  const categories = [...new Set(selectedCasos.map(c => getCategoryForCaso(c)))];

  return (
    <div className="space-y-6">
      {categories.map(catKey => {
        const cat = ROI_CATEGORIES[catKey];
        if (!cat) return null;
        const Icon = iconMap[cat.icon] || Settings;
        const catValues = values[catKey] || {};
        const casosInCat = selectedCasos.filter(c => getCategoryForCaso(c) === catKey);

        return (
          <Card key={catKey} className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 flex items-center justify-center border border-border">
                <Icon size={16} className="text-brand-mint" />
              </div>
              <div>
                <h3 className="font-serif text-[15px] text-base-text">{cat.label}</h3>
                <p className="text-body-sm text-base-subtle">{cat.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {casosInCat.map(c => (
                <span key={c.id} className="px-2 py-0.5 text-body-sm bg-surface-card text-base-muted border border-border">
                  {c.c}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.fields.map(field => (
                <div key={field.key}>
                  <label className="flex items-center text-label uppercase text-base-muted tracking-wider mb-1.5">
                    {field.label}{field.unit && ` (${field.unit})`}
                    {field.tooltip && <Tooltip text={field.tooltip} />}
                  </label>
                  <input
                    type={field.type}
                    step={field.step || '1'}
                    placeholder={field.placeholder}
                    value={catValues[field.key] || ''}
                    onChange={e => onChange(catKey, field.key, e.target.value)}
                    className="w-full bg-surface-input border border-border-input px-3 py-2.5 text-body-sm text-base-text placeholder:text-base-subtle focus:outline-none focus:border-border-focus transition-colors"
                  />
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
