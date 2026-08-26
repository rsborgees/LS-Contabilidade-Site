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
  await pool.query('DELETE FROM posts')
  await pool.query('DELETE FROM admins')
  await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [
    'admin@lscontabilidade.com.br',
    await hashPassword('senha-correta'),
  ])
})

afterAll(async () => {
  await pool.end()
})

describe('GET /api/posts', () => {
  it('lists posts without requiring auth', async () => {
    await pool.query(
      "INSERT INTO posts (title, slug, content_markdown) VALUES ('Meu post', 'meu-post', 'conteúdo')",
    )
    const response = await request(app).get('/api/posts')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].slug).toBe('meu-post')
  })
})

describe('GET /api/posts/:slugOrId', () => {
  it('returns 404 for an unknown slug', async () => {
    const response = await request(app).get('/api/posts/nao-existe')
    expect(response.status).toBe(404)
  })

  it('finds a post by numeric id', async () => {
    const created = await pool.query(
      "INSERT INTO posts (title, slug, content_markdown) VALUES ('Meu post', 'meu-post', 'conteúdo') RETURNING id",
    )
    const response = await request(app).get(`/api/posts/${created.rows[0].id}`)

    expect(response.status).toBe(200)
    expect(response.body.slug).toBe('meu-post')
  })
})

describe('POST /api/posts', () => {
  it('rejects creation without authentication', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'Novo post', content: 'texto' })

    expect(response.status).toBe(401)
  })

  it('creates a post with a generated slug when authenticated', async () => {
    const agent = await loginAgent()
    const response = await agent
      .post('/api/posts')
      .field('title', 'Novo Post')
      .field('content', 'Texto do post')

    expect(response.status).toBe(201)
    expect(response.body.slug).toBe('novo-post')
  })

  it('appends a numeric suffix when the title repeats', async () => {
    const agent = await loginAgent()
    await agent.post('/api/posts').field('title', 'Novo Post').field('content', 'Primeiro')
    const second = await agent
      .post('/api/posts')
      .field('title', 'Novo Post')
      .field('content', 'Segundo')

    expect(second.body.slug).toBe('novo-post-2')
  })
})

describe('DELETE /api/posts/:id', () => {
  it('rejects deletion without authentication', async () => {
    const created = await pool.query(
      "INSERT INTO posts (title, slug, content_markdown) VALUES ('Post', 'post', 'x') RETURNING id",
    )
    const response = await request(app).delete(`/api/posts/${created.rows[0].id}`)

    expect(response.status).toBe(401)
  })

  it('deletes a post when authenticated', async () => {
    const agent = await loginAgent()
    const created = await pool.query(
      "INSERT INTO posts (title, slug, content_markdown) VALUES ('Post', 'post', 'x') RETURNING id",
    )
    const response = await agent.delete(`/api/posts/${created.rows[0].id}`)

    expect(response.status).toBe(204)
  })
})
