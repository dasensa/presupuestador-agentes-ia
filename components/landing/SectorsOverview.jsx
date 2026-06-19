import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SECTORES_META, getCasosBySector } from '../../data/casos';
import SectionHeading from '../ui/SectionHeading';
import SectorThumbnail from '../icons/SectorThumbnail';

export default function SectorsOverview() {
  const sectores = Object.entries(SECTORES_META);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sectores"
          title="Soluciones para cada industria"
          description="Mas de 70 casos de uso distribuidos en 10 sectores clave. Cada agente esta disenado para resolver problemas reales de tu industria."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {sectores.map(([name, meta]) => {
            const caseCount = getCasosBySector(name).length;
            return (
              <Link
                key={name}
                href={`/servicios#${name.toLowerCase().replace('/', '-')}`}
                className="group ds-card-hover p-4 transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <SectorThumbnail
                    src={meta.image}
                    alt=""
                    className="h-8 w-12 shrink-0"
                    sizes="48px"
                  />
                  <span className="font-serif text-[15px] text-base-text">{name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-base-subtle">{caseCount} casos</span>
                  <ArrowRight size={12} className="text-base-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
