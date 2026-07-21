import Head from 'next/head';
import { Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import ContactForm from '../components/contacto/ContactForm';
import ContactInfo from '../components/contacto/ContactInfo';
import {
  GlassCard,
  LuminousBackground,
  SectionBadge,
} from '../components/luminous/LuminousKit';
import { SITE } from '../lib/constants';

export default function ContactoPage() {
  return (
    <>
      <Head>
        <title>Contacto — AgentIA</title>
        <meta name="description" content="Contacta con AgentIA para revisar procesos, agentes IA recomendados y una simulación inicial de ROI." />
        <link rel="canonical" href={`${SITE.url}/contacto`} />
        <meta property="og:title" content="Contacto — AgentIA" />
        <meta property="og:description" content="Revisa con AgentIA tus procesos, agentes recomendados y un escenario inicial de ROI." />
        <meta property="og:url" content={`${SITE.url}/contacto`} />
        <meta property="og:image" content={`${SITE.url}/images/verticals-editorial/tech.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <LuminousBackground>
        <section className="pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionBadge icon={Sparkles}>Revision con consultor</SectionBadge>
                <h1 className="mt-6 font-serif text-[48px] leading-[1] text-slate-950 md:text-[76px]">
                  Hablemos de tu equipo de agentes IA
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Cuéntanos qué procesos quieres mejorar y te ayudaremos a convertirlos en una simulación inicial de agentes, inversión e impacto.
                </p>

                <GlassCard className="mt-8 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl text-slate-950">Llamada de diagnóstico</h2>
                      <p className="text-sm text-slate-500">30 minutos para revisar sector, procesos y oportunidades.</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      ['Mapa de procesos automatizables', CheckCircle2],
                      ['Agentes recomendados por impacto', CheckCircle2],
                      ['Estimacion inicial de ROI', CheckCircle2],
                      ['Roadmap de despliegue por fases', Clock],
                    ].map(([text, Icon]) => (
                      <div key={text} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                        <Icon size={17} className="mt-0.5 shrink-0 text-emerald-500" />
                        {text}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.72fr]">
                <ContactForm />
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </LuminousBackground>
    </>
  );
}
