const CHANNELS = {
  web: { label: 'Chat web', template: 'chat-web-v1', review: false },
  whatsapp: { label: 'WhatsApp', template: 'messaging-v1', review: true },
  voz: { label: 'Voz', template: 'voice-v1', review: true },
  email: { label: 'Correo electrónico', template: 'email-v1', review: true },
};

const PLANS = {
  essential: {
    label: 'Essential',
    capabilities: ['Base de conocimiento', 'Escalado a persona', 'Analítica básica', 'Límites de consumo'],
  },
  advanced: {
    label: 'Advanced',
    capabilities: ['Base de conocimiento', 'Acciones controladas', 'Analítica avanzada', 'Evaluaciones continuas', 'Entornos y versiones'],
  },
};

const VOLUME_LIMITS = {
  bajo: 1_000,
  medio: 5_000,
  alto: 20_000,
};

function clean(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function slug(value) {
  return clean(value, 80)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function validateAgentRequest(input = {}) {
  const request = {
    name: clean(input.name, 80),
    sector: clean(input.sector, 80),
    objective: clean(input.objective, 600),
    process: clean(input.process, 120),
    channel: clean(input.channel, 30),
    volume: clean(input.volume, 20),
    autonomy: clean(input.autonomy, 30),
    plan: clean(input.plan, 30),
    knowledge: clean(input.knowledge, 300),
    systems: clean(input.systems, 300),
    sensitiveData: Boolean(input.sensitiveData),
  };
  const errors = [];
  if (!request.name) errors.push('Indica un nombre para el agente.');
  if (!request.sector) errors.push('Selecciona el sector.');
  if (request.objective.length < 20) errors.push('Describe el objetivo con al menos 20 caracteres.');
  if (!request.process) errors.push('Indica el proceso que debe atender.');
  if (!CHANNELS[request.channel]) errors.push('Selecciona un canal válido.');
  if (!VOLUME_LIMITS[request.volume]) errors.push('Selecciona un volumen válido.');
  if (!['informar', 'proponer', 'ejecutar'].includes(request.autonomy)) errors.push('Selecciona un nivel de autonomía válido.');
  if (!PLANS[request.plan]) errors.push('Selecciona un plan válido.');
  return { request, errors };
}

export function buildAgentBlueprint(input = {}) {
  const { request, errors } = validateAgentRequest(input);
  if (errors.length) return { ok: false, errors };

  const channel = CHANNELS[request.channel];
  const plan = PLANS[request.plan];
  const requiresHumanReview = (
    request.sensitiveData
    || request.autonomy === 'ejecutar'
    || channel.review
    || Boolean(request.systems)
  );
  const controls = [
    'Responder únicamente con información aprobada y reconocer cuando no dispone de evidencia.',
    'Escalar por baja confianza, petición expresa, excepción o riesgo detectado.',
    'Registrar versión, fuentes consultadas, consumo, resultado y motivo de escalado.',
  ];
  if (request.autonomy === 'ejecutar') {
    controls.push('Solicitar confirmación antes de cualquier acción con impacto económico, contractual o sobre datos.');
  }
  if (request.sensitiveData) {
    controls.push('Aplicar minimización, control de acceso, retención limitada y revisión de privacidad.');
  }
  if (request.systems) {
    controls.push('Usar conectores aprobados con permisos mínimos; las integraciones de terceros requieren validación del cliente.');
  }

  return {
    ok: true,
    blueprint: {
      id: `draft-${slug(request.name)}-${Date.now().toString(36)}`,
      status: requiresHumanReview ? 'Revisión requerida' : 'Listo para sandbox',
      name: request.name,
      role: `Agente de ${request.process.toLowerCase()} para ${request.sector}`,
      objective: request.objective,
      template: channel.template,
      channel: channel.label,
      plan: plan.label,
      includedInteractions: VOLUME_LIMITS[request.volume],
      autonomy: request.autonomy,
      capabilities: plan.capabilities,
      knowledge: request.knowledge || 'Pendiente de cargar fuentes aprobadas',
      externalSystems: request.systems || 'Sin sistemas externos en la primera versión',
      controls,
      tests: [
        '20 consultas frecuentes con respuesta fundamentada.',
        '10 preguntas fuera de alcance y verificación de no invención.',
        '5 casos de escalado a persona con resumen completo.',
        'Prueba de instrucciones maliciosas y extracción de información.',
        'Comprobación de coste máximo y latencia por interacción.',
      ],
      deployment: {
        next: requiresHumanReview ? 'Revisión humana y autorización de conectores' : 'Generar sandbox aislado',
        productionGate: 'Superar el 90% de las pruebas obligatorias y obtener aprobación del cliente',
      },
    },
  };
}

