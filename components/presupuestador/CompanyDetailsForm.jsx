import { Building2 } from 'lucide-react';
import Input from '../ui/Input';

const EMPLEADOS = ['1-50', '51-200', '201-500', '501-1.000', '1.000+'];
const PRESUPUESTO = ['< 25.000 EUR', '25.000 - 50.000 EUR', '50.000 - 100.000 EUR', '100.000 - 250.000 EUR', '> 250.000 EUR'];
const URGENCIA = ['Inmediata', '1-3 meses', '3-6 meses', 'Solo estoy explorando'];

function Select({ label, value, onChange, options, placeholder, required }) {
  return (
    <div>
      <label className="block text-label uppercase text-base-muted tracking-wider mb-2">
        {label}{required && ' *'}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-surface-input border border-border-input px-4 py-3 text-body-sm text-base-text focus:outline-none focus:border-border-focus transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function CompanyDetailsForm({ values, onChange, highlight }) {
  const update = (field) => (e) => onChange({ ...values, [field]: e.target.value });

  return (
    <div id="company-details" className={`ds-card p-6 md:p-8 transition-all ${highlight ? 'border-brand-blue' : ''}`} style={highlight ? { borderColor: 'rgba(0,87,255,0.6)' } : {}}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center border border-border">
          <Building2 size={20} className="text-brand-mint" />
        </div>
        <div>
          <h2 className="font-serif text-[20px] text-base-text">Completa tu perfil</h2>
          <p className="text-body-sm text-base-muted">Estos datos personalizan tu propuesta y permiten descargarla</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Nombre completo *" type="text" value={values.nombre} onChange={update('nombre')} placeholder="Tu nombre" />
          <Input label="Empresa *" type="text" value={values.empresa} onChange={update('empresa')} placeholder="Nombre de tu empresa" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Cargo" type="text" value={values.cargo} onChange={update('cargo')} placeholder="Ej: Director de Operaciones" />
          <Input label="Telefono" type="tel" value={values.telefono} onChange={update('telefono')} placeholder="+34 600 000 000" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Select label="Empleados" value={values.empleados} onChange={update('empleados')} options={EMPLEADOS} placeholder="Seleccionar" required />
          <Select label="Presupuesto estimado" value={values.presupuesto} onChange={update('presupuesto')} options={PRESUPUESTO} placeholder="Seleccionar" />
          <Select label="Urgencia" value={values.urgencia} onChange={update('urgencia')} options={URGENCIA} placeholder="Seleccionar" />
        </div>
      </div>
    </div>
  );
}
