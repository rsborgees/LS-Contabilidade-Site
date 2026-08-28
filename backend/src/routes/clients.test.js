import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app.js'
import { pool } from '../db.js'
import { hashPassword } from '../auth/hash.js'

const app = createApp()

async function loginAgent() {
  const agent = request.agent(app)
  await agent
    .post('/api/auth/login')
    .send({ email: 'admin@lscontabilidade.com.br', password: 'senha-correta' })
  return agent
}

beforeEach(async () => {
  await pool.query('DELETE FROM clients')
  await pool.query('DELETE FROM admins')
  await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [
    'admin@lscontabilidade.com.br',
    await hashPassword('senha-correta'),
  ])
})

afterAll(async () => {
  await pool.end()
})

describe('GET /api/clients', () => {
  it('lists clients without requiring authentication', async () => {
    await pool.query(
      "INSERT INTO clients (name, logo_image_path, website_url) VALUES ('Cliente A', 'a.png', 'https://a.com')",
    )

    const response = await request(app).get('/api/clients')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: 'Cliente A',
        logoUrl: '/uploads/a.png',
        websiteUrl: 'https://a.com',
      },
    ])
  })

  it('returns null websiteUrl for clients without a link', async () => {
    await pool.query("INSERT INTO clients (name, logo_image_path) VALUES ('Cliente B', 'b.png')")

    const response = await request(app).get('/api/clients')

    expect(response.body[0].websiteUrl).toBeNull()
  })
})

describe('POST /api/clients', () => {
  it('rejects unauthenticated requests', async () => {
    const response = await request(app).post('/api/clients').field('name', 'Cliente C')
    expect(response.status).toBe(401)
  })

  it('creates a client with a logo upload when authenticated', async () => {
    const agent = await loginAgent()

    const response = await agent
      .post('/api/clients')
      .field('name', 'Cliente C')
      .field('websiteUrl', 'https://clientec.com')
      .attach('logo', Buffer.from('fake-image'), 'logo.png')

    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Cliente C')
    expect(response.body.websiteUrl).toBe('https://clientec.com')
    expect(response.body.logoUrl).toMatch(/^\/uploads\/.+\.png$/)
  })

  it('requires a name and a logo', async () => {
    const agent = await loginAgent()
    const response = await agent.post('/api/clients').field('name', 'Sem logo')
    expect(response.status).toBe(400)
  })
})

describe('PUT /api/clients/:id', () => {
  it('updates a client name and website without requiring a new logo', async () => {
    const agent = await loginAgent()
    const created = await pool.query(
      "INSERT INTO clients (name, logo_image_path) VALUES ('Original', 'orig.png') RETURNING id",
    )

    const response = await agent
      .put(`/api/clients/${created.rows[0].id}`)
      .field('name', 'Atualizado')
      .field('websiteUrl', 'https://novo-site.com')

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Atualizado')
    expect(response.body.websiteUrl).toBe('https://novo-site.com')
    expect(response.body.logoUrl).toBe('/uploads/orig.png')
  })

  it('returns 404 for a client that does not exist', async () => {
    const agent = await loginAgent()
    const response = await agent.put('/api/clients/999999').field('name', 'X')
    expect(response.status).toBe(404)
  })
})

describe('DELETE /api/clients/:id', () => {
  it('deletes a client when authenticated', async () => {
    const agent = await loginAgent()
    const created = await pool.query(
      "INSERT INTO clients (name, logo_image_path) VALUES ('Para Excluir', 'x.png') RETURNING id",
    )

    const response = await agent.delete(`/api/clients/${created.rows[0].id}`)

    expect(response.status).toBe(204)
    const remaining = await pool.query('SELECT * FROM clients WHERE id = $1', [created.rows[0].id])
    expect(remaining.rows).toHaveLength(0)
  })

  it('rejects unauthenticated delete requests', async () => {
    const response = await request(app).delete('/api/clients/1')
    expect(response.status).toBe(401)
  })
})
