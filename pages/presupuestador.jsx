import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { CASOS_DATA, getSectores, getCasosBySector, buildCasosMap } from '../data/casos';
import { calcResumen } from '../lib/calculations';
import { descargarPropuesta } from '../components/presupuestador/ProposalGenerator';
import SectorSelector from '../components/presupuestador/SectorSelector';
import CaseList from '../components/presupuestador/CaseList';
import SummaryPanel from '../components/presupuestador/SummaryPanel';
import EmailModal from '../components/presupuestador/EmailModal';
import SectionHeading from '../components/ui/SectionHeading';

export default function PresupuestadorPage() {
  const router = useRouter();
  const sectores = getSectores();
  const casosMap = buildCasosMap();

  const [sector, setSector] = useState(sectores[0]);
  const [selected, setSelected] = useState([]);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (router.query.sector && sectores.includes(router.query.sector)) {
      setSector(router.query.sector);
      setSelected([]);
    }
  }, [router.query.sector]);

  const casosSector = getCasosBySector(sector);
  const resumen = calcResumen(selected, casosMap);

  const handleSectorChange = (s) => {
    setSector(s);
    setSelected([]);
  };

  const handleToggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleDownload = () => {
    descargarPropuesta(
      resumen.selectedCasos, sector, resumen.sinergia,
      resumen.invYear1, resumen.invBundled, resumen.roiBundled, resumen.beneficioBundled
    );
  };

  return (
    <>
      <Head>
        <title>Presupuestador — AgentIA</title>
        <meta name="description" content="Calcula el ROI de implementar agentes IA en tu empresa. Selecciona casos de uso y descubre sinergias." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          eyebrow="Presupuestador"
          title="Calcula tu inversion en IA"
          description="Selecciona los casos de uso que necesitas, descubre sinergias y obtiene un presupuesto detallado con ROI garantizado."
        />

        <SectorSelector
          sectores={sectores}
          selected={sector}
          onChange={handleSectorChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CaseList
              casos={casosSector}
              selected={selected}
              onToggle={handleToggle}
            />
          </div>
          <div>
            <SummaryPanel
              resumen={resumen}
              onEmailClick={() => setShowEmail(true)}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>

      <EmailModal
        isOpen={showEmail}
        onClose={() => setShowEmail(false)}
        resumen={resumen}
        sector={sector}
        onFallbackDownload={handleDownload}
      />
    </>
  );
}
