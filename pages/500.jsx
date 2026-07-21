import Head from 'next/head';
import { ArrowRight, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Error interno | AgentIA</title>
        <meta
          name="description"
          content="Ha ocurrido un error temporal en AgentIA. Contacta con el equipo o vuelve al inicio."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(0,245,228,0.16),transparent_24rem)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ds-card p-8 md:p-12 text-center">
            <span className="text-label uppercase text-brand-mint tracking-widest">
              Error 500
            </span>
            <h1 className="mt-6 font-serif text-[44px] md:text-[64px] leading-[1] text-base-text">
              Algo no ha respondido como esperábamos
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-base-muted">
              Puede ser una incidencia temporal. Intenta recargar la página o contacta con AgentIA para que revisemos tu caso.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/" variant="primary" size="lg">
                Volver al inicio
                <RefreshCw size={16} />
              </Button>
              <Button href="/contacto" variant="secondary" size="lg">
                Contactar soporte
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
