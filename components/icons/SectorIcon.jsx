const ICONS = {
  Retail: (
    <>
      <path d="M4 14H36L33 34H7L4 14Z" />
      <path d="M14 14Q20 8 26 14" />
      <rect x="15" y="21" width="10" height="7" opacity="0.5" />
      <line x1="15" y1="24.5" x2="25" y2="24.5" opacity="0.5" />
      <line x1="20" y1="21" x2="20" y2="28" opacity="0.5" />
    </>
  ),
  Banca: (
    <>
      <polygon points="20,5 36,13 4,13" />
      <line x1="4" y1="13" x2="36" y2="13" />
      <rect x="8" y="14" width="3" height="16" />
      <rect x="14" y="14" width="3" height="16" />
      <rect x="20" y="14" width="3" height="16" />
      <rect x="26" y="14" width="3" height="16" />
      <rect x="4" y="30" width="32" height="3" />
      <line x1="4" y1="33" x2="36" y2="33" />
    </>
  ),
  Salud: (
    <>
      <rect x="15" y="5" width="10" height="30" />
      <rect x="5" y="15" width="30" height="10" />
      <polyline points="13,20 16,20 18,15 20,25 22,17 24,20 27,20" opacity="0.7" />
    </>
  ),
  Telecom: (
    <>
      <line x1="20" y1="6" x2="20" y2="34" />
      <line x1="10" y1="14" x2="30" y2="14" />
      <line x1="13" y1="22" x2="27" y2="22" />
      <line x1="20" y1="14" x2="10" y2="26" />
      <line x1="20" y1="14" x2="30" y2="26" />
      <line x1="20" y1="22" x2="13" y2="30" />
      <line x1="20" y1="22" x2="27" y2="30" />
      <line x1="10" y1="34" x2="30" y2="34" />
      <path d="M14 10Q20 4 26 10" />
      <path d="M11 7Q20 -1 29 7" opacity="0.35" />
      <circle cx="20" cy="6" r="1.5" fill="currentColor" />
    </>
  ),
  Logistica: (
    <>
      <path d="M26 16L32 16L36 22L36 30L26 30Z" />
      <line x1="26" y1="22" x2="36" y2="22" />
      <rect x="4" y="16" width="22" height="14" />
      <circle cx="10" cy="31" r="3.5" />
      <circle cx="10" cy="31" r="1" fill="currentColor" />
      <circle cx="30" cy="31" r="3.5" />
      <circle cx="30" cy="31" r="1" fill="currentColor" />
      <line x1="4" y1="20" x2="0" y2="20" opacity="0.4" />
      <line x1="4" y1="23" x2="1" y2="23" opacity="0.3" />
      <line x1="4" y1="26" x2="2" y2="26" opacity="0.2" />
    </>
  ),
  Viajes: (
    <>
      <path d="M6 24 L20 10 L28 14 L20 18 L34 22 L28 26 L20 22 L10 28 Z" strokeLinejoin="round" />
      <line x1="20" y1="18" x2="20" y2="22" />
      <line x1="6" y1="30" x2="34" y2="10" strokeDasharray="2 3" opacity="0.3" />
    </>
  ),
  Seguros: (
    <>
      <path d="M20 5 L34 10 L34 22 Q34 32 20 37 Q6 32 6 22 L6 10 Z" strokeLinejoin="round" />
      <path d="M20 10 L30.5 13.8 L30.5 22 Q30.5 29.5 20 33.3 Q9.5 29.5 9.5 22 L9.5 13.8 Z" opacity="0.4" strokeLinejoin="round" />
      <polyline points="14,21 18,25 26,16" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  Energia: (
    <>
      <circle cx="20" cy="20" r="14" />
      <path d="M6 20A14 14 0 0 1 34 20" opacity="0.3" />
      <line x1="20" y1="20" x2="27" y2="11" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" />
      <polyline points="22,8 17,20 21,20 16,32" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  Educacion: (
    <>
      <polygon points="20,8 36,16 20,24 4,16" strokeLinejoin="round" />
      <path d="M10 19Q15 23 20 23Q25 23 30 19L30 28Q25 32 20 32Q15 32 10 28Z" />
      <line x1="36" y1="16" x2="36" y2="26" />
      <path d="M34 26Q36 28 38 26" />
      <line x1="15" y1="28" x2="25" y2="28" opacity="0.5" />
      <line x1="15" y1="30" x2="25" y2="30" opacity="0.3" />
    </>
  ),
  'Tech/SaaS': (
    <>
      <circle cx="20" cy="20" r="4" />
      <circle cx="8" cy="10" r="3" />
      <circle cx="32" cy="10" r="3" />
      <circle cx="8" cy="30" r="3" />
      <circle cx="32" cy="30" r="3" />
      <line x1="17.2" y1="17.2" x2="10.1" y2="12.1" opacity="0.6" />
      <line x1="22.8" y1="17.2" x2="29.9" y2="12.1" opacity="0.6" />
      <line x1="17.2" y1="22.8" x2="10.1" y2="27.9" opacity="0.6" />
      <line x1="22.8" y1="22.8" x2="29.9" y2="27.9" opacity="0.6" />
      <line x1="11" y1="10" x2="29" y2="10" opacity="0.3" />
      <line x1="11" y1="30" x2="29" y2="30" opacity="0.3" />
      <line x1="8" y1="13" x2="8" y2="27" opacity="0.3" />
      <line x1="32" y1="13" x2="32" y2="27" opacity="0.3" />
    </>
  ),
};

export default function SectorIcon({ sector, color = 'currentColor', size = 24, className = '' }) {
  const paths = ICONS[sector] || ICONS['Tech/SaaS'];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
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
