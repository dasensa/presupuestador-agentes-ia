import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer>
      {/* Pre-footer CTA */}
      <div className="bg-[#071014] border-y border-brand-mint/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-display-sm text-white">Hablemos de tu proyecto</h2>
            <p className="text-base-muted text-body mt-2 max-w-md">
              Descubre como los agentes IA pueden transformar tu sector. Sin compromiso.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded px-8 py-4 bg-brand-mint text-[#041012] text-body font-semibold transition-colors hover:bg-[#7dfcf2]"
          >
            Solicitar demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#060a0d] border-t border-brand-mint/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Col 1: Brand + Newsletter */}
            <div>
              <Link href="/" className="flex items-baseline gap-0">
                <span className="font-serif text-[22px] text-base-text">AgentIA</span>
                <span className="text-brand-mint text-[10px] font-sans font-medium relative -top-2.5">®</span>
              </Link>
              <p className="text-base-muted text-body-sm mt-4 leading-relaxed">
                Consultoria de agentes de inteligencia artificial especializados por sector.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="mt-6">
                <label className="text-label uppercase text-base-subtle block mb-2">Newsletter</label>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="flex-1 min-w-0 bg-surface-input border border-border-input px-3 py-2.5 text-body-sm text-base-text placeholder:text-base-subtle focus:outline-none focus:border-border-focus transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-mint text-[#041012] text-body-sm font-semibold transition-colors hover:bg-[#7dfcf2]"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Col 2: Servicios */}
            <div>
              <h3 className="text-label uppercase text-base-text tracking-wider mb-4">Servicios</h3>
              <ul className="space-y-2.5">
                {['Retail', 'Banca', 'Salud', 'Telecom', 'Logistica', 'Seguros'].map(s => (
                  <li key={s}>
                    <Link href={`/servicios#${s.toLowerCase()}`} className="text-body-sm text-base-muted hover:text-base-text transition-colors">
                      Agentes {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Empresa */}
            <div>
              <h3 className="text-label uppercase text-base-text tracking-wider mb-4">Empresa</h3>
              <ul className="space-y-2.5">
                <li><Link href="/servicios" className="text-body-sm text-base-muted hover:text-base-text transition-colors">Servicios</Link></li>
                <li><Link href="/presupuestador" className="text-body-sm text-base-muted hover:text-base-text transition-colors">Presupuestador</Link></li>
                <li><Link href="/contacto" className="text-body-sm text-base-muted hover:text-base-text transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Col 4: Contacto */}
            <div>
              <h3 className="text-label uppercase text-base-text tracking-wider mb-4">Contacto</h3>
              <ul className="space-y-2.5 text-body-sm text-base-muted">
                <li>info@agentia.es</li>
                <li>+34 900 000 000</li>
                <li>Madrid, Espana</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-sm text-base-subtle">
              &copy; {new Date().getFullYear()} AgentIA. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <span className="text-body-sm text-base-subtle hover:text-base-muted cursor-pointer transition-colors">Politica de privacidad</span>
              <span className="text-body-sm text-base-subtle hover:text-base-muted cursor-pointer transition-colors">Terminos de servicio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
