import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AdminClientEditor } from './AdminClientEditor'

function renderEditor(initialPath = '/admin/clientes/novo') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/admin/clientes/novo" element={<AdminClientEditor />} />
        <Route path="/admin/clientes/:id/editar" element={<AdminClientEditor />} />
        <Route path="/admin/clientes" element={<p>Lista de clientes</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AdminClientEditor', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('submits a new client with name and website URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    renderEditor()

    await user.type(screen.getByLabelText('Nome do cliente'), 'Cliente Teste')
    await user.type(screen.getByLabelText('Link do site (opcional)'), 'https://clienteteste.com')

    const file = new File(['logo'], 'logo.png', { type: 'image/png' })
    await user.upload(screen.getByLabelText(/^Logo/), file)

    await user.click(screen.getByRole('button', { name: /salvar cliente/i }))

    expect(fetchMock).toHaveBeenCalledWith('/api/clients', expect.objectContaining({ method: 'POST' }))
    const formData = fetchMock.mock.calls[0][1].body
    expect(formData.get('name')).toBe('Cliente Teste')
    expect(formData.get('websiteUrl')).toBe('https://clienteteste.com')

    expect(await screen.findByText('Lista de clientes')).toBeInTheDocument()
  })

  it('pre-fills the form when editing an existing client', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { id: 5, name: 'Cliente Existente', websiteUrl: 'https://existente.com', logoUrl: '/uploads/x.png' },
        ],
      }),
    )

    renderEditor('/admin/clientes/5/editar')

    expect(await screen.findByDisplayValue('Cliente Existente')).toBeInTheDocument()
    expect(screen.getByDisplayValue('https://existente.com')).toBeInTheDocument()
  })
})
