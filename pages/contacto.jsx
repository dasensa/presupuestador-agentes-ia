import Head from 'next/head';
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
