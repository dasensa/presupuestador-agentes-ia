import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Página no encontrada | AgentIA</title>
        <meta
          name="description"
          content="La pagina solicitada no existe. Explora los servicios de AgentIA o calcula el ROI de tus agentes IA."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(0,245,228,0.16),transparent_24rem)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-card p-8 md:p-12">
            <span className="text-label uppercase text-brand-mint tracking-widest">
              Error 404
            </span>
            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <h1 className="font-serif text-[44px] md:text-[68px] leading-[0.98] text-base-text">
                  Esta ruta no tiene agente asignado
                </h1>
                <p className="mt-6 max-w-2xl text-body-lg text-base-muted">
                  La página que buscas no existe o ha cambiado de ubicación. Puedes volver al inicio, explorar los agentes por sector o calcular directamente el ROI.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/" variant="primary" size="lg">
                    Ir al inicio
                    <Home size={16} />
                  </Button>
                  <Button href="/servicios" variant="secondary" size="lg">
                    Ver servicios
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border border-brand-mint/30 bg-[#071014] p-6">
                <Search className="text-brand-mint" size={28} />
                <h2 className="mt-5 font-serif text-[24px] text-base-text">
                  Rutas utiles
                </h2>
                <div className="mt-5 space-y-3">
                  {[
                    ['Presupuestador ROI', '/presupuestador'],
                    ['Servicios por sector', '/servicios'],
                    ['Contacto comercial', '/contacto'],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between border-b border-border pb-3 text-body-sm text-base-muted transition-colors hover:text-base-text"
                    >
                      {label}
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
