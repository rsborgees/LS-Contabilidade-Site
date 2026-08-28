import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { postsRouter } from './routes/posts.js'
import { contactRouter } from './routes/contact.js'
import { newsRouter } from './routes/news.js'
import { clientsRouter } from './routes/clients.js'

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
  app.use('/api/contact', contactRouter)
  app.use('/api/news', newsRouter)
  app.use('/api/clients', clientsRouter)
  app.use('/uploads', express.static('uploads'))

  app.get('/api/health', (req, res) => {
    res.json({ ok: true })
  })

  return app
}
