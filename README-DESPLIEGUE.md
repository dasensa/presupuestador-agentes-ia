# Despliegue de AgentIA

## Preparacion

1. Ejecuta `npm ci`.
2. Copia `.env.example` a `.env.local`.
3. Configura un dominio verificado en Resend.
4. Completa la identidad juridica en `/privacidad` y `/terminos`.
5. Ejecuta `npm run check`.

## Variables obligatorias

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=AgentIA <propuestas@dominio-verificado.com>
LEADS_TO_EMAIL=info@dominio.com
NEXT_PUBLIC_SITE_URL=https://dominio.com
```

## Vercel

Importa el repositorio, configura las cuatro variables para producción y despliega. El proyecto utiliza Pages Router y no necesita comandos personalizados.

## Comprobacion posterior

- Abre la landing, servicios, una ficha sectorial y el presupuestador.
- Completa una simulacion con un email controlado.
- Comprueba la recepción del resumen por el usuario y la notificación interna.
- Confirma que sitemap y robots utilizan el dominio definitivo.

Las descargas históricas generadas por `ProposalGenerator` son archivos HTML. No deben presentarse como PDF salvo que se incorpore un generador PDF real.
