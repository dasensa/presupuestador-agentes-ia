import { useState } from 'react';
import { Send } from 'lucide-react';
import { getSectores } from '../../data/casos';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ContactForm() {
  const sectores = getSectores();
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', sector: '', mensaje: '', website: '' });
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
        setForm({ nombre: '', email: '', empresa: '', sector: '', mensaje: '', website: '' });
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
      <div className="ds-card p-8 text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-cyan-50 mx-auto mb-4">
          <Send size={24} className="text-brand-mint" />
        </div>
        <h3 className="font-serif text-display-sm text-base-text mb-2">Mensaje enviado</h3>
        <p className="text-body-sm text-base-muted">Nos pondremos en contacto contigo lo antes posible.</p>
        <button onClick={() => setSent(false)} className="mt-4 text-brand-blue text-body-sm hover:opacity-80 transition-opacity">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ds-card p-6 md:p-8 space-y-5">
      <input className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={update('website')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Nombre *" type="text" value={form.nombre} onChange={update('nombre')} placeholder="Tu nombre" />
        <Input label="Email *" type="email" value={form.email} onChange={update('email')} placeholder="tu@empresa.com" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Empresa" type="text" value={form.empresa} onChange={update('empresa')} placeholder="Nombre de tu empresa" />
        <div>
          <label className="block text-label uppercase text-base-muted tracking-wider mb-2">Sector</label>
          <select
            value={form.sector}
            onChange={update('sector')}
            className="w-full rounded-2xl bg-white/80 border border-border-input px-4 py-3 text-body-sm text-base-text shadow-sm focus:outline-none focus:border-border-focus focus:ring-4 focus:ring-cyan-100 transition-colors"
          >
            <option value="">Seleccionar sector</option>
            {sectores.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-label uppercase text-base-muted tracking-wider mb-2">Mensaje *</label>
        <textarea
          value={form.mensaje}
          onChange={update('mensaje')}
          placeholder="Cuentanos sobre tu proyecto..."
          rows={4}
          className="w-full rounded-2xl bg-white/80 border border-border-input px-4 py-3 text-body-sm text-base-text placeholder:text-base-subtle shadow-sm focus:outline-none focus:border-border-focus focus:ring-4 focus:ring-cyan-100 transition-colors resize-none"
        />
      </div>
      <Button type="submit" disabled={loading} variant="primary" className="w-full">
        <Send size={16} /> {loading ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
      <p className="text-xs leading-relaxed text-base-muted">Usaremos tus datos para responder a tu solicitud. Consulta la <a href="/privacidad" className="text-brand-blue hover:underline">politica de privacidad</a>.</p>
    </form>
  );
}
