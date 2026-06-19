const colorMap = {
  Chat: 'bg-badge-chat-bg text-badge-chat-text',
  Voz: 'bg-badge-voz-bg text-badge-voz-text',
  Automatizacion: 'bg-badge-auto-bg text-badge-auto-text',
  Integracion: 'bg-badge-integ-bg text-badge-integ-text',
};

export default function Badge({ type, className = '' }) {
  const colors = colorMap[type] || 'bg-surface-card text-base-muted';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-label uppercase tracking-wider ${colors} ${className}`}>
      {type}
    </span>
  );
}
