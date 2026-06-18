import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ArrowLeft, ArrowRight,
  ShoppingBag, Landmark, HeartPulse, Wifi, Truck,
  Plane, Shield, Zap, GraduationCap, Code,
} from 'lucide-react';
import { CASOS_DATA, getCasoBySlug, getAllSlugs, getCasosBySector, SECTORES_META } from '../../data/casos';
import { calcBeneficio } from '../../lib/calculations';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

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
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Volver a servicios
        </Link>

        <div className="glass-card p-8 md:p-10 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
              <Icon size={28} className="text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge type={caso.t} />
                <span className="text-xs text-slate-500">{caso.s}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                {caso.c}
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed mb-8">
            {caso.desc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Inversion inicial</p>
              <p className="text-lg font-bold text-white">&euro;{caso.ini.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Coste mensual</p>
              <p className="text-lg font-bold text-white">&euro;{caso.rec.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Beneficio anual</p>
              <p className="text-lg font-bold text-emerald-400">&euro;{Math.round(beneficio).toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Area</p>
              <p className="text-lg font-bold text-gold-400">{caso.prob}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={`/presupuestador?sector=${encodeURIComponent(caso.s)}`} variant="primary" size="lg">
              Presupuestar este agente
              <ArrowRight size={18} />
            </Button>
            <Button href="/contacto" variant="secondary" size="lg">
              Solicitar mas informacion
            </Button>
          </div>
        </div>

        {sectorCasos.length > 0 && (
          <div>
            <h2 className="text-lg font-display font-bold text-white mb-4">
              Otros agentes en {caso.s}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectorCasos.map(c => (
                <Link
                  key={c.id}
                  href={`/servicios/${c.slug}`}
                  className="glass-card p-4 transition-all hover:-translate-y-0.5 hover:border-gold-400/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white text-sm">{c.c}</p>
                      <p className="text-xs text-slate-500 mt-1">Desde &euro;{c.ini.toLocaleString()}</p>
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
