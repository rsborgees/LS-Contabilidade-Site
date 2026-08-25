import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

async function fillRequiredFields(user) {
  await user.type(screen.getByLabelText('Nome'), 'Maria Souza')
  await user.type(screen.getByLabelText('Telefone'), '71999999999')
  await user.type(screen.getByLabelText('E-mail'), 'maria@example.com')
  await user.type(screen.getByLabelText('Assunto'), 'Abertura de empresa')
  await user.type(screen.getByLabelText('Mensagem'), 'Quero abrir uma empresa.')
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test123')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('shows a success message and clears the form after a successful submit', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toHaveValue('')
  })

  it('shows an error message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/não foi possível enviar sua mensagem/i)).toBeInTheDocument()
  })

  it('warns instead of submitting when the Formspree endpoint is not configured', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/ainda não está conectado a um endpoint/i)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
