import { Mail, Phone, MapPin } from 'lucide-react';

const items = [
  { icon: Mail, label: 'Email', value: 'info@agentia.es' },
  { icon: Phone, label: 'Telefono', value: '+34 900 000 000' },
  { icon: MapPin, label: 'Ubicacion', value: 'Madrid, Espana' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-display font-bold text-white mb-6">Informacion de contacto</h3>
        <div className="space-y-5">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-gold-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-sm text-white font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-display font-bold text-white mb-3">Horario</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Lunes - Viernes</span>
            <span className="text-white">9:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Sabado</span>
            <span className="text-white">10:00 - 14:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Domingo</span>
            <span className="text-slate-500">Cerrado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
