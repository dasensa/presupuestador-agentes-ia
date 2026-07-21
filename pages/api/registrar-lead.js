import { Resend } from 'resend';
import { buildCasosMap, SECTORES_META } from '../../data/casos';
import { calcResumen } from '../../lib/calculations';
import { adjustBudget } from '../../lib/budget-context';
import { escapeHtml, mailConfig, methodNotAllowed, rejectAbuse, text, validEmail } from '../../lib/api-security';

const resend = new Resend(process.env.RESEND_API_KEY);
const currency = (value) => `${Math.round(value).toLocaleString('es-ES')} EUR`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res);
  if (rejectAbuse(req, res)) return;

  const nombre = text(req.body?.nombre, 100);
  const email = validEmail(req.body?.email);
  const empresa = text(req.body?.empresa, 150);
  const telefono = text(req.body?.telefono, 40);
  const sector = text(req.body?.sector, 80);
  const selectedIds = Array.isArray(req.body?.selectedIds)
    ? req.body.selectedIds.map(Number).filter(Number.isInteger).slice(0, 20)
    : [];
  if (!nombre || !email || !empresa || !SECTORES_META[sector] || !selectedIds.length) {
    return res.status(400).json({ error: 'Datos de la simulacion incompletos' });
  }

  const casosMap = buildCasosMap();
  const validIds = [...new Set(selectedIds)].filter((id) => casosMap[id]?.s === sector);
  if (!validIds.length) return res.status(400).json({ error: 'Seleccion de agentes no valida' });

  const resumen = calcResumen(validIds, casosMap);
  const adjusted = adjustBudget(resumen, req.body?.context);
  const { from, leadsTo } = mailConfig();
  const rows = resumen.selectedCasos.map((caso) => `<tr><td style="padding:10px;border-bottom:1px solid #e2e8f0">${escapeHtml(caso.c)}</td><td style="padding:10px;border-bottom:1px solid #e2e8f0">${escapeHtml(caso.t)}</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:right">${currency(caso.ini + caso.rec * 12)}</td></tr>`).join('');

  try {
    const userMail = await resend.emails.send({
      from,
      to: email,
      subject: `Tu simulacion AgentIA para ${empresa}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#0f172a"><h1>Tu simulacion AgentIA</h1><p>Hola ${escapeHtml(nombre)},</p><p>Este es el resumen orientativo para ${escapeHtml(empresa)}, sector ${escapeHtml(sector)}. Un consultor puede validar las hipotesis antes de tomar una decision.</p><div style="display:flex;gap:12px;margin:24px 0"><div style="flex:1;background:#eff6ff;padding:18px;border-radius:14px"><small>INVERSION ANO 1</small><br><strong>${currency(adjusted.inversion)}</strong></div><div style="flex:1;background:#ecfdf5;padding:18px;border-radius:14px"><small>ROI ORIENTATIVO</small><br><strong>${adjusted.roi}%</strong></div></div><table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:10px">Agente</th><th style="text-align:left;padding:10px">Tipo</th><th style="text-align:right;padding:10px">Coste base ano 1</th></tr></thead><tbody>${rows}</tbody></table><p style="margin-top:24px;color:#64748b;font-size:12px">Estimacion preliminar basada en supuestos generales. No constituye una oferta contractual ni una garantia de resultados.</p></div>`,
    });
    if (userMail.error) throw userMail.error;

    const leadMail = await resend.emails.send({
      from,
      to: leadsTo,
      replyTo: email,
      subject: `[AgentIA Lead] ${empresa} - ${sector} - ${nombre}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>Nueva simulacion</h2><p><strong>${escapeHtml(nombre)}</strong> — ${escapeHtml(empresa)}</p><p>${escapeHtml(email)}${telefono ? ` · ${escapeHtml(telefono)}` : ''}</p><p>${escapeHtml(sector)} · ${validIds.length} agentes · ${currency(adjusted.inversion)}</p></div>`,
    });
    if (leadMail.error) throw leadMail.error;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registrando lead:', error);
    return res.status(502).json({ error: 'No se pudo enviar la simulacion' });
  }
}
