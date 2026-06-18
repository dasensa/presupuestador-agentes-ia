import Link from 'next/link';
import { NAV_LINKS, SITE } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-navy-600/50 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-white">Agent</span>
              <span className="text-gradient-gold">IA</span>
            </span>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-xs">
              {SITE.tagline}. Transformamos empresas con agentes de inteligencia artificial especializados por sector.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navegacion</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>info@agentia.es</li>
              <li>+34 900 000 000</li>
              <li>Madrid, Espana</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-navy-600/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} AgentIA. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer transition-colors">Politica de privacidad</span>
            <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer transition-colors">Terminos de servicio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
