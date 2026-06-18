import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Check, ArrowLeft, Plus, X } from 'lucide-react';
import { getSectores, getCasosBySector, getCasoBySlug, buildCasosMap, CASOS_DATA } from '../data/casos';
import { calcResumen } from '../lib/calculations';
import { calcResumenPersonalizado } from '../lib/roi-calculator';
import { descargarPropuesta } from '../components/presupuestador/ProposalGenerator';
import CompanyForm from '../components/presupuestador/CompanyForm';
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
              <span className={`text-sm font-medium hidden sm:inline ${
                done ? 'text-emerald-400' :
                active ? 'text-gold-400' :
                'text-slate-500'
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-10 sm:w-20 h-0.5 ${done ? 'bg-emerald-500' : 'bg-navy-600'}`} />
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

  const handleDownload = () => {
    descargarPropuesta(
      resumen.selectedCasos, sector, resumen.sinergia,
      resumen.invYear1, resumen.invBundled, resumen.roiBundled, resumen.beneficioBundled,
      companyData, resumenROI
    );
  };

  const stepTitles = {
    1: 'Calcula tu inversion en IA',
    2: directAgent ? `Simulacion: ${directAgent.c}` : 'Selecciona tus casos de uso',
    3: 'Personaliza tu ROI',
  };

  const stepDescriptions = {
    1: 'Primero cuentanos sobre tu empresa para personalizar la simulacion.',
    2: directAgent
      ? `Agente pre-seleccionado para ${companyData?.empresa || 'tu empresa'}. Puedes anadir mas agentes si lo necesitas.`
      : `Simulacion para ${companyData?.empresa || 'tu empresa'}. Selecciona los agentes IA que necesitas.`,
    3: 'Introduce tus datos operativos reales para calcular un ROI preciso y el coste de inaccion.',
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

        <StepBar current={step} />

        {step === 1 && (
          <CompanyForm
            initialSector={directAgent?.s || initialSector}
            onComplete={handleCompanyComplete}
          />
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <button onClick={() => goToStep(1)} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors">
                <ArrowLeft size={16} /> Volver a datos de empresa
              </button>
            </div>

            {/* Selected agents summary */}
            {selected.length > 0 && (
              <div className="glass-card p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">{selected.length} agente{selected.length > 1 ? 's' : ''} seleccionado{selected.length > 1 ? 's' : ''}</span>
                  {!showAddMore && (
                    <button
                      onClick={() => setShowAddMore(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <Plus size={14} /> Anadir mas agentes
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.map(id => {
                    const c = casosMap[id];
                    return (
                      <div key={id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-700/50 border border-navy-600/30">
                        <span className="text-sm text-white">{c.c}</span>
                        <Badge type={c.t} />
                        <button onClick={() => handleRemoveAgent(id)} className="text-slate-500 hover:text-red-400 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Show full catalog only if no direct agent or user clicked "add more" */}
            {(!directAgent || showAddMore) && (
              <>
                <SectorSelector sectores={sectores} selected={sector} onChange={handleSectorChange} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <CaseList casos={casosSector} selected={selected} onToggle={handleToggle} />
                  </div>
                  <div>
                    <SummaryPanel resumen={resumen} onPersonalizar={() => goToStep(3)} />
                  </div>
                </div>
              </>
            )}

            {/* Direct agent mode: show summary directly */}
            {directAgent && !showAddMore && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-display font-bold text-white mb-4">Detalle del agente</h2>
                    <div className="p-4 rounded-xl bg-navy-700/30 border border-gold-400/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{directAgent.c}</span>
                        <Badge type={directAgent.t} />
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{directAgent.desc}</p>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="glass-card p-3">
                          <p className="text-xs text-slate-500">Inversion inicial</p>
                          <p className="text-sm font-bold text-white">&euro;{directAgent.ini.toLocaleString()}</p>
                        </div>
                        <div className="glass-card p-3">
                          <p className="text-xs text-slate-500">Coste mensual</p>
                          <p className="text-sm font-bold text-white">&euro;{directAgent.rec.toLocaleString()}</p>
                        </div>
                        <div className="glass-card p-3">
                          <p className="text-xs text-slate-500">Sector</p>
                          <p className="text-sm font-bold text-gold-400">{directAgent.s}</p>
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
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-6">
              <button onClick={() => goToStep(2)} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors">
                <ArrowLeft size={16} /> Volver a seleccion de agentes
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ROIForm selectedCasos={selectedCasos} values={roiVariables} onChange={handleROIVarChange} />
              </div>
              <div>
                <ROIResults resumen={resumenROI} onEmailClick={() => setShowEmail(true)} onDownload={handleDownload} />
              </div>
            </div>

            <EmailModal
              isOpen={showEmail}
              onClose={() => setShowEmail(false)}
              resumen={resumen}
              resumenROI={resumenROI}
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
