# Presupuestador de Agentes IA - Guía de Despliegue

## 📋 Descripción

Herramienta interactiva para:
- ✅ Seleccionar 68 casos realistas por sector
- ✅ Detectar sinergias automáticamente
- ✅ Calcular ROI bundled
- ✅ **Generar y enviar propuestas por email**
- ✅ Descargar propuestas en PDF

---

## 🚀 Despliegue en Vercel (Recomendado)

### 1. Preparar el proyecto

```bash
# Crear proyecto Next.js (ya tiene API routes built-in)
npx create-next-app@latest presupuestador-agentes-ia
cd presupuestador-agentes-ia

# Instalar dependencias
npm install resend

# O si prefieres nodemailer
npm install nodemailer
```

### 2. Estructura de carpetas

```
presupuestador-agentes-ia/
├── pages/
│   ├── api/
│   │   └── enviar-propuesta.js    (copia el archivo api-enviar-propuesta.js aquí)
│   └── index.js                    (copia el React component aquí)
├── public/
├── .env.local                      (variables de entorno)
├── package.json
└── vercel.json
```

### 3. Configurar variables de entorno

Crear `.env.local`:

```env
# Para Resend (RECOMENDADO - gratis)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# O para Nodemailer (Gmail)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password
```

**Obtener API key de Resend:**
1. Ir a https://resend.com
2. Sign up gratis
3. Crear API key
4. Agregar tu dominio (o usar dominio Resend por defecto)

### 4. Copiar archivos

**pages/api/enviar-propuesta.js:**
```bash
cp api-enviar-propuesta.js presupuestador-agentes-ia/pages/api/
```

**pages/index.js o pages/presupuestador.js:**
```bash
cp PresupuestadorAgentesConEmail.jsx presupuestador-agentes-ia/pages/
```

### 5. Desplegar en Vercel

```bash
npm install -g vercel
vercel login
vercel deploy

# Seguir prompts:
# - Crear proyecto en Vercel
# - Configurar variables de entorno en Vercel dashboard
# - Acceder a https://presupuestador-agentes-ia.vercel.app
```

---

## 🏠 Despliegue Local (Desarrollo)

### 1. Clonar y setup

```bash
git clone <repo>
cd presupuestador-agentes-ia
npm install
npm install resend
```

### 2. Crear `.env.local`

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Correr servidor

```bash
npm run dev
```

Acceder a `http://localhost:3000`

---

## 📧 Configuración de Email

### Opción A: Resend (RECOMENDADO)

**Ventajas:**
- Gratis hasta 100 emails/día
- Sin configuración SMTP compleja
- Dominio incluido (resend.com)
- Fácil de usar

**Setup:**
1. https://resend.com → Sign up
2. Copiar API key
3. Agregar variable `RESEND_API_KEY` en Vercel

### Opción B: Gmail + Nodemailer

**Setup:**
1. Ir a https://myaccount.google.com/apppasswords
2. Generar "App Password"
3. Copiar en `.env.local`:
   ```env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
   ```

**Código alternativo (api/enviar-propuesta.js):**
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: `Propuesta Agentes IA - ${sector}`,
  html: htmlContent
});
```

### Opción C: SendGrid

```bash
npm install @sendgrid/mail
```

```javascript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: email,
  from: 'propuestas@tudominio.com',
  subject: `Propuesta Agentes IA - ${sector}`,
  html: htmlContent
});
```

---

## 🔧 Personalización

### Cambiar dominio de origen del email

En `api/enviar-propuesta.js`, línea:
```javascript
from: 'propuestas@tudominio.com'  // Cambia aquí
```

Con Resend, primero agregar tu dominio en https://resend.com/domains

### Personalizar template de email

Editar la variable `html` en `api/enviar-propuesta.js` para:
- Agregar logo de tu empresa
- Cambiar colores (#1F3864, #0066cc, #28a745)
- Añadir campos adicionales (teléfono, empresa, etc.)

### Agregar campos al formulario

En el React component, añadir inputs adicionales:
```javascript
const [empresa, setEmpresa] = useState("");
const [telefono, setTelefono] = useState("");
```

---

## 🧪 Testing

### Test local

```bash
# Instalar httpie
brew install httpie  # macOS
# o sudo apt install httpie  # Linux

# Test endpoint
http POST http://localhost:3000/api/enviar-propuesta \
  email=test@example.com \
  nombre="Juan Pérez" \
  sector="Retail" \
  casos:=3 \
  roi:=250 \
  inversion:=65000 \
  beneficio:=162500
```

### Test en Vercel

Después de desplegar, ir a https://presupuestador-agentes-ia.vercel.app y:
1. Seleccionar sector
2. Seleccionar casos
3. Click "Enviar por Email"
4. Completar formulario con email real
5. Verificar inbox

---

## 🐛 Troubleshooting

### Error: "RESEND_API_KEY not found"

✅ Solución: Agregar variable en `.env.local` y reiniciar servidor local, o en Vercel Settings → Environment Variables

### Error: "Email rejected"

✅ Solución: Verificar que el dominio está configurado en Resend o que la contraseña de Gmail es correcta

### Error: "Method not allowed"

✅ Solución: Verificar que el request es POST (no GET)

### PDF no se descarga

✅ Solución: Actualizar navegador, asegurar que no hay bloqueador de popups

---

## 📊 Monitoreo

### Logs en Vercel
```bash
vercel logs
```

### Monitorear emails enviados
- **Resend**: https://resend.com/emails
- **Gmail**: Carpeta "Correos enviados"
- **SendGrid**: Dashboard de SendGrid

---

## 💡 Mejoras Futuras

- [ ] Descarga de propuesta en Word/DOCX
- [ ] Integración con CRM (Salesforce, HubSpot)
- [ ] Tracking de email opens/clicks
- [ ] Historial de propuestas generadas
- [ ] Dashboard de analytics
- [ ] Soporte para múltiples idiomas

---

## 📄 Licencia

Propietario. Uso interno únicamente.

---

## ❓ Soporte

Para preguntas o problemas:
1. Revisar logs en Vercel
2. Verificar variables de entorno
3. Contactar a tu administrador
