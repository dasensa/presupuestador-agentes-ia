const ICONS = {
  Retail: (
    <>
      <path d="M6.4 8.7h11.2l-1.1 10.7h-9L6.4 8.7Z" fill="currentColor" opacity="0.16" />
      <path d="M6.4 8.7h11.2l-1.1 10.7h-9L6.4 8.7Z" />
      <path d="M9.1 8.7V7.1a2.9 2.9 0 0 1 5.8 0v1.6" />
      <path d="M10.3 12.3h4.8v3.2h-4.8v-3.2Z" fill="currentColor" opacity="0.1" />
      <path d="M10.3 12.3h4.8v3.2h-4.8v-3.2Z" />
      <path d="M11.7 13.9h2" />
    </>
  ),
  Banca: (
    <>
      <path d="M3.4 9.1 12 4.5l8.6 4.6H3.4Z" fill="currentColor" opacity="0.16" />
      <path d="M3.4 9.1 12 4.5l8.6 4.6H3.4Z" />
      <path d="M4.4 11h15.2" />
      <path d="M5.3 19.2h13.4" />
      <path d="M3.5 21h17" />
      <path d="M6.3 11v8.2" />
      <path d="M10.1 11v8.2" />
      <path d="M13.9 11v8.2" />
      <path d="M17.7 11v8.2" />
      <path d="M11.1 7.4h1.8" />
    </>
  ),
  Salud: (
    <>
      <path d="M9.5 4.2h5v5.3h5.3v5h-5.3v5.3h-5v-5.3H4.2v-5h5.3V4.2Z" fill="currentColor" opacity="0.15" />
      <path d="M9.5 4.2h5v5.3h5.3v5h-5.3v5.3h-5v-5.3H4.2v-5h5.3V4.2Z" />
      <path d="M5.9 12.1h2.2l1.5-2.2 2.2 5.3 1.8-6.1 1.8 3h2.7" />
    </>
  ),
  Telecom: (
    <>
      <path d="M12 4.2v15.6" />
      <path d="m8.7 19.8 3.3-15.6 3.3 15.6" />
      <path d="M8.8 9.1h6.4" />
      <path d="M7.6 13.4h8.8" />
      <path d="M9.6 17.2h4.8" />
      <path d="M7.1 5.9a7.7 7.7 0 0 0 0 12.2" opacity="0.7" />
      <path d="M16.9 5.9a7.7 7.7 0 0 1 0 12.2" opacity="0.7" />
      <path d="M5 8.2a10.4 10.4 0 0 0 0 7.6" opacity="0.45" />
      <path d="M19 8.2a10.4 10.4 0 0 1 0 7.6" opacity="0.45" />
      <path d="M11 4.2h2" />
    </>
  ),
  Logistica: (
    <>
      <path d="M3.2 8.8h10.6v7.1H3.2V8.8Z" fill="currentColor" opacity="0.14" />
      <path d="M3.2 8.8h10.6v7.1H3.2V8.8Z" />
      <path d="M13.8 11.1h4.1l2.9 3.2v1.6h-7v-4.8Z" fill="currentColor" opacity="0.14" />
      <path d="M13.8 11.1h4.1l2.9 3.2v1.6h-7v-4.8Z" />
      <path d="M17.2 11.2v3.1h3.4" />
      <path d="M6.4 19.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
      <path d="M17.4 19.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
      <path d="M1.8 6.3h7.7" />
      <path d="M1.1 10.9h4.9" />
      <path d="M2 14h3" />
    </>
  ),
  Viajes: (
    <>
      <path d="M3.4 12.6 20.9 5l-4.7 6.9 3.1 6.7-5.7-4.2-4.5 5.4.8-7-6.5-.2Z" fill="currentColor" opacity="0.14" />
      <path d="M3.4 12.6 20.9 5l-4.7 6.9 3.1 6.7-5.7-4.2-4.5 5.4.8-7-6.5-.2Z" />
      <path d="m9.9 12.8 6.3-.9" />
      <path d="M3.8 19.3h.01" />
      <path d="M6.7 17.7h.01" />
      <path d="M9.6 16h.01" />
      <path d="M12.5 14.4h.01" />
    </>
  ),
  Seguros: (
    <>
      <path d="M12 3.3 5 6.2v5.1c0 4.7 2.7 7.7 7 9.4 4.3-1.7 7-4.7 7-9.4V6.2L12 3.3Z" fill="currentColor" opacity="0.13" />
      <path d="M12 3.3 5 6.2v5.1c0 4.7 2.7 7.7 7 9.4 4.3-1.7 7-4.7 7-9.4V6.2L12 3.3Z" />
      <path d="M12 6.3 8.2 8v3.2c0 2.9 1.3 4.8 3.8 6 2.5-1.2 3.8-3.1 3.8-6V8L12 6.3Z" />
      <path d="m9.2 12 1.8 1.8 3.9-4" />
    </>
  ),
  Energia: (
    <>
      <path d="M5.2 12.7a6.8 6.8 0 1 1 13.6 0" fill="currentColor" opacity="0.1" />
      <path d="M5.2 12.7a6.8 6.8 0 1 1 13.6 0" />
      <path d="M4.1 12.7h15.8v6.6H4.1v-6.6Z" />
      <path d="M8.1 12.7a3.9 3.9 0 0 1 7.8 0" opacity="0.55" />
      <path d="m12 12.7 3.7-4.3" />
      <path d="m9.5 8.3 2.1-5h4l-2.1 4.3h3.1l-5.2 7.1 1-6.4H9.5Z" fill="currentColor" opacity="0.18" />
      <path d="m9.5 8.3 2.1-5h4l-2.1 4.3h3.1l-5.2 7.1 1-6.4H9.5Z" />
      <path d="M10 21h4" />
    </>
  ),
  Educacion: (
    <>
      <path d="M3.2 8.8 12 4.9l8.8 3.9-8.8 4-8.8-4Z" fill="currentColor" opacity="0.14" />
      <path d="M3.2 8.8 12 4.9l8.8 3.9-8.8 4-8.8-4Z" />
      <path d="M6.8 11.2v4.1c2.8 2 7.6 2 10.4 0v-4.1" />
      <path d="M19.1 9.6v5.2" />
      <path d="M19.1 17.4a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" fill="currentColor" opacity="0.16" />
      <path d="M19.1 17.4a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" />
    </>
  ),
  'Tech/SaaS': (
    <>
      <path d="M12 4.2a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" fill="currentColor" opacity="0.15" />
      <path d="M12 4.2a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" />
      <path d="M5.2 14.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" fill="currentColor" opacity="0.15" />
      <path d="M5.2 14.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" />
      <path d="M18.8 14.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" fill="currentColor" opacity="0.15" />
      <path d="M18.8 14.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" />
      <path d="M12 13.6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M12 8.6v5" />
      <path d="m10.2 15.9-3 1" />
      <path d="m13.8 15.9 3 1" />
      <path d="m7 15.9 3.4-7.6" opacity="0.55" />
      <path d="m17 15.9-3.4-7.6" opacity="0.55" />
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
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color }}
      aria-hidden="true"
      focusable="false"
    >
      {paths}
    </svg>
  );
}
