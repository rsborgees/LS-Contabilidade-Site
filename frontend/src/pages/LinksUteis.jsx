import { useMemo, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { USEFUL_LINK_CATEGORIES } from '../data/usefulLinks'
import './LinksUteis.css'

function ExternalIcon() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
      <path
        d="M4 2h6v6M10 2L2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function LinksUteis() {
  usePageTitle('Links Úteis')
  const [query, setQuery] = useState('')

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return USEFUL_LINK_CATEGORIES

    return USEFUL_LINK_CATEGORIES.map((category) => ({
      ...category,
      links: category.links.filter((link) => link.label.toLowerCase().includes(normalizedQuery)),
    })).filter((category) => category.links.length > 0)
  }, [query])

  const totalResults = filteredCategories.reduce((sum, category) => sum + category.links.length, 0)

  return (
    <section className="section links-uteis">
      <div className="container">
        <SectionHeading
          title="Links Úteis"
          description="Um atalho pros principais sistemas, portais de órgãos públicos e ferramentas que usamos no dia a dia da contabilidade."
        />

        <div className="links-uteis__search">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Buscar um link (ex: eSocial, SEFAZ, DECORE...)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar link útil"
          />
        </div>

        {query && (
          <p className="links-uteis__results-count">
            {totalResults} {totalResults === 1 ? 'link encontrado' : 'links encontrados'}
          </p>
        )}

        {filteredCategories.length === 0 ? (
          <p className="links-uteis__empty">Nenhum link encontrado para "{query}".</p>
        ) : (
          <div className="links-uteis__columns">
            {filteredCategories.map((category) => (
              <div className="links-uteis__category" key={category.category}>
                <h3 className="links-uteis__category-title">{category.category}</h3>
                <ul className="links-uteis__list">
                  {category.links.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <span>{link.label}</span>
                        <ExternalIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
