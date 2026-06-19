import { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { getSectores } from '../../data/casos';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function CompanyForm({ initialSector, onComplete }) {
  const sectores = getSectores();
  const [form, setForm] = useState({
    email: '',
    sector: initialSector || '',
  });
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.sector) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/registrar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // No bloquear el flujo si falla el envio del lead
    }
    setLoading(false);
    onComplete(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="ds-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center border border-border">
            <Zap size={20} className="text-brand-mint" />
          </div>
          <div>
            <h2 className="font-serif text-[20px] text-base-text">Empieza tu simulacion</h2>
            <p className="text-body-sm text-base-muted">Solo necesitamos tu email y sector para comenzar</p>
          </div>
        </div>

        <div className="space-y-5">
          <Input label="Email corporativo *" type="email" value={form.email} onChange={update('email')} placeholder="tu@empresa.com" required />
          <div>
            <label className="block text-label uppercase text-base-muted tracking-wider mb-2">Sector *</label>
            <select
              value={form.sector}
              onChange={update('sector')}
              required
              className="w-full bg-surface-input border border-border-input px-4 py-3 text-body-sm text-base-text focus:outline-none focus:border-border-focus transition-colors"
            >
              <option value="">Seleccionar sector</option>
              {sectores.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <Button type="submit" disabled={loading} variant="primary" size="lg" className="w-full">
            {loading ? 'Procesando...' : 'Ver casos de uso de mi sector'}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
}
