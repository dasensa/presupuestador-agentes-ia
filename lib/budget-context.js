export const DEFAULT_CONTEXT = {
  empleados: '21-100',
  volumen: 'medio',
  integracion: 'media',
  urgencia: 'normal',
};

export const CONTEXT_MULTIPLIERS = {
  empleados: { '1-20': 0.85, '21-100': 1, '101-500': 1.25, '500+': 1.55 },
  volumen: { bajo: 0.85, medio: 1, alto: 1.28, enterprise: 1.6 },
  integracion: { baja: 0.9, media: 1, alta: 1.22, core: 1.45 },
  urgencia: { flexible: 0.95, normal: 1, rapida: 1.14 },
};

export function normalizeContext(input = {}) {
  return Object.fromEntries(Object.entries(DEFAULT_CONTEXT).map(([key, fallback]) => [
    key,
    Object.hasOwn(CONTEXT_MULTIPLIERS[key], input[key]) ? input[key] : fallback,
  ]));
}

export function adjustBudget(resumen, input) {
  const context = normalizeContext(input);
  const costFactor = CONTEXT_MULTIPLIERS.empleados[context.empleados]
    * CONTEXT_MULTIPLIERS.integracion[context.integracion]
    * CONTEXT_MULTIPLIERS.urgencia[context.urgencia];
  const benefitFactor = CONTEXT_MULTIPLIERS.empleados[context.empleados]
    * CONTEXT_MULTIPLIERS.volumen[context.volumen];
  const inversion = resumen.invBundled * costFactor;
  const retorno = resumen.beneficioBundled * benefitFactor;
  return {
    inversion,
    retorno,
    ahorro: retorno - inversion,
    roi: inversion > 0 ? Math.round(((retorno - inversion) / inversion) * 100) : 0,
    meses: context.urgencia === 'rapida' ? '6-8 semanas' : context.integracion === 'core' ? '12-16 semanas' : '8-12 semanas',
  };
}
