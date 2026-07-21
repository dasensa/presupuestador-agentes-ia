const REGULATED_SECTORS = new Set(['Banca', 'Salud', 'Seguros', 'Energia']);
const SENSITIVE_AREAS = /Riesgo|Cobranza|Siniestros|FNOL|Tecnologia|Adherencia|Seguimiento/i;
const COMMERCIAL_AREAS = /Conversion|Adquisicion|Captacion|Ventas|Ingresos|Reserva|Venta cruzada/i;

function tierFor(caso) {
  if (REGULATED_SECTORS.has(caso.s) && SENSITIVE_AREAS.test(caso.prob)) return 'regulated';
  if (caso.t === 'Integracion' || caso.ini >= 40_000) return 'complex';
  if (COMMERCIAL_AREAS.test(caso.prob)) return 'commercial';
  return 'standard';
}

const TYPE_PRICING = {
  Chat: {
    standard: { baseMonthly: 1500, included: 1000, overage: 0.9, unit: 'resolución', unitPlural: 'resoluciones' },
    commercial: { baseMonthly: 1800, included: 750, overage: 1.1, unit: 'conversación resuelta', unitPlural: 'conversaciones resueltas' },
    complex: { baseMonthly: 2200, included: 750, overage: 1.2, unit: 'resolución', unitPlural: 'resoluciones' },
    regulated: { baseMonthly: 2500, included: 600, overage: 1.5, unit: 'caso resuelto', unitPlural: 'casos resueltos' },
  },
  Voz: {
    standard: { baseMonthly: 2000, included: 2000, overage: 0.35, unit: 'minuto conectado', unitPlural: 'minutos conectados' },
    commercial: { baseMonthly: 2300, included: 2000, overage: 0.4, unit: 'minuto conectado', unitPlural: 'minutos conectados' },
    complex: { baseMonthly: 2700, included: 1500, overage: 0.45, unit: 'minuto conectado', unitPlural: 'minutos conectados' },
    regulated: { baseMonthly: 3000, included: 1500, overage: 0.55, unit: 'minuto conectado', unitPlural: 'minutos conectados' },
  },
  Automatizacion: {
    standard: { baseMonthly: 1500, included: 2000, overage: 0.6, unit: 'proceso completado', unitPlural: 'procesos completados' },
    commercial: { baseMonthly: 1800, included: 1500, overage: 0.75, unit: 'proceso completado', unitPlural: 'procesos completados' },
    complex: { baseMonthly: 2500, included: 1000, overage: 1.5, unit: 'proceso completado', unitPlural: 'procesos completados' },
    regulated: { baseMonthly: 3200, included: 500, overage: 2.5, unit: 'expediente procesado', unitPlural: 'expedientes procesados' },
  },
  Integracion: {
    standard: { baseMonthly: 1800, included: 5000, overage: 0.2, unit: 'acción de sistema', unitPlural: 'acciones de sistema' },
    commercial: { baseMonthly: 2000, included: 5000, overage: 0.25, unit: 'acción de sistema', unitPlural: 'acciones de sistema' },
    complex: { baseMonthly: 2800, included: 4000, overage: 0.45, unit: 'acción de sistema', unitPlural: 'acciones de sistema' },
    regulated: { baseMonthly: 3500, included: 2500, overage: 0.75, unit: 'acción validada', unitPlural: 'acciones validadas' },
  },
};

export function getAgentPricing(caso) {
  const tier = tierFor(caso);
  const price = TYPE_PRICING[caso.t]?.[tier] || TYPE_PRICING.Chat.standard;
  return {
    ...price,
    tier,
    tierLabel: { standard: 'Estándar', commercial: 'Comercial', complex: 'Complejo', regulated: 'Regulado' }[tier],
    initial: caso.ini,
    billingRule: caso.t === 'Voz'
      ? 'Solo se contabiliza el tiempo de llamadas conectadas.'
      : 'Solo se contabilizan resultados completados correctamente; no se cobran errores ni duplicados.',
  };
}

export function calculateMonthlyUsageCost(pricing, volume = 0) {
  const billableOverage = Math.max(0, Number(volume) - pricing.included);
  return {
    billableOverage,
    overageCost: billableOverage * pricing.overage,
    monthlyTotal: pricing.baseMonthly + (billableOverage * pricing.overage),
  };
}
