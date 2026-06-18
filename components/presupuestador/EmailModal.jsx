import { useState } from 'react';
import { Send, User, Mail } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function EmailModal({ isOpen, onClose, resumen, sector, companyData, onFallbackDownload }) {
  const [loading, setLoading] = useState(false);

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
          roi: (resumen.roiBundled * 100).toFixed(0),
          inversion: Math.round(resumen.invBundled),
          beneficio: Math.round(resumen.beneficioBundled),
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
        <div className="glass-card p-4 bg-navy-800/80">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Enviar a</p>
          <div className="flex items-center gap-3 mb-2">
            <User size={14} className="text-gold-400" />
            <span className="text-sm text-white">{companyData?.nombre}{companyData?.cargo && ` — ${companyData.cargo}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={14} className="text-gold-400" />
            <span className="text-sm text-slate-300">{companyData?.email}</span>
          </div>
          {companyData?.empresa && (
            <p className="text-xs text-slate-500 mt-2">{companyData.empresa}</p>
          )}
        </div>

        <div className="glass-card p-4 bg-navy-800/80">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Resumen</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-bold text-white">{resumen?.selectedCasos.length}</p>
              <p className="text-xs text-slate-500">Agentes</p>
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-400">{resumen ? (resumen.roiBundled * 100).toFixed(0) : 0}%</p>
              <p className="text-xs text-slate-500">ROI</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">&euro;{resumen ? Math.round(resumen.invBundled).toLocaleString() : 0}</p>
              <p className="text-xs text-slate-500">Inversion</p>
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading} variant="primary" className="w-full">
          <Send size={16} /> {loading ? 'Enviando...' : 'Confirmar y enviar'}
        </Button>
      </div>
    </Modal>
  );
}
