# Presupuestador de Agentes IA

Aplicación para analizar casos de uso, calcular sinergias y preparar propuestas de inversión para agentes IA.

## Requisitos
- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

La app quedará disponible en `http://localhost:3000`.

## Build para producción

```bash
npm run build
npm run start
```

## Configuración de email
Crea un archivo `.env.local` con:

```env
RESEND_API_KEY=tu_api_key
```

## Estructura del proyecto
- `pages/` → rutas de la app y API
- `PresupuestadorAgentesConEmail.jsx` → lógica principal y UI
- `README-DESPLIEGUE.md` → guía de despliegue inicial

## Preparado para GitHub
Este repositorio ya incluye:
- `package.json`
- `next.config.mjs`
- `.gitignore`
- documentación básica
