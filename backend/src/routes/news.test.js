import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from '../app.js'
import { resetNewsCache } from './news.js'

const app = createApp()

// Matches src/routes/news.js LEGISWEB_CATEGORIES order.
const CATEGORY_LABELS = [
  'IR / Contribuições',
  'ICMS, IPI, ISS e Outros',
  'Trabalho / Previdência',
  'Contabilidade / Societário',
  'Simples Nacional',
  'Comércio Exterior',
]

function legisWebPageWith(rows) {
  const rowsHtml = rows
    .map(
      ({ title, href, dateText }) => `
        <tr><td>
          <h4 class="result-titulo"><a href="${href}">${title}</a></h4>
          <p class="result-datado"><a href="${href}" class="not_data">${dateText}</a></p>
        </td></tr>
      `,
    )
    .join('')
  return `<html><body><table><tbody>${rowsHtml}</tbody></table></body></html>`
}

function pageForCategory(label, count = 1, startDay = 20) {
  const rows = Array.from({ length: count }, (_, index) => ({
    title: `${label} notícia ${index}`,
    href: `../noticia/?id=${label}-${index}`,
    dateText: `${startDay} ago 2026 - ${label}`,
  }))
  return legisWebPageWith(rows)
}

function mockFetchSequence(pages) {
  const fetchMock = vi.fn()
  pages.forEach((page) => {
    fetchMock.mockImplementationOnce(async () => ({ ok: true, text: async () => page }))
  })
  return fetchMock
}

function mockAllCategoriesWithOneItemEach() {
  return mockFetchSequence(CATEGORY_LABELS.map((label) => pageForCategory(label, 1)))
}

beforeEach(() => {
  vi.unstubAllGlobals()
  resetNewsCache()
})

describe('GET /api/news', () => {
  it('returns items covering every LegisWeb category', async () => {
    vi.stubGlobal('fetch', mockAllCategoriesWithOneItemEach())

    const response = await request(app).get('/api/news')

    expect(response.status).toBe(200)
    const categories = new Set(response.body.map((item) => item.category))
    expect(categories).toEqual(new Set(CATEGORY_LABELS))
  })

  it('sorts merged items from all categories by most recent first', async () => {
    const pages = CATEGORY_LABELS.map((label, index) => pageForCategory(label, 1, 10 + index))
    vi.stubGlobal('fetch', mockFetchSequence(pages))

    const response = await request(app).get('/api/news')

    const dates = response.body.map((item) => item.publishedAt)
    const sorted = [...dates].sort().reverse()
    expect(dates).toEqual(sorted)
  })

  it('limits each category to 5 items even when more are available', async () => {
    const pages = CATEGORY_LABELS.map((label) => pageForCategory(label, 10))
    vi.stubGlobal('fetch', mockFetchSequence(pages))

    const response = await request(app).get('/api/news')

    const perCategoryCount = CATEGORY_LABELS.map(
      (label) => response.body.filter((item) => item.category === label).length,
    )
    expect(perCategoryCount).toEqual(CATEGORY_LABELS.map(() => 5))
  })

  it('skips a category that fails and still returns the others', async () => {
    const fetchMock = vi.fn()
    fetchMock.mockImplementationOnce(async () => ({ ok: false }))
    CATEGORY_LABELS.slice(1).forEach((label) => {
      fetchMock.mockImplementationOnce(async () => ({ ok: true, text: async () => pageForCategory(label, 1) }))
    })
    vi.stubGlobal('fetch', fetchMock)

    const response = await request(app).get('/api/news')

    expect(response.status).toBe(200)
    expect(response.body.some((item) => item.category === CATEGORY_LABELS[0])).toBe(false)
    expect(response.body.length).toBe(CATEGORY_LABELS.length - 1)
  })

  it('returns 502 and does not cache when every category fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    const first = await request(app).get('/api/news')
    expect(first.status).toBe(502)

    vi.stubGlobal('fetch', mockAllCategoriesWithOneItemEach())

    const second = await request(app).get('/api/news')
    expect(second.status).toBe(200)
    expect(second.body.length).toBe(CATEGORY_LABELS.length)
  })

  it('caches results and does not refetch within the TTL', async () => {
    const fetchMock = mockAllCategoriesWithOneItemEach()
    vi.stubGlobal('fetch', fetchMock)

    await request(app).get('/api/news')
    await request(app).get('/api/news')

    expect(fetchMock).toHaveBeenCalledTimes(CATEGORY_LABELS.length)
  })
})
