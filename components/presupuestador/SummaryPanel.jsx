import { TrendingUp, Mail, Download, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function SummaryPanel({ resumen, onEmailClick, onDownload }) {
  if (!resumen || resumen.selectedCasos.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Zap className="w-12 h-12 text-gold-400/40 mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Selecciona casos de uso para ver el analisis de inversion y ROI.</p>
      </div>
    );
  }

  const { sinergia, invYear1, invBundled, beneficioBundled, roiBundled } = resumen;

  return (
    <div className="space-y-4 sticky top-28">
      {sinergia.bonus > 0 && (
        <div className="glass-card p-4 border-emerald-500/30 bg-emerald-500/5">
          <h3 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
            <TrendingUp size={14} /> Sinergias Detectadas
          </h3>
          <div className="text-xs text-emerald-200 space-y-1">
            <p>+{sinergia.bonus}% ROI por integracion inteligente</p>
            <p>-{sinergia.disc}% inversion por economia de escala</p>
          </div>
        </div>
      )}

      <div className="glass-card p-5 border-accent-500/20">
        <div className="text-xs text-accent-300 font-bold tracking-wider mb-2">INVERSION ANO 1</div>
        <div className="text-3xl font-display font-bold text-white">
          &euro;{Math.round(invBundled).toLocaleString()}
        </div>
        {sinergia.disc > 0 && (
          <div className="text-xs text-emerald-400 mt-2">
            Ahorro por sinergia: &euro;{Math.round(invYear1 - invBundled).toLocaleString()}
          </div>
        )}
      </div>

      <div className="glass-card p-5 border-gold-400/20">
        <div className="text-xs text-gold-400 font-bold tracking-wider mb-2">ROI BUNDLED</div>
        <div className="text-4xl font-display font-bold text-emerald-400">
          {(roiBundled * 100).toFixed(0)}%
        </div>
        <div className="text-xs text-slate-400 mt-2">
          Beneficio anual: &euro;{Math.round(beneficioBundled).toLocaleString()}
        </div>

        <div className="mt-4 w-full bg-navy-700/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(roiBundled * 20, 100)}%` }}
          />
        </div>
      </div>

      <Button onClick={onEmailClick} variant="primary" className="w-full">
        <Mail size={16} /> Enviar por Email
      </Button>

      <Button onClick={onDownload} variant="ghost" className="w-full border border-navy-600/50">
        <Download size={16} /> Descargar propuesta
      </Button>
    </div>
  );
}
