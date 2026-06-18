import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, nombre, sector, casos, roi, inversion, beneficio } = req.body;

  if (!email || !nombre) {
    return res.status(400).json({ error: 'Email y nombre requeridos' });
  }

  try {
    await resend.emails.send({
      from: 'propuestas@tudominio.com',
      to: email,
      subject: `Propuesta Agentes IA - Sector ${sector}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1F3864 0%, #0066cc 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .section { margin: 20px 0; padding: 20px; background: #f9f9f9; border-radius: 8px; }
              .section h2 { color: #1F3864; font-size: 18px; margin-top: 0; }
              .metric { display: inline-block; margin: 10px 15px 10px 0; }
              .metric-label { color: #666; font-size: 12px; }
              .metric-value { font-size: 24px; font-weight: bold; color: #0066cc; }
              .metric-value.roi { color: #28a745; }
              .cta { background: #0066cc; color: white; padding: 15px 30px; border-radius: 5px; text-align: center; text-decoration: none; display: inline-block; margin-top: 20px; }
              .footer { font-size: 12px; color: #999; margin-top: 30px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Propuesta de Agentes IA</h1>
                <p>Análisis de presupuesto e impacto ROI</p>
              </div>
              <div style="margin-top: 20px;">
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>Te adjuntamos el análisis de presupuestación para <strong>${casos} agentes IA en el sector ${sector}</strong>.</p>
              </div>
              <div class="section">
                <h2>Resumen Ejecutivo</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div class="metric">
                    <p class="metric-label">INVERSIÓN AÑO 1</p>
                    <p class="metric-value">€${inversion.toLocaleString()}</p>
                  </div>
                  <div class="metric">
                    <p class="metric-label">ROI AÑO 1</p>
                    <p class="metric-value roi">${roi}%</p>
                  </div>
                </div>
                <p style="margin-top: 15px; color: #666; font-size: 14px;">
                  <strong>Beneficio estimado:</strong> €${beneficio.toLocaleString()} anuales con sinergia de bundling.
                </p>
              </div>
              <div class="section">
                <h2>¿Qué incluye?</h2>
                <ul style="color: #666; line-height: 1.8;">
                  <li>Análisis detallado de cada caso de uso</li>
                  <li>Presupuesto desglosado (inicial + recurrente)</li>
                  <li>Cálculo de ROI por caso y bundled</li>
                  <li>Sinergias detectadas automáticamente</li>
                  <li>Roadmap de implementación</li>
                </ul>
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://presupuestador-agentes-ia.vercel.app" class="cta">Ver propuesta completa</a>
              </div>
              <div class="footer">
                <p>Esta propuesta ha sido generada automáticamente con base en tu selección de casos.</p>
                <p>© 2026 Presupuestador de Agentes IA</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: `Propuesta enviada a ${email}`,
    });
  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({
      error: 'Error al enviar el email',
      details: error.message,
    });
  }
}
