export const SITE = {
  name: 'AgentIA',
  tagline: 'Consultoria de Agentes de Inteligencia Artificial',
  description: 'Disenamos agentes IA especializados por sector con simulaciones orientativas de inversion e impacto.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://presupuestador-agentes-ia.vercel.app',
};

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Agentes y sectores' },
  { href: '/presupuestador', label: 'Presupuestador' },
  { href: '/contacto', label: 'Contacto' },
];

export const STATS = [
  { value: 70, suffix: '+', label: 'Casos de uso' },
  { value: 10, suffix: '', label: 'Sectores' },
  { value: 3, suffix: '', label: 'Escenarios ROI' },
  { value: 70, suffix: '', label: 'Modelos operativos' },
];

export const VALUE_PROPS = [
  {
    icon: 'BarChart3',
    title: 'Analisis Sectorial',
    description: 'Casos de uso validados y adaptados a las necesidades especificas de cada industria.',
  },
  {
    icon: 'GitMerge',
    title: 'Sinergias Inteligentes',
    description: 'Deteccion automatica de sinergias entre agentes para maximizar el retorno de la inversion.',
  },
  {
    icon: 'TrendingUp',
    title: 'ROI verificable',
    description: 'Simulaciones basadas en volumen, coste unitario, alcance, efectividad y adopcion.',
  },
];
