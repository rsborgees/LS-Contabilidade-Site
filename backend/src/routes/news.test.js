import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const parseURLMock = vi.fn()

vi.mock('rss-parser', () => ({
  default: vi.fn().mockImplementation(() => ({
    parseURL: parseURLMock,
  })),
}))

const { createApp } = await import('../app.js')
const { resetNewsCache } = await import('./news.js')
const app = createApp()

function feedWith(items) {
  return { title: 'Feed', items }
}

beforeEach(() => {
  parseURLMock.mockReset()
  resetNewsCache()
})

describe('GET /api/news', () => {
  it('merges items from all feeds sorted by most recent first', async () => {
    parseURLMock
      .mockResolvedValueOnce(
        feedWith([{ title: 'Notícia A', link: 'https://a', pubDate: '2026-08-20T10:00:00Z' }]),
      )
      .mockResolvedValueOnce(
        feedWith([{ title: 'Notícia B', link: 'https://b', pubDate: '2026-08-25T10:00:00Z' }]),
      )
      .mockResolvedValueOnce(
        feedWith([{ title: 'Notícia C', link: 'https://c', pubDate: '2026-08-22T10:00:00Z' }]),
      )

    const response = await request(app).get('/api/news')

    expect(response.status).toBe(200)
    expect(response.body.map((item) => item.title)).toEqual(['Notícia B', 'Notícia C', 'Notícia A'])
    expect(response.body[0]).toMatchObject({ title: 'Notícia B', link: 'https://b' })
    expect(response.body[0].source).toBeTruthy()
  })

  it('skips a feed that fails and still returns items from the others', async () => {
    parseURLMock
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce(
        feedWith([{ title: 'Notícia B', link: 'https://b', pubDate: '2026-08-25T10:00:00Z' }]),
      )
      .mockResolvedValueOnce(feedWith([]))

    const response = await request(app).get('/api/news')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].title).toBe('Notícia B')
  })

  it('limits results to 12 items', async () => {
    const manyItems = Array.from({ length: 20 }, (_, index) => ({
      title: `Notícia ${index}`,
      link: `https://example.com/${index}`,
      pubDate: new Date(2026, 7, index + 1).toISOString(),
    }))
    parseURLMock
      .mockResolvedValueOnce(feedWith(manyItems))
      .mockResolvedValueOnce(feedWith([]))
      .mockResolvedValueOnce(feedWith([]))

    const response = await request(app).get('/api/news')

    expect(response.body).toHaveLength(12)
  })

  it('caches results and does not refetch within the TTL', async () => {
    parseURLMock.mockResolvedValue(
      feedWith([{ title: 'Notícia', link: 'https://a', pubDate: '2026-08-20T10:00:00Z' }]),
    )

    await request(app).get('/api/news')
    await request(app).get('/api/news')

    expect(parseURLMock).toHaveBeenCalledTimes(3)
  })

  it('does not cache an empty result when every feed fails', async () => {
    parseURLMock.mockRejectedValue(new Error('boom'))

    const first = await request(app).get('/api/news')
    expect(first.body).toEqual([])

    parseURLMock.mockReset()
    parseURLMock.mockResolvedValue(
      feedWith([{ title: 'Notícia', link: 'https://a', pubDate: '2026-08-20T10:00:00Z' }]),
    )

    const second = await request(app).get('/api/news')
    expect(second.body).toHaveLength(3)
  })
})
