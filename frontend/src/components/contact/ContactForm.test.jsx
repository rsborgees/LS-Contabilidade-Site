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
  afterEach(() => {
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
    expect(fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('shows an error message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/não foi possível enviar sua mensagem/i)).toBeInTheDocument()
  })

  it('does not show a plan field when planOptions is not provided', () => {
    render(<ContactForm />)
    expect(screen.queryByLabelText('Plano desejado')).not.toBeInTheDocument()
  })

  it('lets the user pick a plan when planOptions is provided', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const user = userEvent.setup()
    render(<ContactForm planOptions={['Contabilidade Light', 'Contabilidade Essencial']} />)

    await fillRequiredFields(user)
    await user.selectOptions(screen.getByLabelText('Plano desejado'), 'Contabilidade Essencial')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument()
  })
})
