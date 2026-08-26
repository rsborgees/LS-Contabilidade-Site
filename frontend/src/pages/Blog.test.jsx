import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Blog } from './Blog'

function renderBlog() {
  return render(
    <MemoryRouter>
      <Blog />
    </MemoryRouter>,
  )
}

describe('Blog', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('shows the posts returned by the API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            slug: 'primeiro-post',
            title: 'Primeiro post',
            createdAt: '2026-01-01T00:00:00Z',
            coverImageUrl: null,
          },
        ],
      }),
    )

    renderBlog()

    expect(await screen.findByText('Primeiro post')).toBeInTheDocument()
  })

  it('shows an empty state when there are no posts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => [] }))

    renderBlog()

    expect(await screen.findByText('Ainda não há posts publicados.')).toBeInTheDocument()
  })
})
