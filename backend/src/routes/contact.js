import { Router } from 'express'
import { Resend } from 'resend'

export const contactRouter = Router()

function buildEmailText({ name, phone, email, subject, plan, message }) {
  return [
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `E-mail: ${email}`,
    subject ? `Assunto: ${subject}` : null,
    plan ? `Plano: ${plan}` : null,
    '',
    'Mensagem:',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

contactRouter.post('/', async (req, res) => {
  const { name, phone, email, subject, plan, message, company } = req.body

  if (company) {
    return res.status(200).json({ ok: true })
  }

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Nome, telefone, e-mail e mensagem são obrigatórios' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'LS Contabilidade <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `Novo contato pelo site: ${subject || name}`,
      text: buildEmailText({ name, phone, email, subject, plan, message }),
    })

    if (error) {
      throw new Error(error.message)
    }

    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Falha ao enviar e-mail de contato:', error)
    res.status(502).json({ error: 'Não foi possível enviar sua mensagem agora' })
  }
})
