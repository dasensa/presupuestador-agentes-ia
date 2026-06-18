import { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { getSectores } from '../../data/casos';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EMPLEADOS = ['1-50', '51-200', '201-500', '501-1.000', '1.000+'];
const PRESUPUESTO = ['< 25.000 EUR', '25.000 - 50.000 EUR', '50.000 - 100.000 EUR', '100.000 - 250.000 EUR', '> 250.000 EUR'];
const URGENCIA = ['Inmediata', '1-3 meses', '3-6 meses', 'Solo estoy explorando'];

function Select({ label, value, onChange, options, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label}{required && ' *'}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function CompanyForm({ initialSector, onComplete }) {
  const sectores = getSectores();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    sector: initialSector || '',
    empleados: '',
    presupuesto: '',
    urgencia: '',
  });
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.empresa || !form.sector || !form.empleados) {
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
            <Building2 size={20} className="text-gold-400" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-white">Cuentanos sobre tu empresa</h2>
            <p className="text-sm text-slate-400">Estos datos nos permiten personalizar tu simulacion</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Nombre completo *" type="text" value={form.nombre} onChange={update('nombre')} placeholder="Tu nombre" required />
            <Input label="Email corporativo *" type="email" value={form.email} onChange={update('email')} placeholder="tu@empresa.com" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Empresa *" type="text" value={form.empresa} onChange={update('empresa')} placeholder="Nombre de tu empresa" required />
            <Input label="Cargo" type="text" value={form.cargo} onChange={update('cargo')} placeholder="Ej: Director de Operaciones" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Telefono" type="tel" value={form.telefono} onChange={update('telefono')} placeholder="+34 600 000 000" />
            <Select label="Sector" value={form.sector} onChange={update('sector')} options={sectores} placeholder="Seleccionar sector" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Select label="Empleados" value={form.empleados} onChange={update('empleados')} options={EMPLEADOS} placeholder="Seleccionar" required />
            <Select label="Presupuesto estimado" value={form.presupuesto} onChange={update('presupuesto')} options={PRESUPUESTO} placeholder="Seleccionar" />
            <Select label="Urgencia" value={form.urgencia} onChange={update('urgencia')} options={URGENCIA} placeholder="Seleccionar" />
          </div>
        </div>

        <div className="mt-8">
          <Button type="submit" disabled={loading} variant="primary" size="lg" className="w-full">
            {loading ? 'Procesando...' : 'Continuar a la simulacion'}
            <ArrowRight size={18} />
          </Button>
          <p className="text-xs text-slate-500 text-center mt-3">
            Los campos marcados con * son obligatorios
          </p>
        </div>
      </div>
    </form>
  );
}
