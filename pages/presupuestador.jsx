import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Check, ArrowLeft } from 'lucide-react';
import { getSectores, getCasosBySector, buildCasosMap } from '../data/casos';
import { calcResumen } from '../lib/calculations';
import { descargarPropuesta } from '../components/presupuestador/ProposalGenerator';
import CompanyForm from '../components/presupuestador/CompanyForm';
import SectorSelector from '../components/presupuestador/SectorSelector';
import CaseList from '../components/presupuestador/CaseList';
import SummaryPanel from '../components/presupuestador/SummaryPanel';
import EmailModal from '../components/presupuestador/EmailModal';
import SectionHeading from '../components/ui/SectionHeading';

const STEPS = [
  { num: 1, label: 'Tu empresa' },
  { num: 2, label: 'Simulacion' },
];

function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {STEPS.map((step, i) => {
        const done = current > step.num;
        const active = current === step.num;
        return (
          <div key={step.num} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                done ? 'bg-emerald-500 text-white' :
                active ? 'bg-gold-400 text-navy-950' :
                'bg-navy-700 text-slate-500 border border-navy-600'
              }`}>
                {done ? <Check size={16} /> : step.num}
              </div>
              <span className={`text-sm font-medium ${
                done ? 'text-emerald-400' :
                active ? 'text-gold-400' :
                'text-slate-500'
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 ${done ? 'bg-emerald-500' : 'bg-navy-600'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PresupuestadorPage() {
  const router = useRouter();
  const sectores = getSectores();
  const casosMap = buildCasosMap();

  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState(null);
  const [sector, setSector] = useState(sectores[0]);
  const [selected, setSelected] = useState([]);
  const [showEmail, setShowEmail] = useState(false);

  const initialSector = router.query.sector && sectores.includes(router.query.sector)
    ? router.query.sector
    : '';

  useEffect(() => {
    if (initialSector) {
      setSector(initialSector);
    }
  }, [initialSector]);

  const casosSector = getCasosBySector(sector);
  const resumen = calcResumen(selected, casosMap);

  const handleCompanyComplete = (data) => {
    setCompanyData(data);
    setSector(data.sector);
    setSelected([]);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      resumen.invYear1, resumen.invBundled, resumen.roiBundled, resumen.beneficioBundled,
      companyData
    );
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          title={step === 1 ? 'Calcula tu inversion en IA' : 'Selecciona tus casos de uso'}
          description={step === 1
            ? 'Primero cuentanos sobre tu empresa para personalizar la simulacion.'
            : `Simulacion para ${companyData?.empresa || 'tu empresa'}. Selecciona los agentes IA que necesitas.`
          }
        />

        <StepBar current={step} />

        {step === 1 && (
          <CompanyForm
            initialSector={initialSector}
            onComplete={handleCompanyComplete}
          />
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
              >
                <ArrowLeft size={16} /> Volver a datos de empresa
              </button>
            </div>

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

            <EmailModal
              isOpen={showEmail}
              onClose={() => setShowEmail(false)}
              resumen={resumen}
              sector={sector}
              companyData={companyData}
              onFallbackDownload={handleDownload}
            />
          </>
        )}
      </div>
    </>
  );
}
