import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AdminLogin } from './AdminLogin'

describe('AdminLogin', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('shows an error when login fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('E-mail'), 'admin@lscontabilidade.com.br')
    await user.type(screen.getByLabelText('Senha'), 'senha-errada')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('E-mail ou senha inválidos.')).toBeInTheDocument()
  })
})
