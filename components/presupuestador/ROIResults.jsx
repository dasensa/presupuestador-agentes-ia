import { AlertTriangle, TrendingUp, Mail, Download } from 'lucide-react';
import Button from '../ui/Button';

export default function ROIResults({ resumen, onEmailClick, onDownload }) {
  if (!resumen || resumen.detalles.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <TrendingUp className="w-12 h-12 text-gold-400/40 mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Introduce tus datos operativos para ver el ROI personalizado.</p>
      </div>
    );
  }

  const hasData = resumen.beneficioMensualTotal > 0;

  return (
    <div className="space-y-4 sticky top-28">
      <div className="glass-card p-5 border-red-500/30 bg-red-500/5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-400" />
          <span className="text-xs font-bold text-red-300 tracking-wider uppercase">Coste de inaccion mensual</span>
        </div>
        <div className="text-3xl font-display font-bold text-red-400">
          {hasData ? `€${Math.round(resumen.costeInaccionMensual).toLocaleString()}` : '—'}
        </div>
        {hasData && (
          <p className="text-xs text-red-300/70 mt-2">
            Este es el coste de no actuar: lo que tu empresa pierde cada mes por no implementar.
          </p>
        )}
      </div>

      <div className="glass-card p-5 border-emerald-500/20">
        <div className="text-xs text-emerald-300 font-bold tracking-wider mb-2">ROI PERSONALIZADO</div>
        <div className="text-4xl font-display font-bold text-emerald-400">
          {hasData ? `${Math.round(resumen.roiTotal)}%` : '—'}
        </div>
        <div className="text-xs text-slate-400 mt-2">
          Beneficio anual: {hasData ? `€${Math.round(resumen.beneficioAnualTotal).toLocaleString()}` : '—'}
        </div>
        {hasData && (
          <div className="mt-3 w-full bg-navy-700/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(resumen.roiTotal / 5, 100)}%` }}
            />
          </div>
        )}
      </div>

      <div className="glass-card p-5 border-accent-500/20">
        <div className="text-xs text-accent-300 font-bold tracking-wider mb-2">INVERSION TOTAL ANO 1</div>
        <div className="text-2xl font-display font-bold text-white">
          &euro;{Math.round(resumen.inversionTotal).toLocaleString()}
        </div>
      </div>

      {hasData && resumen.detalles.length > 1 && (
        <div className="glass-card p-4">
          <div className="text-xs text-slate-500 font-bold tracking-wider mb-3">DESGLOSE POR AREA</div>
          <div className="space-y-2">
            {resumen.detalles.map(d => (
              <div key={d.categoria} className="flex justify-between items-center text-sm">
                <span className="text-slate-400">{d.label}</span>
                <div className="text-right">
                  <span className="text-emerald-400 font-semibold">{Math.round(d.roi)}%</span>
                  <span className="text-slate-600 ml-2 text-xs">&euro;{Math.round(d.costeInaccion).toLocaleString()}/mes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={onEmailClick} variant="primary" className="w-full">
        <Mail size={16} /> Enviar propuesta
      </Button>

      <Button onClick={onDownload} variant="ghost" className="w-full border border-navy-600/50">
        <Download size={16} /> Descargar propuesta
      </Button>
    </div>
  );
}
