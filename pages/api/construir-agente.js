import { buildAgentBlueprint } from '../../lib/agent-factory';
import { rejectAbuse, methodNotAllowed } from '../../lib/api-security';

export default function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res);
  if (rejectAbuse(req, res)) return;

  const result = buildAgentBlueprint(req.body);
  if (!result.ok) return res.status(400).json(result);
  return res.status(200).json(result);
}

