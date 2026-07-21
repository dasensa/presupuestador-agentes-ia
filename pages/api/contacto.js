import { Resend } from 'resend';
import { escapeHtml, mailConfig, methodNotAllowed, rejectAbuse, text, validEmail } from '../../lib/api-security';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res);
  }
  if (rejectAbuse(req, res)) return;

  const nombre = text(req.body?.nombre, 100);
  const email = validEmail(req.body?.email);
  const empresa = text(req.body?.empresa, 150);
  const sector = text(req.body?.sector, 80);
  const mensaje = text(req.body?.mensaje, 3_000);

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Nombre, email y mensaje son obligatorios' });
  }

  try {
    const { from, leadsTo } = mailConfig();
    const { error } = await resend.emails.send({
      from,
      to: leadsTo,
      replyTo: email,
      subject: `[AgentIA] Contacto de ${nombre}${empresa ? ` - ${empresa}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1628; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #fbbf24; margin-top: 0;">Nuevo contacto desde AgentIA</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #94a3b8; width: 100px;">Nombre:</td><td style="padding: 8px 0;">${escapeHtml(nombre)}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8;">Email:</td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
            ${empresa ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Empresa:</td><td style="padding: 8px 0;">${escapeHtml(empresa)}</td></tr>` : ''}
            ${sector ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Sector:</td><td style="padding: 8px 0;">${escapeHtml(sector)}</td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #111d35; border-radius: 8px; border-left: 3px solid #fbbf24;">
            <p style="color: #94a3b8; margin: 0 0 8px; font-size: 12px;">MENSAJE:</p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
          </div>
        </div>
      `,
    });
    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error enviando contacto:', error);
    return res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
}
