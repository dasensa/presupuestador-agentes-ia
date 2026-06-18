import { PROB_TO_CATEGORY, ROI_CATEGORIES } from '../data/roi-variables';

export const getCategoryForCaso = (caso) => {
  return PROB_TO_CATEGORY[caso.prob] || 'operacion';
};

export const calcBeneficioMensual = (category, vars) => {
  const v = vars || {};
  const cat = ROI_CATEGORIES[category];
  if (!cat) return 0;

  switch (category) {
    case 'conversion': {
      const leads = Number(v.leads) || 0;
      const tasa = (Number(v.tasaConversion) || 0) / 100;
      const ticket = Number(v.ticketMedio) || 0;
      return leads * (tasa * cat.mejora) * ticket;
    }
    case 'retencion': {
      const clientes = Number(v.clientesActivos) || 0;
      const churn = (Number(v.tasaChurn) || 0) / 100;
      const ltv = Number(v.ltv) || 0;
      return clientes * (churn * cat.mejora) * ltv;
    }
    case 'operacion': {
      const ops = Number(v.operaciones) || 0;
      const coste = Number(v.costeOperacion) || 0;
      return ops * coste * cat.mejora;
    }
    case 'soporte': {
      const tickets = Number(v.tickets) || 0;
      const coste = Number(v.costeTicket) || 0;
      return tickets * coste * cat.mejora;
    }
    case 'cobranza': {
      const casos = Number(v.casos) || 0;
      const tasa = (Number(v.tasaRecuperacion) || 0) / 100;
      const importe = Number(v.importeMedio) || 0;
      return casos * (tasa * cat.mejora) * importe;
    }
    case 'ingresos': {
      const clientes = Number(v.clientesContactables) || 0;
      const tasa = (Number(v.tasaUpsell) || 0) / 100;
      const valor = Number(v.valorUpsell) || 0;
      return clientes * (tasa * cat.mejora) * valor;
    }
    case 'seguimiento': {
      const usuarios = Number(v.usuarios) || 0;
      const coste = Number(v.costeSeguimiento) || 0;
      return usuarios * coste * cat.mejora;
    }
    case 'tecnologia': {
      const horas = Number(v.horasManuales) || 0;
      const coste = Number(v.costeHora) || 0;
      return horas * coste * cat.mejora;
    }
    default:
      return 0;
  }
};

export const calcCosteInactividad = (category, vars) => {
  return calcBeneficioMensual(category, vars);
};

export const calcROIPersonalizado = (category, vars, inversionAnual) => {
  const beneficioMensual = calcBeneficioMensual(category, vars);
  const beneficioAnual = beneficioMensual * 12;
  if (inversionAnual <= 0) return 0;
  return ((beneficioAnual - inversionAnual) / inversionAnual) * 100;
};

export const calcResumenPersonalizado = (selectedCasos, variablesPorCategoria) => {
  const categorias = {};

  selectedCasos.forEach(caso => {
    const cat = getCategoryForCaso(caso);
    if (!categorias[cat]) {
      categorias[cat] = { casos: [], inversionAnual: 0 };
    }
    categorias[cat].casos.push(caso);
    categorias[cat].inversionAnual += caso.ini + caso.rec * 12;
  });

  let beneficioMensualTotal = 0;
  let inversionTotal = 0;
  const detalles = [];

  Object.entries(categorias).forEach(([cat, data]) => {
    const vars = variablesPorCategoria[cat] || {};
    const benefMensual = calcBeneficioMensual(cat, vars);
    const benefAnual = benefMensual * 12;
    const roi = data.inversionAnual > 0 ? ((benefAnual - data.inversionAnual) / data.inversionAnual) * 100 : 0;

    beneficioMensualTotal += benefMensual;
    inversionTotal += data.inversionAnual;

    detalles.push({
      categoria: cat,
      label: ROI_CATEGORIES[cat]?.label || cat,
      casos: data.casos,
      inversionAnual: data.inversionAnual,
      beneficioMensual: benefMensual,
      beneficioAnual: benefAnual,
      roi,
      costeInactividad: benefMensual,
    });
  });

  const beneficioAnualTotal = beneficioMensualTotal * 12;
  const roiTotal = inversionTotal > 0 ? ((beneficioAnualTotal - inversionTotal) / inversionTotal) * 100 : 0;

  return {
    detalles,
    beneficioMensualTotal,
    beneficioAnualTotal,
    inversionTotal,
    roiTotal,
    costeInactividadMensual: beneficioMensualTotal,
  };
};
