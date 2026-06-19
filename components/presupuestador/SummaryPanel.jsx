import { TrendingUp, ArrowRight, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function SummaryPanel({ resumen, onPersonalizar }) {
  if (!resumen || resumen.selectedCasos.length === 0) {
    return (
      <div className="ds-card p-8 text-center">
        <Zap className="w-12 h-12 text-base-subtle mx-auto mb-4" />
        <p className="text-body-sm text-base-muted">Selecciona casos de uso para ver el analisis de inversion y ROI.</p>
      </div>
    );
  }

  const { sinergia, invYear1, invBundled, beneficioBundled, roiBundled } = resumen;

  return (
    <div className="space-y-4 sticky top-28">
      {sinergia.bonus > 0 && (
        <div className="ds-card p-4" style={{ borderColor: 'rgba(0,240,160,0.25)' }}>
          <h3 className="text-body-sm font-medium text-brand-mint mb-2 flex items-center gap-2">
            <TrendingUp size={14} /> Sinergias Detectadas
          </h3>
          <div className="text-body-sm text-base-muted space-y-1">
            <p>+{sinergia.bonus}% ROI por integracion inteligente</p>
            <p>-{sinergia.disc}% inversion por economia de escala</p>
          </div>
        </div>
      )}

      <div className="ds-card p-5" style={{ borderColor: 'rgba(0,87,255,0.2)' }}>
        <div className="text-label uppercase text-brand-blue-soft tracking-wider mb-2">Inversion ano 1 (estimada)</div>
        <div className="font-serif italic text-[32px] text-base-text">
          &euro;{Math.round(invBundled).toLocaleString()}
        </div>
        {sinergia.disc > 0 && (
          <div className="text-body-sm text-brand-mint mt-2">
            Ahorro por sinergia: &euro;{Math.round(invYear1 - invBundled).toLocaleString()}
          </div>
        )}
      </div>

      <div className="ds-card p-5" style={{ borderColor: 'rgba(0,240,160,0.2)' }}>
        <div className="text-label uppercase text-brand-mint tracking-wider mb-2">ROI estimado</div>
        <div className="font-serif italic text-[40px] text-brand-mint">
          {(roiBundled * 100).toFixed(0)}%
        </div>
        <div className="text-body-sm text-base-muted mt-2">
          Beneficio anual estimado: &euro;{Math.round(beneficioBundled).toLocaleString()}
        </div>
        <p className="text-body-sm text-base-subtle mt-3 italic">
          Calculo generico. Personaliza con tus datos reales en el siguiente paso.
        </p>
      </div>

      <Button onClick={onPersonalizar} variant="primary" className="w-full">
        Personalizar mi ROI
        <ArrowRight size={16} />
      </Button>
    </div>
  );
}
