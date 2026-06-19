import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Check, ArrowLeft, Plus, X } from 'lucide-react';
import { getSectores, getCasosBySector, getCasoBySlug, buildCasosMap } from '../data/casos';
import { calcResumen } from '../lib/calculations';
import { calcResumenPersonalizado } from '../lib/roi-calculator';
import { descargarPropuesta } from '../components/presupuestador/ProposalGenerator';
import CompanyForm from '../components/presupuestador/CompanyForm';
import CompanyDetailsForm from '../components/presupuestador/CompanyDetailsForm';
import SectorSelector from '../components/presupuestador/SectorSelector';
import CaseList from '../components/presupuestador/CaseList';
import SummaryPanel from '../components/presupuestador/SummaryPanel';
import ROIForm from '../components/presupuestador/ROIForm';
import ROIResults from '../components/presupuestador/ROIResults';
import EmailModal from '../components/presupuestador/EmailModal';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const STEPS = [
  { num: 1, label: 'Tu empresa' },
  { num: 2, label: 'Simulacion' },
  { num: 3, label: 'Tu ROI real' },
];

function StepSidebar({ current }) {
  const progress = ((current - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="hidden lg:block w-[200px] shrink-0">
      <div className="sticky top-20">
        <div className="space-y-6">
          {STEPS.map((step) => {
            const done = current > step.num;
            const active = current === step.num;
            return (
              <div key={step.num} className="flex items-center gap-3">
                <div className={`w-7 h-7 flex items-center justify-center text-body-sm font-medium transition-all ${
                  done ? 'bg-brand-mint text-base-bg' :
                  active ? 'bg-brand-blue text-white' :
                  'border border-border text-base-subtle'
                }`}>
                  {done ? <Check size={14} /> : step.num}
                </div>
                <span className={`text-body-sm ${
                  done ? 'text-brand-mint' :
                  active ? 'text-base-text' :
                  'text-base-subtle'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 h-0.5 bg-border overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #0057ff, #00f0a0)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MobileStepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
      {STEPS.map((step, i) => {
        const done = current > step.num;
        const active = current === step.num;
        return (
          <div key={step.num} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 flex items-center justify-center text-body-sm font-medium ${
                done ? 'bg-brand-mint text-base-bg' :
                active ? 'bg-brand-blue text-white' :
                'border border-border text-base-subtle'
              }`}>
                {done ? <Check size={14} /> : step.num}
              </div>
              <span className={`text-body-sm hidden sm:inline ${
                done ? 'text-brand-mint' :
                active ? 'text-base-text' :
                'text-base-subtle'
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-10 sm:w-16 h-px ${done ? 'bg-brand-mint' : 'bg-border'}`} />
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
  const [roiVariables, setRoiVariables] = useState({});
  const [directAgent, setDirectAgent] = useState(null);
  const [showAddMore, setShowAddMore] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    nombre: '', empresa: '', cargo: '', telefono: '',
    empleados: '', presupuesto: '', urgencia: '',
  });
  const [highlightDetails, setHighlightDetails] = useState(false);

  const initialSector = router.query.sector && sectores.includes(router.query.sector)
    ? router.query.sector : '';

  useEffect(() => {
    if (router.query.agent) {
      const caso = getCasoBySlug(router.query.agent);
      if (caso) {
        setDirectAgent(caso);
        setSector(caso.s);
        setSelected([caso.id]);
      }
    } else if (initialSector) {
      setSector(initialSector);
    }
  }, [router.query.agent, initialSector]);

  const casosSector = getCasosBySector(sector);
  const resumen = calcResumen(selected, casosMap);
  const selectedCasos = selected.map(id => casosMap[id]);
  const resumenROI = calcResumenPersonalizado(selectedCasos, roiVariables);

  const fullCompanyData = { ...companyData, ...companyDetails };
  const detailsComplete = companyDetails.nombre && companyDetails.empresa && companyDetails.empleados;

  const handleCompanyComplete = (data) => {
    setCompanyData(data);
    if (!directAgent) {
      setSector(data.sector);
      setSelected([]);
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectorChange = (s) => {
    setSector(s);
    setSelected(prev => {
      if (directAgent) return prev.filter(id => id === directAgent.id);
      return [];
    });
  };

  const handleToggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleRemoveAgent = (id) => {
    setSelected(prev => prev.filter(s => s !== id));
    if (id === directAgent?.id) setDirectAgent(null);
  };

  const handleROIVarChange = (category, key, value) => {
    setRoiVariables(prev => ({
      ...prev,
      [category]: { ...(prev[category] || {}), [key]: value },
    }));
  };

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDetails = () => {
    setHighlightDetails(true);
    document.getElementById('company-details')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setHighlightDetails(false), 2000);
  };

  const handleDownload = () => {
    if (!detailsComplete) { scrollToDetails(); return; }
    descargarPropuesta(
      resumen.selectedCasos, sector, resumen.sinergia,
      resumen.invYear1, resumen.invBundled, resumen.roiBundled, resumen.beneficioBundled,
      fullCompanyData, resumenROI
    );
  };

  const stepTitles = {
    1: 'Calcula tu inversion en IA',
    2: directAgent ? `Simulacion: ${directAgent.c}` : 'Selecciona tus casos de uso',
    3: 'Personaliza tu ROI',
  };

  const stepDescriptions = {
    1: 'Solo necesitamos tu email y sector para empezar.',
    2: directAgent
      ? 'Agente pre-seleccionado para tu empresa. Puedes anadir mas agentes si lo necesitas.'
      : 'Selecciona los agentes IA que necesitas para tu sector.',
    3: 'Introduce tus datos operativos y completa tu perfil para recibir la propuesta personalizada.',
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
          title={stepTitles[step]}
          description={stepDescriptions[step]}
        />

        <MobileStepBar current={step} />

        <div className="flex gap-10">
          <StepSidebar current={step} />

          <div className="flex-1 min-w-0">
            {step === 1 && (
              <CompanyForm
                initialSector={directAgent?.s || initialSector}
                onComplete={handleCompanyComplete}
              />
            )}

            {step === 2 && (
              <>
                <div className="mb-6">
                  <button onClick={() => goToStep(1)} className="inline-flex items-center gap-2 text-body-sm text-base-muted hover:text-brand-blue transition-colors">
                    <ArrowLeft size={16} /> Volver a datos de empresa
                  </button>
                </div>

                {selected.length > 0 && (
                  <div className="ds-card p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-body-sm font-medium text-base-text">{selected.length} agente{selected.length > 1 ? 's' : ''} seleccionado{selected.length > 1 ? 's' : ''}</span>
                      {!showAddMore && (
                        <button
                          onClick={() => setShowAddMore(true)}
                          className="inline-flex items-center gap-1.5 text-body-sm text-brand-blue hover:opacity-80 transition-opacity"
                        >
                          <Plus size={14} /> Anadir mas agentes
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.map(id => {
                        const c = casosMap[id];
                        return (
                          <div key={id} className="flex items-center gap-2 px-3 py-1.5 border border-border bg-surface-card">
                            <span className="text-body-sm text-base-text">{c.c}</span>
                            <Badge type={c.t} />
                            <button onClick={() => handleRemoveAgent(id)} className="text-base-subtle hover:text-red-400 transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {(!directAgent || showAddMore) && (
                  <>
                    <SectorSelector sectores={sectores} selected={sector} onChange={handleSectorChange} />
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                      <div className="xl:col-span-2">
                        <CaseList casos={casosSector} selected={selected} onToggle={handleToggle} />
                      </div>
                      <div>
                        <SummaryPanel resumen={resumen} onPersonalizar={() => goToStep(3)} />
                      </div>
                    </div>
                  </>
                )}

                {directAgent && !showAddMore && (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2">
                      <div className="ds-card p-6">
                        <h2 className="font-serif text-[20px] text-base-text mb-4">Detalle del agente</h2>
                        <div className="p-4 border border-brand-blue/20 bg-brand-blue/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif text-[15px] text-base-text">{directAgent.c}</span>
                            <Badge type={directAgent.t} />
                          </div>
                          <p className="text-body-sm text-base-muted mb-3">{directAgent.desc}</p>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="ds-card p-3">
                              <p className="text-label uppercase text-base-subtle">Inversion</p>
                              <p className="font-serif italic text-[16px] text-base-text">&euro;{directAgent.ini.toLocaleString()}</p>
                            </div>
                            <div className="ds-card p-3">
                              <p className="text-label uppercase text-base-subtle">Mensual</p>
                              <p className="font-serif italic text-[16px] text-base-text">&euro;{directAgent.rec.toLocaleString()}</p>
                            </div>
                            <div className="ds-card p-3">
                              <p className="text-label uppercase text-base-subtle">Sector</p>
                              <p className="font-serif italic text-[16px] text-brand-blue-soft">{directAgent.s}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <SummaryPanel resumen={resumen} onPersonalizar={() => goToStep(3)} />
                    </div>
                  </div>
                )}

                {/* Sticky bottom summary bar */}
                {selected.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 z-40 bg-base-bg/95 backdrop-blur-sm border-t border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-6 text-body-sm">
                        <span className="text-base-text font-medium">{selected.length} agente{selected.length > 1 ? 's' : ''}</span>
                        <span className="text-base-muted">
                          Inversion: <span className="font-serif italic text-base-text">&euro;{Math.round(resumen.invBundled).toLocaleString()}</span>
                        </span>
                        {resumen.sinergia?.disc > 0 && (
                          <span className="text-brand-mint">
                            -{resumen.sinergia.disc}% sinergia detectada
                          </span>
                        )}
                      </div>
                      <Button onClick={() => goToStep(3)} variant="primary" size="sm">
                        Ver ROI
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-6">
                  <button onClick={() => goToStep(2)} className="inline-flex items-center gap-2 text-body-sm text-base-muted hover:text-brand-blue transition-colors">
                    <ArrowLeft size={16} /> Volver a seleccion de agentes
                  </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2 space-y-6">
                    <ROIForm selectedCasos={selectedCasos} values={roiVariables} onChange={handleROIVarChange} />
                    <CompanyDetailsForm values={companyDetails} onChange={setCompanyDetails} highlight={highlightDetails} />
                  </div>
                  <div>
                    <ROIResults resumen={resumenROI} onEmailClick={() => { if (!detailsComplete) { scrollToDetails(); return; } setShowEmail(true); }} onDownload={handleDownload} />
                  </div>
                </div>

                <EmailModal
                  isOpen={showEmail}
                  onClose={() => setShowEmail(false)}
                  resumen={resumen}
                  resumenROI={resumenROI}
                  sector={sector}
                  companyData={fullCompanyData}
                  onFallbackDownload={handleDownload}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
