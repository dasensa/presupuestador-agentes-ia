import { Resend } from 'resend';
import { escapeHtml, mailConfig, methodNotAllowed, rejectAbuse, text, validEmail } from '../../lib/api-security';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res);
  }
  if (rejectAbuse(req, res)) return;

  const email = validEmail(req.body?.email);
  const nombre = text(req.body?.nombre, 100);
  const empresa = text(req.body?.empresa, 150);
  const cargo = text(req.body?.cargo, 100);
  const sector = text(req.body?.sector, 80);
  const casos = Math.max(0, Math.min(70, Number(req.body?.casos) || 0));
  const roi = Math.round(Number(req.body?.roi) || 0);
  const inversion = Math.max(0, Number(req.body?.inversion) || 0);
  const beneficio = Math.max(0, Number(req.body?.beneficio) || 0);
  const costeInaccion = Math.max(0, Number(req.body?.costeInaccion) || 0);

  if (!email || !nombre) {
    return res.status(400).json({ error: 'Email y nombre requeridos' });
  }

  const destinatario = cargo ? `${nombre} — ${cargo}` : nombre;

  try {
    const { from } = mailConfig();
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: `Simulacion AgentIA - ${empresa || sector} - ${casos} agentes IA`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="UTF-8"></head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #020617;">
            <div style="max-width: 600px; margin: 0 auto; padding: 32px 20px;">
              <div style="background: linear-gradient(135deg, #0a1628 0%, #111d35 100%); border-radius: 16px; padding: 32px; border: 1px solid #243353;">
                <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #243353; margin-bottom: 24px;">
                  <h1 style="margin: 0; font-size: 28px;">
                    <span style="color: #ffffff;">Agent</span><span style="color: #fbbf24;">IA</span>
                  </h1>
                  <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">Propuesta de Agentes IA</p>
                </div>

                <p style="color: #e2e8f0; font-size: 15px;">Hola <strong>${escapeHtml(nombre)}</strong>,</p>
                <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                  Esta es tu simulacion orientativa para <strong style="color: #fbbf24;">${casos} agentes IA</strong> en el sector <strong style="color: #fbbf24;">${escapeHtml(sector)}</strong>${empresa ? ` en ${escapeHtml(empresa)}` : ''}.
                </p>

                <div style="background: #1a2744; border-radius: 12px; padding: 16px 20px; margin: 20px 0; border: 1px solid #243353;">
                  <p style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 8px; letter-spacing: 1px;">PREPARADO PARA</p>
                  <p style="color: #ffffff; margin: 0; font-weight: 600;">${escapeHtml(destinatario)}</p>
                  ${empresa ? `<p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">${escapeHtml(empresa)}</p>` : ''}
                </div>

                <div style="display: flex; gap: 12px; margin: 24px 0;">
                  <div style="flex: 1; background: #1a2744; border-radius: 12px; padding: 20px; border: 1px solid #243353;">
                    <p style="color: #60a5fa; font-size: 11px; font-weight: bold; margin: 0; letter-spacing: 1px;">INVERSION ANO 1</p>
                    <p style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 8px 0 0;">&euro;${inversion.toLocaleString()}</p>
                  </div>
                  <div style="flex: 1; background: #1a2744; border-radius: 12px; padding: 20px; border: 1px solid #243353;">
                    <p style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0; letter-spacing: 1px;">ROI ANO 1</p>
                    <p style="font-size: 24px; font-weight: bold; color: #34d399; margin: 8px 0 0;">${roi}%</p>
                  </div>
                </div>

                <div style="background: #1a2744; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #243353;">
                  <p style="color: #94a3b8; font-size: 12px; margin: 0 0 4px;">Beneficio estimado anual:</p>
                  <p style="color: #34d399; font-size: 20px; font-weight: bold; margin: 0;">&euro;${beneficio.toLocaleString()}</p>
                </div>

                ${costeInaccion ? `
                <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #f87171; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
                  <p style="color: #f87171; font-weight: bold; font-size: 13px; margin: 0 0 4px;">COSTE DE INACCION MENSUAL</p>
                  <p style="font-size: 22px; font-weight: bold; color: #f87171; margin: 0;">&euro;${costeInaccion.toLocaleString()}</p>
                  <p style="color: #fca5a5; font-size: 11px; margin: 6px 0 0;">Estimacion orientativa de la oportunidad mensual bajo las hipotesis introducidas.</p>
                </div>
                ` : ''}

                <div style="background: #1a2744; border-radius: 12px; padding: 16px 20px; border: 1px solid #243353;">
                  <p style="color: #fbbf24; font-size: 13px; font-weight: bold; margin: 0 0 8px;">Que incluye:</p>
                  <ul style="color: #94a3b8; margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
                    <li>Analisis detallado de cada caso de uso</li>
                    <li>Presupuesto desglosado (inicial + recurrente)</li>
                    <li>Calculo de ROI por caso y bundled</li>
                    <li>Sinergias detectadas automaticamente</li>
                    <li>Roadmap de implementacion</li>
                  </ul>
                </div>

                <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #243353;">
                  <p style="font-size: 11px; color: #64748b; margin: 0;">&copy; 2026 AgentIA. Propuesta generada automaticamente.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: `Propuesta enviada a ${email}`,
    });
  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({
      error: 'Error al enviar el email',
    });
  }
}
