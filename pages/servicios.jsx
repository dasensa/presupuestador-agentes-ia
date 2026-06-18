import { useState } from 'react';
import Head from 'next/head';
import { SECTORES_META, getCasosBySector, getSectores } from '../data/casos';
import SectorDetail from '../components/servicios/SectorDetail';
import SectionHeading from '../components/ui/SectionHeading';

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

        <div className="sticky top-16 md:top-20 z-40 bg-navy-950/90 backdrop-blur-lg -mx-4 px-4 py-3 mb-8 border-b border-navy-600/30">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sectores.map(s => (
              <button
                key={s}
                onClick={() => scrollToSector(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  active === s
                    ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-navy-700/50 border border-transparent'
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
