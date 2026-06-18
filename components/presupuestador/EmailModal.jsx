import { useState } from 'react';
import { Send } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function EmailModal({ isOpen, onClose, resumen, sector, onFallbackDownload }) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !nombre) {
      alert('Por favor completa nombre y email');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/enviar-propuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          nombre,
          sector,
          casos: resumen.selectedCasos.length,
          roi: (resumen.roiBundled * 100).toFixed(0),
          inversion: Math.round(resumen.invBundled),
          beneficio: Math.round(resumen.beneficioBundled),
        }),
      });

      if (response.ok) {
        alert(`Propuesta enviada a ${email}`);
        onClose();
        setEmail('');
        setNombre('');
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
      <div className="space-y-4">
        <Input
          label="Nombre"
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@empresa.com"
        />
        <Button onClick={handleSubmit} disabled={loading} variant="primary" className="w-full">
          <Send size={16} /> {loading ? 'Enviando...' : 'Enviar Propuesta'}
        </Button>
      </div>
    </Modal>
  );
}
