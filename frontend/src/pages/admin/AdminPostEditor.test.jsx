import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AdminPostEditor } from './AdminPostEditor'

describe('AdminPostEditor', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders a live Markdown preview as the user types', async () => {
    vi.stubGlobal('fetch', vi.fn())
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AdminPostEditor />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('Conteúdo (Markdown)'), '**negrito**')

    const preview = document.querySelector('.admin-editor__preview-content')
    expect(preview.innerHTML).toContain('<strong>negrito</strong>')
  })
})
