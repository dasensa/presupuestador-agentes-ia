import CaseCard from './CaseCard';

export default function CaseList({ casos, selected, onToggle }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-white">Casos de uso</h2>
        <span className="text-sm text-slate-500">{selected.length} seleccionados</span>
      </div>
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {casos.map(caso => (
          <CaseCard
            key={caso.id}
            caso={caso}
            checked={selected.includes(caso.id)}
            onToggle={() => onToggle(caso.id)}
          />
        ))}
      </div>
    </div>
  );
}
