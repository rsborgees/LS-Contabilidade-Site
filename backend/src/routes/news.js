import { Router } from 'express'
import Parser from 'rss-parser'

export const newsRouter = Router()

const FEEDS = [
  { url: 'https://www.jornalcontabil.com.br/feed/', source: 'Jornal Contábil' },
  { url: 'https://www.contabeis.com.br/rss/noticias/', source: 'Portal Contábeis' },
  { url: 'https://cfc.org.br/feed/', source: 'CFC' },
]

const CACHE_TTL_MS = 30 * 60 * 1000
const MAX_ITEMS = 12

let cache = { data: null, expiresAt: 0 }

export function resetNewsCache() {
  cache = { data: null, expiresAt: 0 }
}

function toPublicItem(item, source) {
  return {
    title: item.title,
    link: item.link,
    source,
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null,
  }
}

function byMostRecentFirst(a, b) {
  if (!a.publishedAt) return 1
  if (!b.publishedAt) return -1
  return new Date(b.publishedAt) - new Date(a.publishedAt)
}

export async function getLatestNews() {
  if (cache.data && cache.expiresAt > Date.now()) {
    return cache.data
  }

  const parser = new Parser({ timeout: 10000 })
  const results = await Promise.allSettled(
    FEEDS.map((feed) => parser.parseURL(feed.url).then((parsed) => ({ feed, parsed }))),
  )

  const fulfilled = results.filter((result) => result.status === 'fulfilled')

  const items = fulfilled
    .flatMap(({ value }) => value.parsed.items.map((item) => toPublicItem(item, value.feed.source)))
    .sort(byMostRecentFirst)
    .slice(0, MAX_ITEMS)

  if (fulfilled.length > 0) {
    cache = { data: items, expiresAt: Date.now() + CACHE_TTL_MS }
  }

  return items
}

newsRouter.get('/', async (req, res) => {
  try {
    const news = await getLatestNews()
    res.json(news)
  } catch {
    res.status(502).json({ error: 'Não foi possível carregar as notícias agora' })
  }
})
