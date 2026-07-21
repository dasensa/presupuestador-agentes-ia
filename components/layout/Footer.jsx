import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="ds-card p-8 md:p-10 mb-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600">
                <Sparkles size={13} />
                Simulacion AgentIA
              </span>
              <h2 className="mt-5 font-serif text-display-sm text-slate-950">Empieza por una simulación. Decide con datos.</h2>
              <p className="mt-3 max-w-2xl text-body text-slate-500">
                Selecciona tu sector, identifica procesos y recibe una estimación inicial de inversión, retorno e impacto operativo.
              </p>
            </div>
            <Link
              href="/presupuestador"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brand-blue to-brand-mint px-7 py-3.5 text-body font-semibold text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)] transition-transform hover:-translate-y-0.5"
            >
              Crear mi simulación
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-baseline gap-0">
              <span className="font-serif text-[24px] text-slate-950">AgentIA</span>
              <span className="text-brand-blue text-[10px] font-sans font-medium relative -top-2.5">®</span>
            </Link>
            <p className="mt-4 max-w-sm text-body-sm leading-relaxed text-slate-500">
              Plataforma de simulación y diseño de equipos de agentes IA para empresas.
            </p>
          </div>

          <div>
            <h3 className="text-label uppercase text-slate-950 tracking-wider mb-4">Explorar</h3>
            <ul className="space-y-2.5">
              <li><Link className="text-body-sm text-slate-500 hover:text-slate-950" href="/servicios">Agentes por sector</Link></li>
              <li><Link className="text-body-sm text-slate-500 hover:text-slate-950" href="/presupuestador">Presupuestador ROI</Link></li>
              <li><Link className="text-body-sm text-slate-500 hover:text-slate-950" href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-label uppercase text-slate-950 tracking-wider mb-4">Sectores</h3>
            <ul className="space-y-2.5">
              {['Retail', 'Banca', 'Salud', 'Telecom', 'Logistica', 'Tech/SaaS'].map((s) => (
                <li key={s}>
                  <Link href={`/servicios#${s.toLowerCase().replace('/', '-')}`} className="text-body-sm text-slate-500 hover:text-slate-950">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-label uppercase text-slate-950 tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-2.5 text-body-sm text-slate-500">
              <li>info@agentia.es</li>
              <li>Madrid, España</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col gap-3 text-body-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} AgentIA. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-slate-700">Politica de privacidad</Link>
            <Link href="/terminos" className="hover:text-slate-700">Terminos de servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
