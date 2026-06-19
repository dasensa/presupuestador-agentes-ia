import Head from 'next/head';
import { Calendar } from 'lucide-react';
import ContactForm from '../components/contacto/ContactForm';
import ContactInfo from '../components/contacto/ContactInfo';
import SectionHeading from '../components/ui/SectionHeading';

export default function ContactoPage() {
  return (
    <>
      <Head>
        <title>Contacto — AgentIA</title>
        <meta name="description" content="Contacta con AgentIA para una consultoria personalizada sobre agentes de inteligencia artificial." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          description="Cuentanos sobre tu empresa y tus objetivos. Te ayudaremos a encontrar la solucion de IA que mejor se adapte a tus necesidades."
        />

        {/* Calendly placeholder */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="ds-card p-8 md:p-12 text-center" style={{ borderColor: 'rgba(0,87,255,0.2)' }}>
            <Calendar size={32} className="text-brand-blue mx-auto mb-4" />
            <h3 className="font-serif text-display-sm text-base-text mb-2">Reserva una llamada</h3>
            <p className="text-body text-base-muted mb-6 max-w-md mx-auto">
              Elige el horario que mejor te convenga para una consultoria personalizada de 30 minutos.
            </p>
            <div className="ds-card p-6 max-w-sm mx-auto" style={{ borderColor: 'rgba(0,87,255,0.15)' }}>
              <div className="space-y-3">
                {['Lunes - Viernes', '9:00 — 18:00 CET'].map((text, i) => (
                  <p key={i} className={`text-body-sm ${i === 0 ? 'text-base-text' : 'text-base-muted'}`}>{text}</p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-body-sm text-base-subtle italic">
                  Integracion con Calendly disponible proximamente
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  );
}
