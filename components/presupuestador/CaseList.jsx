import CaseCard from './CaseCard';

export default function CaseList({ casos, selected, onToggle }) {
  const popularIds = casos.length > 0 ? [casos[0].id] : [];

  return (
    <div className="ds-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-[20px] text-base-text">Casos de uso</h2>
        <span className="text-body-sm text-base-subtle">{selected.length} seleccionados</span>
      </div>
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {casos.map(caso => (
          <CaseCard
            key={caso.id}
            caso={caso}
            checked={selected.includes(caso.id)}
            onToggle={() => onToggle(caso.id)}
            popular={popularIds.includes(caso.id)}
          />
        ))}
      </div>
    </div>
  );
}
