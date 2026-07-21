import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative ds-card p-6 max-w-md w-full animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-display-sm font-serif text-base-text">{title}</h2>
          <button ref={closeRef} type="button" aria-label="Cerrar" onClick={onClose} className="text-base-muted hover:text-base-text transition-colors p-1">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
