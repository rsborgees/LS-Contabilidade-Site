import { useEffect, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import './Noticias.css'

function formatDate(publishedAt) {
  if (!publishedAt) return null
  return new Date(publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function NewsCard({ item, featured }) {
  const date = formatDate(item.publishedAt)

  return (
    <article className={`noticias__card ${featured ? 'noticias__card--featured' : ''}`}>
      <span className="noticias__source">{item.source}</span>
      <h3 className="noticias__headline">{item.title}</h3>
      <div className="noticias__footer">
        {date && <span className="noticias__date">{date}</span>}
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="noticias__link">
          Ler notícia
        </a>
      </div>
    </article>
  )
}

export function Noticias() {
  usePageTitle('Notícias')
  const [news, setNews] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch('/api/news')
      .then((response) => {
        if (!response.ok) throw new Error('Falha ao buscar notícias')
        return response.json()
      })
      .then((data) => {
        setNews(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const [featuredItem, ...restItems] = news

  return (
    <section className="section noticias">
      <div className="container">
        <SectionHeading
          title="Notícias"
          description="O que está acontecendo no mundo contábil, fiscal e tributário — direto das principais fontes do setor."
        />

        {status === 'loading' && <p className="noticias__status">Carregando notícias...</p>}
        {status === 'error' && (
          <p className="noticias__status">Não foi possível carregar as notícias agora.</p>
        )}
        {status === 'ready' && news.length === 0 && (
          <p className="noticias__status">Nenhuma notícia disponível no momento.</p>
        )}

        {status === 'ready' && news.length > 0 && (
          <div className="noticias__layout">
            <NewsCard item={featuredItem} featured />
            {restItems.length > 0 && (
              <div className="noticias__grid">
                {restItems.map((item) => (
                  <NewsCard item={item} key={item.link} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
