import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { pool } from '../db.js'
import { requireAuth } from '../auth/middleware.js'

export const clientsRouter = Router()

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

function toPublicClient(row) {
  return {
    id: row.id,
    name: row.name,
    logoUrl: `/uploads/${row.logo_image_path}`,
    websiteUrl: row.website_url,
  }
}

clientsRouter.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM clients ORDER BY created_at ASC')
  res.json(result.rows.map(toPublicClient))
})

clientsRouter.post('/', requireAuth, upload.single('logo'), async (req, res) => {
  const { name, websiteUrl } = req.body

  if (!name || !req.file) {
    return res.status(400).json({ error: 'Nome e logo são obrigatórios' })
  }

  const result = await pool.query(
    `INSERT INTO clients (name, logo_image_path, website_url)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, req.file.filename, websiteUrl || null],
  )

  res.status(201).json(toPublicClient(result.rows[0]))
})

clientsRouter.put('/:id', requireAuth, upload.single('logo'), async (req, res) => {
  const { name, websiteUrl } = req.body
  const existing = await pool.query('SELECT * FROM clients WHERE id = $1', [req.params.id])

  if (existing.rows.length === 0) {
    return res.status(404).json({ error: 'Cliente não encontrado' })
  }

  const current = existing.rows[0]
  const logoImagePath = req.file ? req.file.filename : current.logo_image_path

  const result = await pool.query(
    `UPDATE clients SET name = $1, logo_image_path = $2, website_url = $3
     WHERE id = $4 RETURNING *`,
    [name || current.name, logoImagePath, websiteUrl || null, req.params.id],
  )

  res.json(toPublicClient(result.rows[0]))
})

clientsRouter.delete('/:id', requireAuth, async (req, res) => {
  const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING id', [
    req.params.id,
  ])

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Cliente não encontrado' })
  }

  res.status(204).end()
})
