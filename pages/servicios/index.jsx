import { useState } from 'react';
import Head from 'next/head';
import { SECTORES_META, getCasosBySector, getSectores } from '../../data/casos';
import SectorDetail from '../../components/servicios/SectorDetail';
import SectionHeading from '../../components/ui/SectionHeading';

export default function ServiciosPage() {
  const sectores = getSectores();
  const [active, setActive] = useState(null);

  const scrollToSector = (name) => {
    setActive(name);
    const anchor = name.toLowerCase().replace('/', '-');
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Servicios por Sector — AgentIA</title>
        <meta name="description" content="Soluciones de agentes IA especializados para cada industria. Retail, Banca, Salud, Telecom y mas." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones por sector"
          description="Cada sector tiene desafios unicos. Nuestros agentes IA estan disenados para resolver los problemas reales de tu industria."
        />

        <div className="sticky top-14 z-40 bg-base-bg/95 backdrop-blur-sm -mx-4 px-4 py-3 mb-8 border-b border-border">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {sectores.map(s => (
              <button
                key={s}
                onClick={() => scrollToSector(s)}
                className={`px-4 py-2 text-body-sm font-sans whitespace-nowrap transition-colors ${
                  active === s
                    ? 'text-base-text border-b-2 border-brand-blue'
                    : 'text-base-muted hover:text-base-text'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {sectores.map(name => (
            <SectorDetail
              key={name}
              name={name}
              meta={SECTORES_META[name]}
              casos={getCasosBySector(name)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
