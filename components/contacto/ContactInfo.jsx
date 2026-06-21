import { Mail, Phone, MapPin } from 'lucide-react';

const items = [
  { icon: Mail, label: 'Email', value: 'info@agentia.es' },
  { icon: Phone, label: 'Telefono', value: '+34 900 000 000' },
  { icon: MapPin, label: 'Ubicacion', value: 'Madrid, Espana' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="ds-card p-6">
        <h3 className="font-serif text-[20px] text-base-text mb-6">Informacion de contacto</h3>
        <div className="space-y-5">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <Icon size={18} className="text-brand-mint" />
              </div>
              <div>
                <p className="text-label uppercase text-base-subtle">{label}</p>
                <p className="text-body-sm text-base-text font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-card p-6">
        <h3 className="font-serif text-[20px] text-base-text mb-3">Horario</h3>
        <div className="space-y-2 text-body-sm">
          <div className="flex justify-between">
            <span className="text-base-muted">Lunes - Viernes</span>
            <span className="text-base-text">9:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-muted">Sabado</span>
            <span className="text-base-text">10:00 - 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-muted">Domingo</span>
            <span className="text-base-subtle">Cerrado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
