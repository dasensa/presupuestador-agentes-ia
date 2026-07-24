const TYPE_DESIGNS = {
  Voz: {
    role: 'Agente conversacional de voz',
    channels: ['Teléfono entrante', 'Llamada saliente', 'Transferencia a operador'],
    capabilities: [
      ['Conversación natural', 'Entiende peticiones, interrupciones y cambios de intención durante la llamada sin obligar al usuario a seguir un menú rígido.'],
      ['Gestión de llamadas', 'Puede iniciar o recibir llamadas, confirmar la identidad del interlocutor y mantener el contexto durante toda la conversación.'],
      ['Acción durante la llamada', 'Consulta información autorizada y ejecuta el siguiente paso del proceso mientras informa al usuario en tiempo real.'],
      ['Escalado con contexto', 'Transfiere a una persona cuando detecta una excepción y entrega el resumen, los datos recogidos y las acciones ya realizadas.'],
    ],
    workflow: ['Recibe o inicia la llamada y explica su propósito.', 'Identifica la intención y valida los datos imprescindibles.', 'Consulta reglas y sistemas para preparar una respuesta o acción.', 'Confirma con el usuario cualquier operación sensible.', 'Resuelve, registra el resultado o transfiere el caso con contexto.'],
  },
  Chat: {
    role: 'Agente conversacional digital',
    channels: ['Web y aplicación', 'WhatsApp o mensajería', 'Chat interno'],
    capabilities: [
      ['Diálogo contextual', 'Mantiene conversaciones de varios turnos, recuerda lo ya indicado y adapta las preguntas a cada respuesta.'],
      ['Respuesta fundamentada', 'Busca en contenidos aprobados y presenta respuestas claras sin inventar información cuando no encuentra evidencia.'],
      ['Recogida estructurada', 'Convierte una conversación en datos utilizables, comprobando campos, documentos y consentimientos antes de continuar.'],
      ['Continuidad omnicanal', 'Conserva el historial y permite que una persona retome la conversación sin pedir al usuario que empiece de nuevo.'],
    ],
    workflow: ['Detecta la intención en el canal de entrada.', 'Formula únicamente las preguntas necesarias para completar el contexto.', 'Consulta conocimiento y datos autorizados.', 'Propone una respuesta o acción y solicita confirmación cuando procede.', 'Registra el resultado, continúa el flujo o escala con un resumen.'],
  },
  Automatizacion: {
    role: 'Agente autónomo de procesos',
    channels: ['Eventos de sistemas', 'Tareas programadas', 'Bandeja de operaciones'],
    capabilities: [
      ['Detección de trabajo', 'Identifica nuevos casos a partir de eventos, colas o reglas programadas y evita procesarlos por duplicado.'],
      ['Orquestación de tareas', 'Coordina consultas, validaciones y actualizaciones entre sistemas siguiendo el orden y las dependencias definidas.'],
      ['Decisiones por reglas', 'Aplica políticas, umbrales y niveles de confianza; reserva las excepciones para revisión humana.'],
      ['Recuperación y trazabilidad', 'Registra cada paso, reintenta fallos seguros y crea una incidencia cuando no puede completar el proceso.'],
    ],
    workflow: ['Detecta un evento o recoge un caso de la cola.', 'Completa y normaliza la información necesaria.', 'Aplica reglas y determina el siguiente paso permitido.', 'Ejecuta las acciones y verifica su resultado.', 'Cierra el caso o lo deriva con evidencias y motivo.'],
  },
  Integracion: {
    role: 'Agente conectado a sistemas',
    channels: ['API y webhooks', 'Chat o interfaz interna', 'Sistemas corporativos'],
    capabilities: [
      ['Consulta unificada', 'Recupera información de varias aplicaciones y la presenta en una respuesta coherente, respetando permisos y contexto.'],
      ['Ejecución segura', 'Traduce una petición autorizada en operaciones de sistema con validación previa, confirmación y control de errores.'],
      ['Sincronización de datos', 'Actualiza los registros afectados y evita divergencias mediante identificadores, control de versiones e idempotencia.'],
      ['Capa de gobierno', 'Centraliza autenticación, permisos, auditoría y límites para que la IA no opere directamente sin controles.'],
    ],
    workflow: ['Recibe una petición autenticada o un evento.', 'Comprueba identidad, permisos y datos obligatorios.', 'Consulta los sistemas que contienen la fuente de verdad.', 'Ejecuta la operación autorizada y valida la respuesta.', 'Sincroniza el resultado y genera un registro auditable.'],
  },
};

const SECTOR_DESIGNS = {
  Retail: { systems: ['Ecommerce/PIM', 'CRM y loyalty', 'ERP e inventario', 'Pagos y logística'], guardrail: 'No modifica precios, reembolsos o inventario fuera de las políticas comerciales aprobadas.' },
  'Actividades Deportivas': { systems: ['CRM deportivo', 'Sistema de reservas', 'Plataforma de pagos', 'App del socio'], guardrail: 'No modifica cuotas, reservas ni inscripciones fuera de las políticas del club; los casos de impago se derivan al equipo de administración.' },
  Salud: { systems: ['Historia clínica', 'Agenda médica', 'Portal del paciente', 'Mensajería sanitaria'], guardrail: 'No diagnostica ni sustituye el criterio clínico; deriva síntomas de riesgo y restringe el acceso a datos sanitarios.' },
  Telecom: { systems: ['CRM y facturación', 'OSS/BSS', 'Diagnóstico de red', 'Gestor de incidencias'], guardrail: 'Solo aplica cambios de servicio y diagnósticos dentro de permisos, políticas de provisión y ventanas autorizadas.' },
  Logistica: { systems: ['TMS', 'Gestión de flota', 'Tracking y mapas', 'CRM y reclamaciones'], guardrail: 'No confirma rutas, compensaciones o entregas cuando faltan evidencias operativas o existe una excepción crítica.' },
  Viajes: { systems: ['PMS/CRS', 'Motor de reservas', 'CRM de huéspedes', 'Pagos y servicios'], guardrail: 'Comprueba disponibilidad y condiciones en la fuente de verdad antes de prometer reservas, cambios o compensaciones.' },
  Seguros: { systems: ['Gestión de pólizas', 'Siniestros', 'CRM', 'Gestión documental'], guardrail: 'No decide coberturas ni indemnizaciones fuera de reglas; los casos ambiguos pasan a tramitación especializada.' },
  Energia: { systems: ['CIS/CRM', 'Facturación', 'Medición y contadores', 'Gestión de órdenes'], guardrail: 'Valida titularidad y normativa antes de cambios contractuales, cortes, cobros o acceso a información de consumo.' },
  Educacion: { systems: ['CRM de admisiones', 'LMS', 'Gestión académica', 'Pagos y documentación'], guardrail: 'No altera expedientes, calificaciones o concesiones sin autorización y protege especialmente los datos de menores.' },
  'Tech/SaaS': { systems: ['CRM', 'Help desk', 'Base de conocimiento', 'Analítica de producto'], guardrail: 'No accede a entornos o datos de clientes fuera del alcance del ticket y evita ejecutar cambios irreversibles sin aprobación.' },
};

const METRICS_BY_AREA = {
  Conversion: ['Tasa de conversión', 'Ingresos asistidos', 'Tiempo hasta la decisión', 'Abandono del proceso'],
  Retencion: ['Tasa de retención', 'Resolución en primer contacto', 'CSAT', 'Motivos de abandono'],
  Soporte: ['Resolución automática', 'Tiempo medio de resolución', 'Escalados evitados', 'CSAT'],
  Tecnologia: ['Operaciones completadas', 'Errores de integración', 'Latencia', 'Disponibilidad'],
  Operacion: ['Tiempo por operación', 'Casos automatizados', 'Errores evitados', 'Coste por caso'],
  Cobranza: ['Importe recuperado', 'Promesas de pago', 'Contactabilidad', 'Coste de recobro'],
  Riesgo: ['Alertas relevantes', 'Falsos positivos', 'Tiempo de detección', 'Casos prevenidos'],
  Adquisicion: ['Altas completadas', 'Conversión del proceso', 'Tiempo de alta', 'Documentación válida'],
  Servicio: ['Autoservicio', 'Tiempo de respuesta', 'Resolución inicial', 'CSAT'],
};

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function metricsFor(caso) {
  const direct = METRICS_BY_AREA[caso.prob];
  if (direct) return direct;
  const area = normalize(caso.prob);
  if (/venta|ingreso|captacion|reserva/.test(area)) return METRICS_BY_AREA.Conversion;
  if (/soporte|gestion|control|eficiencia|proces/.test(area)) return METRICS_BY_AREA.Operacion;
  if (/retencion|adherencia|seguimiento/.test(area)) return METRICS_BY_AREA.Retencion;
  return ['Casos resueltos', 'Tiempo de ciclo', 'Tasa de escalado', 'Satisfacción del usuario'];
}

export function getAgentDesign(caso) {
  const type = TYPE_DESIGNS[caso.t] || TYPE_DESIGNS.Chat;
  const sector = SECTOR_DESIGNS[caso.s];
  const objective = caso.desc.replace(/\.$/, '');

  return {
    role: type.role,
    mission: `${objective}. El agente combina comprensión del contexto, reglas de negocio y acciones verificables para completar el proceso de principio a fin.`,
    capabilities: [
      {
        title: `Ejecuta ${caso.c.toLowerCase()}`,
        description: `${objective}. Comprueba que dispone de la información necesaria, aplica las reglas configuradas y verifica que el resultado se haya registrado correctamente.`,
      },
      {
        title: `Especialización en ${caso.prob.toLowerCase()}`,
        description: `Reconoce las intenciones, datos, excepciones y criterios habituales de ${caso.prob.toLowerCase()} en ${caso.s}; no trata el proceso como una consulta genérica.`,
      },
      ...type.capabilities.map(([title, description]) => ({ title, description })),
      {
        title: 'Medición y mejora continua',
        description: `Etiqueta motivos, resultados y puntos de fricción para medir ${metricsFor(caso).slice(0, 2).join(' y ').toLowerCase()} y mejorar el flujo con datos reales.`,
      },
    ],
    workflow: type.workflow.map((step, index) => ({ step: index + 1, text: step })),
    integrations: sector.systems,
    channels: type.channels,
    metrics: metricsFor(caso),
    controls: [
      sector.guardrail,
      'Solicita confirmación antes de ejecutar acciones con impacto económico, contractual o sobre datos personales.',
      'Aplica control de acceso por rol, minimización de datos, cifrado y registro de las operaciones.',
      'Escala por baja confianza, petición expresa del usuario, excepción no contemplada o riesgo detectado.',
    ],
    humanRole: `El equipo de ${caso.prob.toLowerCase()} define políticas y excepciones, revisa los casos escalados y utiliza los registros del agente para mejorar el servicio.`,
    example: [
      { actor: 'Usuario o sistema', text: `Inicia una solicitud relacionada con ${caso.c.toLowerCase()}.` },
      { actor: 'Agente IA', text: 'Identifica la intención, recupera el contexto autorizado y solicita únicamente los datos que faltan.' },
      { actor: 'Agente IA', text: `Aplica las reglas de ${caso.s}, propone o ejecuta la acción permitida y comprueba el resultado.` },
      { actor: 'Resultado', text: 'Confirma la resolución y registra un resumen; si existe una excepción, deriva el caso con toda la evidencia.' },
    ],
    implementation: [
      { phase: 'Descubrimiento', detail: 'Procesos, fuentes de datos, reglas, riesgos y métricas de referencia.', duration: '1–2 semanas' },
      { phase: 'Piloto', detail: 'Diseño conversacional u operativo, integraciones mínimas y pruebas con casos reales.', duration: '3–6 semanas' },
      { phase: 'Producción', detail: 'Seguridad, monitorización, formación del equipo y despliegue gradual.', duration: '2–4 semanas' },
      { phase: 'Optimización', detail: 'Revisión de resultados, nuevas intenciones y ampliación controlada del alcance.', duration: 'Continua' },
    ],
  };
}
