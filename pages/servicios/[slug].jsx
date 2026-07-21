import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCasoBySlug, getAllSlugs, getCasosBySector, SECTORES_META } from '../../data/casos';
import { calcBeneficio } from '../../lib/calculations';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import QuickROICalculator from '../../components/servicios/QuickROICalculator';
import SectorThumbnail from '../../components/icons/SectorThumbnail';
import { SITE } from '../../lib/constants';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAzMiAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIGZpbGw9IiMwZTFhMmIiLz48cmVjdCB4PSIxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE4IiBmaWxsPSIjMTQyNzNkIi8+PC9zdmc+';

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const caso = getCasoBySlug(params.slug);
  if (!caso) return { notFound: true };

  const meta = SECTORES_META[caso.s];
  const imageSrc = meta.image;
  const sectorCasos = getCasosBySector(caso.s).filter(c => c.id !== caso.id);
  const beneficio = calcBeneficio(caso.t, caso.ini, caso.rec);

  return {
    props: {
      caso,
      sectorCasos: sectorCasos.slice(0, 4),
      beneficio,
      imageSrc,
      sectorImage: imageSrc,
    },
  };
}

export default function AgentePage({ caso, sectorCasos, beneficio, imageSrc, sectorImage }) {
  const meta = SECTORES_META[caso.s];
  const canonical = `${SITE.url}/servicios/${caso.slug}`;
  const socialImage = `${SITE.url}${imageSrc}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: caso.c,
    description: caso.desc,
    serviceType: `Agente IA de ${caso.t}`,
    areaServed: 'ES',
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: caso.ini, url: canonical },
  };

  return (
    <>
      <Head>
        <title>{`${caso.c} — ${caso.s} | AgentIA`}</title>
        <meta name="description" content={caso.desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${caso.c} — ${caso.s} | AgentIA`} />
        <meta property="og:description" content={caso.desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-body-sm text-base-muted hover:text-brand-blue transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Volver a servicios
        </Link>

        <div className="ds-card p-8 md:p-10 mb-8">
          <div className="relative h-[200px] w-full overflow-hidden mb-8 border border-border">
            <Image
              src={imageSrc}
              alt={`Profesionales del sector ${caso.s} trabajando con herramientas digitales`}
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 1024px) 896px, 100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-base-bg/30" />
          </div>

          <div className="flex items-start gap-4 mb-6">
            <SectorThumbnail
              src={sectorImage || meta?.image}
              alt={`Sector ${caso.s}`}
              className="h-12 w-16 shrink-0"
              sizes="64px"
            />
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
              <p className="text-label uppercase text-base-subtle mb-1">Inversión inicial</p>
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
              Solicitar más información
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
