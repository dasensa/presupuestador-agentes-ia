import { PROB_TO_CATEGORY, ROI_CATEGORIES } from '../data/roi-variables.js';

export const ROI_SCENARIOS = {
  conservador: { label: 'Conservador', factor: 0.65 },
  probable: { label: 'Probable', factor: 1 },
  alto: { label: 'Alto', factor: 1.3 },
};

const DEFAULT_FACTORS = { alcance: 60, efectividad: 75, adopcion: 80 };

export const getCategoryForCaso = (caso) => PROB_TO_CATEGORY[caso.prob] || 'operacion';

function ratio(value, fallback) {
  const number = Number(value);
  return Math.min(100, Math.max(0, Number.isFinite(number) ? number : fallback)) / 100;
}

export const calcOpportunityMonthly = (category, vars = {}) => {
  const v = vars;
  switch (category) {
    case 'conversion':
      return (Number(v.leads) || 0) * ((Number(v.tasaConversion) || 0) / 100) * (Number(v.ticketMedio) || 0);
    case 'retencion':
      return (Number(v.clientesActivos) || 0) * ((Number(v.tasaChurn) || 0) / 100) * (Number(v.ltv) || 0);
    case 'operacion':
      return (Number(v.operaciones) || 0) * (Number(v.costeOperacion) || 0);
    case 'soporte':
      return (Number(v.tickets) || 0) * (Number(v.costeTicket) || 0);
    case 'cobranza':
      return (Number(v.casos) || 0) * ((Number(v.tasaRecuperacion) || 0) / 100) * (Number(v.importeMedio) || 0);
    case 'ingresos':
      return (Number(v.clientesContactables) || 0) * ((Number(v.tasaUpsell) || 0) / 100) * (Number(v.valorUpsell) || 0);
    case 'seguimiento':
      return (Number(v.usuarios) || 0) * (Number(v.costeSeguimiento) || 0);
    case 'tecnologia':
      return (Number(v.horasManuales) || 0) * (Number(v.costeHora) || 0);
    default:
      return 0;
  }
};

export const calcBeneficioMensual = (category, vars, scenario = 'probable', factors = {}) => {
  const opportunity = calcOpportunityMonthly(category, vars);
  const scenarioFactor = ROI_SCENARIOS[scenario]?.factor || 1;
  const alcance = ratio(factors.alcance, DEFAULT_FACTORS.alcance);
  const efectividad = ratio(factors.efectividad, DEFAULT_FACTORS.efectividad);
  const adopcion = ratio(factors.adopcion, DEFAULT_FACTORS.adopcion);
  const realizedShare = Math.min(1, alcance * efectividad * adopcion * scenarioFactor);
  return opportunity * realizedShare;
};

export const calcROIModel = ({ category, vars, initialCost, monthlyCost, scenario, factors }) => {
  const beneficioMensual = calcBeneficioMensual(category, vars, scenario, factors);
  const costePrimerAno = initialCost + (monthlyCost * 12);
  const beneficioAnual = beneficioMensual * 12;
  const beneficioNeto = beneficioAnual - costePrimerAno;
  const roi = costePrimerAno > 0 ? (beneficioNeto / costePrimerAno) * 100 : 0;
  const margenMensual = beneficioMensual - monthlyCost;
  const paybackMonths = margenMensual > 0 ? initialCost / margenMensual : null;
  return { beneficioMensual, beneficioAnual, costePrimerAno, beneficioNeto, roi, paybackMonths };
};

export const calcROIPersonalizado = (category, vars, inversionAnual, factors) => {
  const beneficioAnual = calcBeneficioMensual(category, vars, 'probable', factors) * 12;
  return inversionAnual > 0 ? ((beneficioAnual - inversionAnual) / inversionAnual) * 100 : 0;
};

export const calcCosteInaccion = calcOpportunityMonthly;

export const calcResumenPersonalizado = (selectedCasos, variablesPorCategoria, factors = {}) => {
  const categorias = {};
  selectedCasos.forEach((caso) => {
    const cat = getCategoryForCaso(caso);
    if (!categorias[cat]) categorias[cat] = { casos: [], inversionAnual: 0 };
    categorias[cat].casos.push(caso);
    categorias[cat].inversionAnual += caso.ini + caso.rec * 12;
  });

  let beneficioMensualTotal = 0;
  let inversionTotal = 0;
  const detalles = Object.entries(categorias).map(([cat, data]) => {
    const beneficioMensual = calcBeneficioMensual(cat, variablesPorCategoria[cat] || {}, 'probable', factors);
    const beneficioAnual = beneficioMensual * 12;
    const roi = data.inversionAnual > 0 ? ((beneficioAnual - data.inversionAnual) / data.inversionAnual) * 100 : 0;
    beneficioMensualTotal += beneficioMensual;
    inversionTotal += data.inversionAnual;
    return { categoria: cat, label: ROI_CATEGORIES[cat]?.label || cat, casos: data.casos, inversionAnual: data.inversionAnual, beneficioMensual, beneficioAnual, roi };
  });
  const beneficioAnualTotal = beneficioMensualTotal * 12;
  return {
    detalles,
    beneficioMensualTotal,
    beneficioAnualTotal,
    inversionTotal,
    roiTotal: inversionTotal > 0 ? ((beneficioAnualTotal - inversionTotal) / inversionTotal) * 100 : 0,
  };
};
