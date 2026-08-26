import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { postsRouter } from './routes/posts.js'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(cookieParser())

  if (process.env.NODE_ENV !== 'production') {
    app.use(
      cors({
        origin: process.env.ADMIN_ORIGIN || 'http://localhost:5173',
        credentials: true,
      }),
    )
  }

  app.use('/api/auth', authRouter)
  app.use('/api/posts', postsRouter)
  app.use('/uploads', express.static('uploads'))

  app.get('/api/health', (req, res) => {
    res.json({ ok: true })
  })

  return app
}
