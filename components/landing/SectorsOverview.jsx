import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SECTORES_META, getCasosBySector } from '../../data/casos';
import SectionHeading from '../ui/SectionHeading';

export default function SectorsOverview() {
  const sectores = Object.entries(SECTORES_META);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-start mb-14">
          <SectionHeading
            eyebrow="Sectores"
            title="Escenarios de despliegue"
            description="Mas de 70 casos de uso distribuidos en 10 sectores clave. Cada agente esta disenado para resolver problemas reales de tu industria."
            align="left"
          />
          <p className="text-body text-base-muted leading-relaxed lg:pt-12">
            El sistema se despliega por escenarios: deteccion predictiva, agentes autonomos, decision en baja latencia y automatizacion conectada a tus herramientas actuales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {sectores.map(([name, meta]) => {
            const caseCount = getCasosBySector(name).length;
            return (
              <Link
                key={name}
                href={`/servicios#${name.toLowerCase().replace('/', '-')}`}
                className="group ds-card-hover overflow-hidden rounded-md transition-all duration-200"
              >
                <div className="relative h-32 bg-[#071014]">
                  <Image
                    src={meta.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover opacity-70 saturate-125 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071014] via-[#071014]/35 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-serif text-[18px] text-base-text">{name}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-brand-mint text-[#041012]">
                      <ArrowRight size={13} />
                    </span>
                  </div>
                  <span className="text-body-sm text-base-subtle">{caseCount} casos automatizables</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
