# AgentIA

Plataforma web B2B de consultoria especializada en agentes de inteligencia artificial. Analisis por sector, calculo de sinergias, presupuestacion con ROI y envio de propuestas.

## Requisitos
- Node.js 18+
- npm

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

La app estara disponible en `http://localhost:3000`.

## Verificacion

```bash
npm test
npm run build
```

## Paginas

- `/` — Landing page con propuesta de valor y sectores
- `/servicios` — Detalle de los 10 sectores con 70+ casos de uso
- `/presupuestador` — Calculadora de inversion y ROI con sinergias
- `/contacto` — Formulario de contacto

## Configuracion de email

Crea un archivo `.env.local` con:

```env
RESEND_API_KEY=tu_api_key
RESEND_FROM_EMAIL=AgentIA <propuestas@tu-dominio-verificado.com>
LEADS_TO_EMAIL=info@tu-dominio.com
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

`RESEND_FROM_EMAIL` debe pertenecer a un dominio verificado en Resend. Antes de publicar, completa la identidad juridica en las paginas de privacidad y terminos.

## Stack

- **Framework:** Next.js 15 (Pages Router)
- **Estilos:** Tailwind CSS 3
- **Iconos:** Lucide React
- **Email:** Resend
- **Fuentes:** Inter + Plus Jakarta Sans (via next/font)

## Estructura

```
components/     → Componentes React organizados por dominio
  layout/       → Navbar, Footer, Layout
  ui/           → Button, Card, Modal, Input, Badge...
  landing/      → Hero, Stats, ValueProposition...
  servicios/    → SectorDetail, UseCaseList
  presupuestador/ → SectorSelector, CaseList, SummaryPanel...
  contacto/     → ContactForm, ContactInfo
data/           → Datos de casos de uso y metadata de sectores
lib/            → Logica de calculo y constantes
pages/          → Rutas de la app y API routes
styles/         → Estilos globales Tailwind
```
