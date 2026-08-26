import { Router } from 'express'
import { pool } from '../db.js'
import { verifyPassword } from '../auth/hash.js'
import { signToken } from '../auth/jwt.js'
import { requireAuth, AUTH_COOKIE_NAME } from '../auth/middleware.js'

export const authRouter = Router()

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' })
  }

  const result = await pool.query('SELECT id, password_hash FROM admins WHERE email = $1', [
    email,
  ])
  const admin = result.rows[0]

  if (!admin || !(await verifyPassword(password, admin.password_hash))) {
    return res.status(401).json({ error: 'E-mail ou senha inválidos' })
  }

  const token = signToken({ adminId: admin.id })
  res.cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS)
  res.json({ ok: true })
})

authRouter.post('/logout', (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME)
  res.json({ ok: true })
})

authRouter.get('/me', requireAuth, async (req, res) => {
  const result = await pool.query('SELECT id, email FROM admins WHERE id = $1', [
    req.admin.adminId,
  ])
  const admin = result.rows[0]

  if (!admin) {
    return res.status(401).json({ error: 'Admin não encontrado' })
  }

  res.json({ id: admin.id, email: admin.email })
})
