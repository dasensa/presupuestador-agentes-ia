const buckets = new Map();

export function rateLimit(req, { limit = 5, windowMs = 60_000 } = {}) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim()
    || req.socket?.remoteAddress
    || 'unknown';
  const now = Date.now();
  const current = buckets.get(ip);

  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function text(value, maxLength = 200) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function escapeHtml(value) {
  return text(value, 5_000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function validEmail(value) {
  const email = text(value, 254);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

export function mailConfig() {
  return {
    from: process.env.RESEND_FROM_EMAIL || 'AgentIA <onboarding@resend.dev>',
    leadsTo: process.env.LEADS_TO_EMAIL || 'info@agentia.es',
  };
}

export function methodNotAllowed(res, allowed = ['POST']) {
  res.setHeader('Allow', allowed);
  return res.status(405).json({ error: 'Metodo no permitido' });
}

export function rejectAbuse(req, res) {
  if (!rateLimit(req)) {
    res.status(429).json({ error: 'Demasiadas solicitudes. Intentalo de nuevo en un minuto.' });
    return true;
  }
  if (req.body?.website) {
    res.status(200).json({ success: true });
    return true;
  }
  return false;
}
