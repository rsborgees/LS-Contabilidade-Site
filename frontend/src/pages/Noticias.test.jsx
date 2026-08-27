import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Noticias } from './Noticias'

const NEWS = [
  {
    title: 'Receita Federal esclarece nova regra do Simples Nacional',
    link: 'https://example.com/noticia-1',
    source: 'Portal Contábeis',
    publishedAt: '2026-08-24T10:00:00Z',
  },
  {
    title: 'CFC divulga calendário de provas do exame de suficiência',
    link: 'https://example.com/noticia-2',
    source: 'CFC',
    publishedAt: '2026-08-22T10:00:00Z',
  },
  {
    title: 'Jornal Contábil traz mudanças na legislação trabalhista',
    link: 'https://example.com/noticia-3',
    source: 'Jornal Contábil',
    publishedAt: '2026-08-20T10:00:00Z',
  },
]

function renderNoticias() {
  return render(
    <MemoryRouter>
      <Noticias />
    </MemoryRouter>,
  )
}

function mockFetch(data, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok, json: () => Promise.resolve(data) }),
  )
}

describe('Noticias', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('shows the most recent item as featured and the rest in a grid', async () => {
    mockFetch(NEWS)
    renderNoticias()

    expect(await screen.findByText(NEWS[0].title)).toBeInTheDocument()
    expect(screen.getByText(NEWS[1].title)).toBeInTheDocument()
    expect(screen.getByText(NEWS[2].title)).toBeInTheDocument()
    expect(screen.getAllByText('Ler notícia')).toHaveLength(3)
  })

  it('links each item to its original source in a new tab', async () => {
    mockFetch(NEWS)
    renderNoticias()

    await screen.findByText(NEWS[0].title)
    const links = screen.getAllByRole('link', { name: /ler notícia/i })
    expect(links[0]).toHaveAttribute('href', NEWS[0].link)
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows an empty state when there is no news', async () => {
    mockFetch([])
    renderNoticias()

    expect(await screen.findByText(/nenhuma notícia dispon[ií]vel/i)).toBeInTheDocument()
  })

  it('shows an error state when the request fails', async () => {
    mockFetch(null, false)
    renderNoticias()

    expect(await screen.findByText(/não foi possível carregar as notícias/i)).toBeInTheDocument()
  })
})
