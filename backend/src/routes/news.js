import { Router } from 'express'
import * as cheerio from 'cheerio'

export const newsRouter = Router()

const LEGISWEB_SOURCE = 'LegisWeb'

const LEGISWEB_CATEGORIES = [
  { id: 1, label: 'IR / Contribuições' },
  { id: 2, label: 'ICMS, IPI, ISS e Outros' },
  { id: 3, label: 'Trabalho / Previdência' },
  { id: 4, label: 'Contabilidade / Societário' },
  { id: 5, label: 'Simples Nacional' },
  { id: 6, label: 'Comércio Exterior' },
]

const ITEMS_PER_CATEGORY = 5

const PT_MONTHS = {
  jan: 0,
  fev: 1,
  mar: 2,
  abr: 3,
  mai: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  set: 8,
  out: 9,
  nov: 10,
  dez: 11,
}

const CACHE_TTL_MS = 30 * 60 * 1000

let cache = { data: null, expiresAt: 0 }

export function resetNewsCache() {
  cache = { data: null, expiresAt: 0 }
}

function byMostRecentFirst(a, b) {
  if (!a.publishedAt) return 1
  if (!b.publishedAt) return -1
  return new Date(b.publishedAt) - new Date(a.publishedAt)
}

function parseLegisWebDate(datePart) {
  const match = datePart?.trim().match(/(\d{1,2})\s+([a-zç]{3})\s+(\d{4})/i)
  if (!match) return null

  const month = PT_MONTHS[match[2].toLowerCase()]
  if (month === undefined) return null

  return new Date(Number(match[3]), month, Number(match[1])).toISOString()
}

async function fetchLegisWebCategory(category) {
  const url = `https://www.legisweb.com.br/noticias/?termo=&assunto=${category.id}&acao=Buscar`
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!response.ok) {
    throw new Error(`LegisWeb respondeu ${response.status}`)
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const items = []
  $('h4.result-titulo').each((_, el) => {
    const titleLink = $(el).find('a').first()
    const title = titleLink.text().trim()
    const href = titleLink.attr('href')
    const [datePart] = $(el).parent().find('p.result-datado a').first().text().trim().split(' - ')

    if (title && href) {
      items.push({
        title,
        link: new URL(href, 'https://www.legisweb.com.br/noticias/').toString(),
        source: LEGISWEB_SOURCE,
        publishedAt: parseLegisWebDate(datePart),
        category: category.label,
      })
    }
  })

  return items.sort(byMostRecentFirst).slice(0, ITEMS_PER_CATEGORY)
}

export async function getLatestNews() {
  if (cache.data && cache.expiresAt > Date.now()) {
    return cache.data
  }

  const results = await Promise.allSettled(
    LEGISWEB_CATEGORIES.map((category) => fetchLegisWebCategory(category)),
  )
  const fulfilled = results.filter((result) => result.status === 'fulfilled')

  if (fulfilled.length === 0) {
    throw new Error('Não foi possível buscar nenhuma categoria do LegisWeb')
  }

  const items = fulfilled.flatMap((result) => result.value).sort(byMostRecentFirst)

  cache = { data: items, expiresAt: Date.now() + CACHE_TTL_MS }

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
