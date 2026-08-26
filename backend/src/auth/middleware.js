import { verifyToken } from './jwt.js'

export const AUTH_COOKIE_NAME = 'ls_admin_token'

export function requireAuth(req, res, next) {
  const token = req.cookies[AUTH_COOKIE_NAME]

  if (!token) {
    return res.status(401).json({ error: 'Não autenticado' })
  }

  try {
    req.admin = verifyToken(token)
    next()
  } catch {
    return res.status(401).json({ error: 'Sessão inválida' })
  }
}
