export const CASOS_DATA = [
  // RETAIL (8)
  {id:1,s:"Retail",c:"Chatbot recomendador",t:"Chat",ini:22000,rec:2600,prob:"Conversion"},
  {id:2,s:"Retail",c:"Chat tallas/fit",t:"Chat",ini:18000,rec:1900,prob:"Conversion"},
  {id:3,s:"Retail",c:"Recuperacion carritos",t:"Voz",ini:20000,rec:2400,prob:"Conversion"},
  {id:4,s:"Retail",c:"Chat postventa",t:"Chat",ini:14000,rec:1600,prob:"Retencion"},
  {id:5,s:"Retail",c:"Chat loyalty",t:"Chat",ini:16000,rec:1800,prob:"Retencion"},
  {id:6,s:"Retail",c:"Auto. devoluciones",t:"Automatizacion",ini:15000,rec:1500,prob:"Operacion"},
  {id:7,s:"Retail",c:"Auto. reabastecimiento",t:"Automatizacion",ini:30000,rec:2000,prob:"Operacion"},
  {id:8,s:"Retail",c:"Omnicanal CRM",t:"Integracion",ini:28000,rec:2500,prob:"Tecnologia"},

  // BANCA (9)
  {id:9,s:"Banca",c:"Consultas saldo voz",t:"Voz",ini:35000,rec:4000,prob:"Operacion"},
  {id:10,s:"Banca",c:"Bloqueo tarjetas",t:"Voz",ini:22000,rec:2500,prob:"Operacion"},
  {id:11,s:"Banca",c:"Cobro impagos",t:"Voz",ini:30000,rec:3000,prob:"Cobranza"},
  {id:12,s:"Banca",c:"Onboarding KYC",t:"Chat",ini:40000,rec:3500,prob:"Adquisicion"},
  {id:13,s:"Banca",c:"Asesor financiero",t:"Chat",ini:25000,rec:2800,prob:"Adquisicion"},
  {id:14,s:"Banca",c:"Prestamos preaprobados",t:"Chat",ini:30000,rec:3200,prob:"Adquisicion"},
  {id:15,s:"Banca",c:"Fraude deteccion",t:"Automatizacion",ini:60000,rec:5000,prob:"Riesgo"},
  {id:16,s:"Banca",c:"Antifraude multicanal",t:"Automatizacion",ini:55000,rec:4500,prob:"Riesgo"},
  {id:17,s:"Banca",c:"Chat-core",t:"Integracion",ini:50000,rec:4000,prob:"Tecnologia"},

  // SALUD (7)
  {id:18,s:"Salud",c:"Citas por voz",t:"Voz",ini:25000,rec:2800,prob:"Acceso"},
  {id:19,s:"Salud",c:"Confirmacion citas",t:"Voz",ini:20000,rec:2200,prob:"Acceso"},
  {id:20,s:"Salud",c:"Seguimiento postop",t:"Voz",ini:26000,rec:2600,prob:"Seguimiento"},
  {id:21,s:"Salud",c:"Triaje sintomas",t:"Chat",ini:35000,rec:3000,prob:"Acceso"},
  {id:22,s:"Salud",c:"Chat resultados",t:"Chat",ini:16000,rec:1600,prob:"Seguimiento"},
  {id:23,s:"Salud",c:"Recordatorios medicacion",t:"Automatizacion",ini:18000,rec:1500,prob:"Adherencia"},
  {id:24,s:"Salud",c:"Chat-historia clinica",t:"Integracion",ini:45000,rec:3500,prob:"Tecnologia"},

  // TELECOM (8)
  {id:25,s:"Telecom",c:"Soporte N1",t:"Voz",ini:30000,rec:3500,prob:"Soporte"},
  {id:26,s:"Telecom",c:"Anti-churn",t:"Voz",ini:32000,rec:3500,prob:"Retencion"},
  {id:27,s:"Telecom",c:"Upselling planes",t:"Voz",ini:26000,rec:2800,prob:"Ingresos"},
  {id:28,s:"Telecom",c:"Portabilidad/altas",t:"Chat",ini:25000,rec:2800,prob:"Conversion"},
  {id:29,s:"Telecom",c:"Consumo datos",t:"Chat",ini:16000,rec:1700,prob:"Servicio"},
  {id:30,s:"Telecom",c:"Incidencias red",t:"Chat",ini:18000,rec:1900,prob:"Servicio"},
  {id:31,s:"Telecom",c:"Diagnostico averias",t:"Automatizacion",ini:45000,rec:3000,prob:"Soporte"},
  {id:32,s:"Telecom",c:"Chat-OSS/BSS",t:"Integracion",ini:40000,rec:3200,prob:"Tecnologia"},

  // LOGISTICA (7)
  {id:33,s:"Logistica",c:"Tracking voz",t:"Voz",ini:18000,rec:2000,prob:"Servicio"},
  {id:34,s:"Logistica",c:"Reprogramacion entregas",t:"Chat",ini:16000,rec:1800,prob:"Servicio"},
  {id:35,s:"Logistica",c:"Asignacion rutas",t:"Automatizacion",ini:45000,rec:2500,prob:"Eficiencia"},
  {id:36,s:"Logistica",c:"Incidencias en ruta",t:"Automatizacion",ini:35000,rec:2400,prob:"Control"},
  {id:37,s:"Logistica",c:"Coordinacion conductores",t:"Voz",ini:22000,rec:2400,prob:"Coordinacion"},
  {id:38,s:"Logistica",c:"Reclamaciones",t:"Chat",ini:15000,rec:1600,prob:"Gestion"},
  {id:39,s:"Logistica",c:"Chat-TMS",t:"Integracion",ini:30000,rec:2600,prob:"Tecnologia"},

  // VIAJES (6)
  {id:40,s:"Viajes",c:"Reservas hotel",t:"Voz",ini:22000,rec:2400,prob:"Reserva"},
  {id:41,s:"Viajes",c:"Check-in/out",t:"Chat",ini:20000,rec:2000,prob:"Operacion"},
  {id:42,s:"Viajes",c:"Upselling servicios",t:"Voz",ini:20000,rec:2200,prob:"Ingresos"},
  {id:43,s:"Viajes",c:"Conserjeria 24/7",t:"Chat",ini:16000,rec:1700,prob:"Experiencia"},
  {id:44,s:"Viajes",c:"Overbooking",t:"Automatizacion",ini:28000,rec:1800,prob:"Gestion"},
  {id:45,s:"Viajes",c:"Chat-PMS",t:"Integracion",ini:26000,rec:2200,prob:"Tecnologia"},

  // SEGUROS (7)
  {id:46,s:"Seguros",c:"FNOL voz",t:"Voz",ini:30000,rec:3000,prob:"FNOL"},
  {id:47,s:"Seguros",c:"Cotizacion polizas",t:"Chat",ini:28000,rec:3000,prob:"Adquisicion"},
  {id:48,s:"Seguros",c:"Comparador coberturas",t:"Chat",ini:18000,rec:1900,prob:"Educacion"},
  {id:49,s:"Seguros",c:"Renovaciones",t:"Voz",ini:26000,rec:2800,prob:"Retencion"},
  {id:50,s:"Seguros",c:"Peritaje fotografico",t:"Automatizacion",ini:55000,rec:3500,prob:"Siniestros"},
  {id:51,s:"Seguros",c:"Validacion documental",t:"Automatizacion",ini:30000,rec:2000,prob:"Procesos"},
  {id:52,s:"Seguros",c:"Chat-polizas",t:"Integracion",ini:35000,rec:2800,prob:"Tecnologia"},

  // ENERGIA (6)
  {id:53,s:"Energia",c:"Lectura contador",t:"Voz",ini:20000,rec:2400,prob:"Operacion"},
  {id:54,s:"Energia",c:"Alta/baja suministro",t:"Chat",ini:24000,rec:2600,prob:"Conversion"},
  {id:55,s:"Energia",c:"Eficiencia energetica",t:"Chat",ini:20000,rec:2000,prob:"Venta cruzada"},
  {id:56,s:"Energia",c:"Gestion cortes",t:"Automatizacion",ini:40000,rec:2800,prob:"Gestion"},
  {id:57,s:"Energia",c:"Gestion impagos",t:"Automatizacion",ini:26000,rec:2000,prob:"Cobranza"},
  {id:58,s:"Energia",c:"Chat-CIS",t:"Integracion",ini:30000,rec:2400,prob:"Tecnologia"},

  // EDUCACION (6)
  {id:59,s:"Educacion",c:"Admisiones",t:"Voz",ini:20000,rec:2200,prob:"Captacion"},
  {id:60,s:"Educacion",c:"Orientacion vocacional",t:"Voz",ini:20000,rec:2200,prob:"Orientacion"},
  {id:61,s:"Educacion",c:"Tutor academico 24/7",t:"Chat",ini:30000,rec:2800,prob:"Retencion"},
  {id:62,s:"Educacion",c:"Gestion becas",t:"Chat",ini:16000,rec:1600,prob:"Acceso"},
  {id:63,s:"Educacion",c:"Matriculacion",t:"Automatizacion",ini:26000,rec:1800,prob:"Operacion"},
  {id:64,s:"Educacion",c:"Chat-LMS",t:"Integracion",ini:24000,rec:2000,prob:"Tecnologia"},

  // TECH/SAAS (6)
  {id:65,s:"Tech/SaaS",c:"Soporte premium",t:"Voz",ini:30000,rec:3200,prob:"Soporte"},
  {id:66,s:"Tech/SaaS",c:"Cualificacion leads",t:"Voz",ini:26000,rec:2800,prob:"Ventas"},
  {id:67,s:"Tech/SaaS",c:"Onboarding producto",t:"Chat",ini:24000,rec:2600,prob:"Activation"},
  {id:68,s:"Tech/SaaS",c:"Knowledge base",t:"Chat",ini:20000,rec:2000,prob:"Soporte"},
  {id:69,s:"Tech/SaaS",c:"Gestion tickets",t:"Automatizacion",ini:26000,rec:2200,prob:"Soporte"},
  {id:70,s:"Tech/SaaS",c:"Chat-CRM",t:"Integracion",ini:26000,rec:2200,prob:"Tecnologia"},
];

export const SECTORES_META = {
  Retail: {
    icon: 'ShoppingBag',
    color: 'blue',
    description: 'Aumenta la conversion y retencion con agentes inteligentes en tu ecommerce y tiendas.',
    longDescription: 'Desde chatbots recomendadores hasta automatizacion de devoluciones, los agentes IA transforman la experiencia de compra y optimizan operaciones en retail.',
  },
  Banca: {
    icon: 'Landmark',
    color: 'emerald',
    description: 'Automatiza operaciones bancarias y mejora la experiencia del cliente financiero.',
    longDescription: 'Onboarding KYC, deteccion de fraude, cobro de impagos y asesoria financiera automatizada para una banca mas eficiente y segura.',
  },
  Salud: {
    icon: 'HeartPulse',
    color: 'red',
    description: 'Mejora el acceso a servicios sanitarios y el seguimiento de pacientes.',
    longDescription: 'Gestion de citas por voz, triaje inteligente de sintomas, seguimiento postoperatorio y recordatorios de medicacion para una atencion sanitaria mas accesible.',
  },
  Telecom: {
    icon: 'Wifi',
    color: 'violet',
    description: 'Reduce churn, mejora soporte y automatiza diagnosticos de red.',
    longDescription: 'Soporte tecnico nivel 1, retencion anti-churn, upselling de planes y diagnostico automatizado de averias para operadores de telecomunicaciones.',
  },
  Logistica: {
    icon: 'Truck',
    color: 'orange',
    description: 'Optimiza rutas, coordina entregas y gestiona incidencias en tiempo real.',
    longDescription: 'Tracking por voz, asignacion inteligente de rutas, coordinacion de conductores y gestion automatizada de reclamaciones para cadenas logisticas.',
  },
  Viajes: {
    icon: 'Plane',
    color: 'cyan',
    description: 'Transforma la experiencia del huesped con conserjeria IA 24/7.',
    longDescription: 'Reservas automatizadas, check-in/out digital, upselling de servicios y gestion de overbooking para hoteles y empresas turisticas.',
  },
  Seguros: {
    icon: 'Shield',
    color: 'teal',
    description: 'Agiliza siniestros, cotizaciones y renovaciones con IA.',
    longDescription: 'FNOL por voz, cotizacion automatizada de polizas, peritaje fotografico con IA y validacion documental inteligente para aseguradoras.',
  },
  Energia: {
    icon: 'Zap',
    color: 'yellow',
    description: 'Digitaliza la gestion de suministros y mejora la atencion al cliente.',
    longDescription: 'Lectura automatizada de contadores, altas/bajas de suministro, asesoria en eficiencia energetica y gestion inteligente de impagos.',
  },
  Educacion: {
    icon: 'GraduationCap',
    color: 'pink',
    description: 'Mejora captacion, retencion y experiencia academica con IA.',
    longDescription: 'Admisiones automatizadas, orientacion vocacional, tutoria academica 24/7 y gestion de becas para instituciones educativas.',
  },
  'Tech/SaaS': {
    icon: 'Code',
    color: 'indigo',
    description: 'Escala soporte, cualifica leads y mejora onboarding de producto.',
    longDescription: 'Soporte premium automatizado, cualificacion inteligente de leads, onboarding guiado de producto y knowledge base con IA para empresas tech.',
  },
};

export const getSectores = () => [...new Set(CASOS_DATA.map(c => c.s))];

export const getCasosBySector = (sector) => CASOS_DATA.filter(c => c.s === sector);

export const buildCasosMap = () => Object.fromEntries(CASOS_DATA.map(c => [c.id, c]));
