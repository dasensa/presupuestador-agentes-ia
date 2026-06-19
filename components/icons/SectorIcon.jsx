const ICONS = {
  Retail: (
    <>
      <path d="M7 9h10l-1 10H8L7 9Z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
      <path d="M10 13h4" />
    </>
  ),
  Banca: (
    <>
      <path d="M4 10h16" />
      <path d="M6 10v8" />
      <path d="M10 10v8" />
      <path d="M14 10v8" />
      <path d="M18 10v8" />
      <path d="M3 20h18" />
      <path d="M12 4 4 8h16l-8-4Z" />
    </>
  ),
  Salud: (
    <>
      <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4Z" />
      <path d="m6 13 2-2 2 3 2-5 2 4 2-2 2 2" />
    </>
  ),
  Telecom: (
    <>
      <path d="M12 5v15" />
      <path d="M8 20h8" />
      <path d="M9 9h6" />
      <path d="M7 13h10" />
      <path d="m9 20 3-15 3 15" />
      <path d="M6 7a7 7 0 0 0 0 10" />
      <path d="M18 7a7 7 0 0 1 0 10" />
    </>
  ),
  Logistica: (
    <>
      <path d="M3 9h11v7H3V9Z" />
      <path d="M14 12h4l3 3v1h-7v-4Z" />
      <path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M2 6h8" />
      <path d="M1 12h5" />
    </>
  ),
  Viajes: (
    <>
      <path d="M3 12 21 5l-5 16-4-7-6 4 4-6-7-0Z" />
      <path d="M4 20h.01" />
      <path d="M7 18h.01" />
      <path d="M10 16h.01" />
    </>
  ),
  Seguros: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.8 7.7 7 10 4.2-2.3 7-5.5 7-10V6l-7-3Z" />
      <path d="M12 6 8 7.8v3.4c0 2.5 1.4 4.4 4 5.8 2.6-1.4 4-3.3 4-5.8V7.8L12 6Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.4" />
    </>
  ),
  Energia: (
    <>
      <path d="M5 13a7 7 0 1 1 14 0" />
      <path d="M4 13h16v6H4v-6Z" />
      <path d="m12 13 4-5" />
      <path d="M10 21h4" />
      <path d="m9 8 2-5h4l-2 4h3l-5 7 1-6H9Z" />
    </>
  ),
  Educacion: (
    <>
      <path d="M3 9 12 5l9 4-9 4-9-4Z" />
      <path d="M7 11v4c2.6 2 7.4 2 10 0v-4" />
      <path d="M19 10v5" />
      <path d="M19 18v.01" />
    </>
  ),
  'Tech/SaaS': (
    <>
      <path d="M12 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M5 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M19 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M12 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M12 9v6" />
      <path d="m10.2 16-3.4 1" />
      <path d="m13.8 16 3.4 1" />
    </>
  ),
};

export default function SectorIcon({ sector, color = 'currentColor', size = 24, className = '' }) {
  const paths = ICONS[sector] || ICONS['Tech/SaaS'];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths}
    </svg>
  );
}
