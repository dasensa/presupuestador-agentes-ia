import { AlertTriangle, TrendingUp, Mail, Download } from 'lucide-react';
import Button from '../ui/Button';

export default function ROIResults({ resumen, onEmailClick, onDownload }) {
  if (!resumen || resumen.detalles.length === 0) {
    return (
      <div className="ds-card p-8 text-center">
        <TrendingUp className="w-12 h-12 text-base-subtle mx-auto mb-4" />
        <p className="text-body-sm text-base-muted">Introduce tus datos operativos para ver el ROI personalizado.</p>
      </div>
    );
  }

  const hasData = resumen.beneficioMensualTotal > 0;

  return (
    <div className="space-y-4 sticky top-28">
      <div className="ds-card p-5" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-400" />
          <span className="text-label uppercase text-red-300 tracking-wider">Coste de inaccion mensual</span>
        </div>
        <div className="font-serif italic text-[32px] text-red-400">
          {hasData ? `€${Math.round(resumen.costeInaccionMensual).toLocaleString()}` : '—'}
        </div>
        {hasData && (
          <p className="text-body-sm text-red-300/70 mt-2">
            Oportunidad mensual estimada bajo las hipotesis introducidas.
          </p>
        )}
      </div>

      <div className="ds-card p-5" style={{ borderColor: 'rgba(0,240,160,0.25)' }}>
        <div className="text-label uppercase text-brand-mint tracking-wider mb-2">ROI personalizado</div>
        <div className="font-serif italic text-[40px] text-brand-mint">
          {hasData ? `${Math.round(resumen.roiTotal)}%` : '—'}
        </div>
        <div className="text-body-sm text-base-muted mt-2">
          Beneficio anual: {hasData ? `€${Math.round(resumen.beneficioAnualTotal).toLocaleString()}` : '—'}
        </div>
        {hasData && (
          <div className="mt-3 w-full h-0.5 bg-border overflow-hidden">
            <div
              className="h-full bg-brand-mint transition-all duration-700"
              style={{ width: `${Math.min(resumen.roiTotal / 5, 100)}%` }}
            />
          </div>
        )}
      </div>

      <div className="ds-card p-5" style={{ borderColor: 'rgba(0,87,255,0.2)' }}>
        <div className="text-label uppercase text-brand-blue-soft tracking-wider mb-2">Inversion total ano 1</div>
        <div className="font-serif italic text-[28px] text-base-text">
          &euro;{Math.round(resumen.inversionTotal).toLocaleString()}
        </div>
      </div>

      {hasData && resumen.detalles.length > 1 && (
        <div className="ds-card p-4">
          <div className="text-label uppercase text-base-subtle tracking-wider mb-3">Desglose por area</div>
          <div className="space-y-2">
            {resumen.detalles.map(d => (
              <div key={d.categoria} className="flex justify-between items-center text-body-sm">
                <span className="text-base-muted">{d.label}</span>
                <div className="text-right">
                  <span className="text-brand-mint font-medium">{Math.round(d.roi)}%</span>
                  <span className="text-base-subtle ml-2">&euro;{Math.round(d.costeInaccion).toLocaleString()}/mes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={onEmailClick} variant="primary" className="w-full">
        <Mail size={16} /> Enviar propuesta
      </Button>

      <Button onClick={onDownload} variant="ghost" className="w-full border border-border">
        <Download size={16} /> Descargar propuesta
      </Button>
    </div>
  );
}
