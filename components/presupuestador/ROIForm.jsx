import { useState } from 'react';
import {
  TrendingUp, Users, Settings, Headphones, ShieldAlert,
  DollarSign, Activity, Cpu,
} from 'lucide-react';
import { ROI_CATEGORIES } from '../../data/roi-variables';
import { getCategoryForCaso } from '../../lib/roi-calculator';
import Card from '../ui/Card';

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
              <div className="w-9 h-9 rounded-lg bg-gold-400/10 flex items-center justify-center">
                <Icon size={18} className="text-gold-400" />
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-white">{cat.label}</h3>
                <p className="text-xs text-slate-500">{cat.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {casosInCat.map(c => (
                <span key={c.id} className="px-2 py-0.5 text-xs rounded bg-navy-700/50 text-slate-400 border border-navy-600/30">
                  {c.c}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.fields.map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {field.label}{field.unit && ` (${field.unit})`}
                  </label>
                  <input
                    type={field.type}
                    step={field.step || '1'}
                    placeholder={field.placeholder}
                    value={catValues[field.key] || ''}
                    onChange={e => onChange(catKey, field.key, e.target.value)}
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-colors"
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
