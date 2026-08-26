import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { pool } from '../db.js'
import { requireAuth } from '../auth/middleware.js'
import { ensureUniqueSlug, generateSlug } from '../posts/slug.js'

export const postsRouter = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      cb(null, `${randomUUID()}${ext}`)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

function toPublicPost(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    coverImageUrl: row.cover_image_path ? `/uploads/${row.cover_image_path}` : null,
    content: row.content_markdown,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

postsRouter.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC')
  res.json(result.rows.map(toPublicPost))
})

postsRouter.get('/:slugOrId', async (req, res) => {
  const isNumericId = /^\d+$/.test(req.params.slugOrId)
  const result = await pool.query(
    isNumericId ? 'SELECT * FROM posts WHERE id = $1' : 'SELECT * FROM posts WHERE slug = $1',
    [req.params.slugOrId],
  )
  const post = result.rows[0]

  if (!post) {
    return res.status(404).json({ error: 'Post não encontrado' })
  }

  res.json(toPublicPost(post))
})

postsRouter.post('/', requireAuth, upload.single('coverImage'), async (req, res) => {
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' })
  }

  const baseSlug = generateSlug(title)
  const slug = await ensureUniqueSlug(baseSlug)
  const coverImagePath = req.file ? req.file.filename : null

  const result = await pool.query(
    `INSERT INTO posts (title, slug, content_markdown, cover_image_path)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, slug, content, coverImagePath],
  )

  res.status(201).json(toPublicPost(result.rows[0]))
})

postsRouter.put('/:id', requireAuth, upload.single('coverImage'), async (req, res) => {
  const { title, content } = req.body
  const existing = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id])

  if (existing.rows.length === 0) {
    return res.status(404).json({ error: 'Post não encontrado' })
  }

  const current = existing.rows[0]
  const newTitle = title || current.title
  const slug =
    title && title !== current.title
      ? await ensureUniqueSlug(generateSlug(title), current.id)
      : current.slug
  const coverImagePath = req.file ? req.file.filename : current.cover_image_path

  const result = await pool.query(
    `UPDATE posts SET title = $1, slug = $2, content_markdown = $3, cover_image_path = $4, updated_at = now()
     WHERE id = $5 RETURNING *`,
    [newTitle, slug, content || current.content_markdown, coverImagePath, req.params.id],
  )

  res.json(toPublicPost(result.rows[0]))
})

postsRouter.delete('/:id', requireAuth, async (req, res) => {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING id', [
    req.params.id,
  ])

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Post não encontrado' })
  }

  res.status(204).end()
})
