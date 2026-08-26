import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

const { createApp } = await import('../app.js')
const app = createApp()

beforeEach(() => {
  sendMock.mockReset()
  process.env.RESEND_API_KEY = 're_test_key'
  process.env.CONTACT_EMAIL_TO = 'lscontabilidade9@gmail.com'
})

describe('POST /api/contact', () => {
  it('sends an email with the form data and returns 200', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null })

    const response = await request(app).post('/api/contact').send({
      name: 'Maria Souza',
      phone: '71999999999',
      email: 'maria@example.com',
      subject: 'Abertura de empresa',
      message: 'Quero abrir uma empresa.',
    })

    expect(response.status).toBe(200)
    expect(sendMock).toHaveBeenCalledTimes(1)

    const payload = sendMock.mock.calls[0][0]
    expect(payload.to).toBe('lscontabilidade9@gmail.com')
    expect(payload.replyTo).toBe('maria@example.com')
    expect(payload.subject).toContain('Abertura de empresa')
    expect(payload.text).toContain('Maria Souza')
    expect(payload.text).toContain('Quero abrir uma empresa.')
  })

  it('returns 400 when required fields are missing', async () => {
    const response = await request(app).post('/api/contact').send({ name: 'Maria Souza' })

    expect(response.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns 502 when Resend reports an error', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } })

    const response = await request(app).post('/api/contact').send({
      name: 'Maria Souza',
      phone: '71999999999',
      email: 'maria@example.com',
      message: 'Quero abrir uma empresa.',
    })

    expect(response.status).toBe(502)
  })

  it('silently accepts submissions with the honeypot field filled, without sending', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'Bot',
      phone: '000',
      email: 'bot@example.com',
      message: 'spam',
      company: 'filled-by-bot',
    })

    expect(response.status).toBe(200)
    expect(sendMock).not.toHaveBeenCalled()
  })
})
