import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, telefono, empresa, cargo, sector, empleados, presupuesto, urgencia } = req.body;

  if (!nombre || !email || !empresa) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    await resend.emails.send({
      from: 'leads@tudominio.com',
      to: 'info@agentia.es',
      replyTo: email,
      subject: `[AgentIA Lead] ${empresa} - ${sector} - ${nombre}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1628; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #fbbf24; margin-top: 0;">Nuevo lead desde el Presupuestador</h2>
          <p style="color: #94a3b8; font-size: 14px;">Un usuario ha iniciado una simulacion en el presupuestador.</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353; width: 140px;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid #243353; font-weight: 600;">${nombre}</td></tr>
            <tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #243353;">${email}</td></tr>
            ${telefono ? `<tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Telefono</td><td style="padding: 10px 0; border-bottom: 1px solid #243353;">${telefono}</td></tr>` : ''}
            <tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Empresa</td><td style="padding: 10px 0; border-bottom: 1px solid #243353; font-weight: 600;">${empresa}</td></tr>
            ${cargo ? `<tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Cargo</td><td style="padding: 10px 0; border-bottom: 1px solid #243353;">${cargo}</td></tr>` : ''}
            <tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Sector</td><td style="padding: 10px 0; border-bottom: 1px solid #243353;"><strong style="color: #fbbf24;">${sector}</strong></td></tr>
            <tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Empleados</td><td style="padding: 10px 0; border-bottom: 1px solid #243353;">${empleados}</td></tr>
            ${presupuesto ? `<tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Presupuesto</td><td style="padding: 10px 0; border-bottom: 1px solid #243353; color: #34d399;">${presupuesto}</td></tr>` : ''}
            ${urgencia ? `<tr><td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #243353;">Urgencia</td><td style="padding: 10px 0; border-bottom: 1px solid #243353;">${urgencia}</td></tr>` : ''}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #111d35; border-radius: 8px; border-left: 3px solid #fbbf24;">
            <p style="color: #fbbf24; font-size: 12px; font-weight: bold; margin: 0 0 4px;">ACCION RECOMENDADA</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">Contactar a ${nombre} en las proximas 24h para ofrecer una consultoria personalizada.</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registrando lead:', error);
    return res.status(500).json({ error: 'Error al registrar lead' });
  }
}
