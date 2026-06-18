const colorMap = {
  Chat: 'bg-accent-500/20 text-accent-300 border-accent-500/30',
  Voz: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Automatizacion: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Integracion: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
};

export default function Badge({ type, className = '' }) {
  const colors = colorMap[type] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${colors} ${className}`}>
      {type}
    </span>
  );
}
