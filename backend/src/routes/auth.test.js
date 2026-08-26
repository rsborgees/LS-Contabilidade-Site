import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app.js'
import { pool } from '../db.js'
import { hashPassword } from '../auth/hash.js'

const app = createApp()

beforeEach(async () => {
  await pool.query('DELETE FROM admins')
  await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [
    'admin@lscontabilidade.com.br',
    await hashPassword('senha-correta'),
  ])
})

afterAll(async () => {
  await pool.end()
})

describe('POST /api/auth/login', () => {
  it('sets an auth cookie with correct credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@lscontabilidade.com.br', password: 'senha-correta' })

    expect(response.status).toBe(200)
    expect(response.headers['set-cookie'][0]).toContain('ls_admin_token=')
  })

  it('rejects the wrong password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@lscontabilidade.com.br', password: 'senha-errada' })

    expect(response.status).toBe(401)
  })
})

describe('GET /api/auth/me', () => {
  it('returns 401 without a cookie', async () => {
    const response = await request(app).get('/api/auth/me')
    expect(response.status).toBe(401)
  })

  it('returns the admin when logged in', async () => {
    const agent = request.agent(app)
    await agent
      .post('/api/auth/login')
      .send({ email: 'admin@lscontabilidade.com.br', password: 'senha-correta' })

    const response = await agent.get('/api/auth/me')

    expect(response.status).toBe(200)
    expect(response.body.email).toBe('admin@lscontabilidade.com.br')
  })
})
