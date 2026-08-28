import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Noticias } from './Noticias'

const NEWS = [
  {
    title: 'Receita Federal esclarece nova regra do Simples Nacional',
    link: 'https://example.com/noticia-1',
    source: 'Portal Contábeis',
    publishedAt: '2026-08-24T10:00:00Z',
    category: 'Simples Nacional',
  },
  {
    title: 'CFC divulga calendário de provas do exame de suficiência',
    link: 'https://example.com/noticia-2',
    source: 'CFC',
    publishedAt: '2026-08-22T10:00:00Z',
    category: 'Contabilidade / Societário',
  },
  {
    title: 'Jornal Contábil traz mudanças na legislação trabalhista',
    link: 'https://example.com/noticia-3',
    source: 'Jornal Contábil',
    publishedAt: '2026-08-20T10:00:00Z',
    category: 'Trabalho / Previdência',
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

  it('filters the list by subject when a category is selected', async () => {
    mockFetch(NEWS)
    const user = userEvent.setup()
    renderNoticias()

    await screen.findByText(NEWS[0].title)

    await user.selectOptions(screen.getByLabelText('Assunto'), 'Simples Nacional')

    expect(screen.getByText(NEWS[0].title)).toBeInTheDocument()
    expect(screen.queryByText(NEWS[1].title)).not.toBeInTheDocument()
    expect(screen.queryByText(NEWS[2].title)).not.toBeInTheDocument()
  })

  it('shows all items again when switching back to "Em todos os assuntos"', async () => {
    mockFetch(NEWS)
    const user = userEvent.setup()
    renderNoticias()

    await screen.findByText(NEWS[0].title)
    await user.selectOptions(screen.getByLabelText('Assunto'), 'Simples Nacional')
    await user.selectOptions(screen.getByLabelText('Assunto'), 'Em todos os assuntos')

    expect(screen.getByText(NEWS[0].title)).toBeInTheDocument()
    expect(screen.getByText(NEWS[1].title)).toBeInTheDocument()
    expect(screen.getByText(NEWS[2].title)).toBeInTheDocument()
  })
})
