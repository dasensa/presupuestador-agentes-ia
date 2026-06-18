import { useState } from 'react';
import { Send } from 'lucide-react';
import { getSectores } from '../../data/casos';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ContactForm() {
  const sectores = getSectores();
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', sector: '', mensaje: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ nombre: '', email: '', empresa: '', sector: '', mensaje: '' });
      } else {
        alert('Error al enviar el formulario. Intentalo de nuevo.');
      }
    } catch {
      alert('Error de conexion. Intentalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <Send size={24} className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2">Mensaje enviado</h3>
        <p className="text-slate-400 text-sm">Nos pondremos en contacto contigo lo antes posible.</p>
        <button onClick={() => setSent(false)} className="mt-4 text-gold-400 text-sm hover:underline">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Nombre *" type="text" value={form.nombre} onChange={update('nombre')} placeholder="Tu nombre" />
        <Input label="Email *" type="email" value={form.email} onChange={update('email')} placeholder="tu@empresa.com" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Empresa" type="text" value={form.empresa} onChange={update('empresa')} placeholder="Nombre de tu empresa" />
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Sector</label>
          <select
            value={form.sector}
            onChange={update('sector')}
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-colors"
          >
            <option value="">Seleccionar sector</option>
            {sectores.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">Mensaje *</label>
        <textarea
          value={form.mensaje}
          onChange={update('mensaje')}
          placeholder="Cuentanos sobre tu proyecto..."
          rows={4}
          className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-colors resize-none"
        />
      </div>
      <Button type="submit" disabled={loading} variant="primary" className="w-full">
        <Send size={16} /> {loading ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
}
