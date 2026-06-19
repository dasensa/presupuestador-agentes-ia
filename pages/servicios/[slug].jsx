import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight,
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
} from 'lucide-react';
import { getCasoBySlug, getAllSlugs, getCasosBySector, SECTORES_META } from '../../data/casos';
import { calcBeneficio } from '../../lib/calculations';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import QuickROICalculator from '../../components/servicios/QuickROICalculator';

const iconMap = {
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
};

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const caso = getCasoBySlug(params.slug);
  if (!caso) return { notFound: true };

  const sectorCasos = getCasosBySector(caso.s).filter(c => c.id !== caso.id);
  const beneficio = calcBeneficio(caso.t, caso.ini, caso.rec);

  return {
    props: {
      caso,
      sectorCasos: sectorCasos.slice(0, 4),
      beneficio,
    },
  };
}

export default function AgentePage({ caso, sectorCasos, beneficio }) {
  const meta = SECTORES_META[caso.s];
  const Icon = meta ? iconMap[meta.icon] : Zap;

  return (
    <>
      <Head>
        <title>{`${caso.c} — ${caso.s} | AgentIA`}</title>
        <meta name="description" content={caso.desc} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-body-sm text-base-muted hover:text-brand-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Volver a servicios
        </Link>

        <div className="ds-card p-8 md:p-10 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
              <Icon size={24} className="text-brand-mint" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge type={caso.t} />
                <span className="text-label uppercase text-base-subtle">{caso.s}</span>
              </div>
              <h1 className="text-display-sm md:text-display-md font-serif text-base-text">
                {caso.c}
              </h1>
            </div>
          </div>

          <p className="text-body text-base-muted leading-relaxed mb-8">
            {caso.desc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="ds-card p-4 text-center">
              <p className="text-label uppercase text-base-subtle mb-1">Inversion inicial</p>
              <p className="font-serif italic text-[20px] text-base-text">&euro;{caso.ini.toLocaleString()}</p>
            </div>
            <div className="ds-card p-4 text-center">
              <p className="text-label uppercase text-base-subtle mb-1">Coste mensual</p>
              <p className="font-serif italic text-[20px] text-base-text">&euro;{caso.rec.toLocaleString()}</p>
            </div>
            <div className="ds-card p-4 text-center">
              <p className="text-label uppercase text-base-subtle mb-1">Beneficio anual</p>
              <p className="font-serif italic text-[20px] text-brand-mint">&euro;{Math.round(beneficio).toLocaleString()}</p>
            </div>
            <div className="ds-card p-4 text-center">
              <p className="text-label uppercase text-base-subtle mb-1">Area</p>
              <p className="font-serif italic text-[20px] text-brand-blue-soft">{caso.prob}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={`/presupuestador?agent=${caso.slug}`} variant="primary" size="lg">
              Presupuestar este agente
              <ArrowRight size={16} />
            </Button>
            <Button href="/contacto" variant="secondary" size="lg">
              Solicitar mas informacion
            </Button>
          </div>
        </div>

        <QuickROICalculator caso={caso} />

        {sectorCasos.length > 0 && (
          <div>
            <h2 className="font-serif text-[20px] text-base-text mb-4">
              Otros agentes en {caso.s}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectorCasos.map(c => (
                <Link
                  key={c.id}
                  href={`/servicios/${c.slug}`}
                  className="ds-card-hover p-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-[15px] text-base-text">{c.c}</p>
                      <p className="text-body-sm text-base-subtle mt-1">Desde &euro;{c.ini.toLocaleString()}</p>
                    </div>
                    <Badge type={c.t} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
