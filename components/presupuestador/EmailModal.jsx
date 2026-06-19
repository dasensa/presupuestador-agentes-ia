import { useState } from 'react';
import { Send, User, Mail, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function EmailModal({ isOpen, onClose, resumen, resumenROI, sector, companyData, onFallbackDownload }) {
  const [loading, setLoading] = useState(false);

  const hasROI = resumenROI && resumenROI.beneficioMensualTotal > 0;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/enviar-propuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: companyData.email,
          nombre: companyData.nombre,
          empresa: companyData.empresa,
          cargo: companyData.cargo,
          telefono: companyData.telefono,
          sector,
          casos: resumen.selectedCasos.length,
          roi: hasROI ? Math.round(resumenROI.roiTotal) : (resumen.roiBundled * 100).toFixed(0),
          inversion: hasROI ? Math.round(resumenROI.inversionTotal) : Math.round(resumen.invBundled),
          beneficio: hasROI ? Math.round(resumenROI.beneficioAnualTotal) : Math.round(resumen.beneficioBundled),
          costeInaccion: hasROI ? Math.round(resumenROI.costeInaccionMensual) : null,
        }),
      });

      if (response.ok) {
        alert(`Propuesta enviada a ${companyData.email}`);
        onClose();
      } else {
        alert('Error al enviar. Descargando propuesta...');
        onFallbackDownload();
      }
    } catch {
      alert('Error de conexion. Descargando propuesta...');
      onFallbackDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enviar Propuesta">
      <div className="space-y-5">
        <div className="ds-card p-4">
          <p className="text-label uppercase text-base-subtle tracking-wider mb-3">Enviar a</p>
          <div className="flex items-center gap-3 mb-2">
            <User size={14} className="text-brand-mint" />
            <span className="text-body-sm text-base-text">{companyData?.nombre}{companyData?.cargo && ` — ${companyData.cargo}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={14} className="text-brand-mint" />
            <span className="text-body-sm text-base-muted">{companyData?.email}</span>
          </div>
          {companyData?.empresa && (
            <p className="text-body-sm text-base-subtle mt-2">{companyData.empresa}</p>
          )}
        </div>

        <div className="ds-card p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="font-serif italic text-[20px] text-base-text">{resumen?.selectedCasos.length}</p>
              <p className="text-label uppercase text-base-subtle">Agentes</p>
            </div>
            <div>
              <p className="font-serif italic text-[20px] text-brand-mint">
                {hasROI ? `${Math.round(resumenROI.roiTotal)}%` : `${resumen ? (resumen.roiBundled * 100).toFixed(0) : 0}%`}
              </p>
              <p className="text-label uppercase text-base-subtle">ROI</p>
            </div>
            <div>
              <p className="font-serif italic text-[20px] text-base-text">
                &euro;{hasROI ? Math.round(resumenROI.inversionTotal).toLocaleString() : (resumen ? Math.round(resumen.invBundled).toLocaleString() : 0)}
              </p>
              <p className="text-label uppercase text-base-subtle">Inversion</p>
            </div>
          </div>
        </div>

        {hasROI && (
          <div className="ds-card p-4" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-400" />
              <span className="text-label uppercase text-red-300 tracking-wider">Coste de inaccion /mes</span>
            </div>
            <p className="font-serif italic text-[20px] text-red-400">
              &euro;{Math.round(resumenROI.costeInaccionMensual).toLocaleString()}
            </p>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={loading} variant="primary" className="w-full">
          <Send size={16} /> {loading ? 'Enviando...' : 'Confirmar y enviar'}
        </Button>
      </div>
    </Modal>
  );
}
