import Head from 'next/head';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import ValueProposition from '../components/landing/ValueProposition';
import SectorsOverview from '../components/landing/SectorsOverview';
import CTASection from '../components/landing/CTASection';
import { SITE } from '../lib/constants';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{`${SITE.name} — ${SITE.tagline}`}</title>
        <meta name="description" content={SITE.description} />
      </Head>
      <Hero />
      <Stats />
      <ValueProposition />
      <SectorsOverview />
      <CTASection />
    </>
  );
}
