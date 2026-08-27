import { useMemo, useState } from 'react'
import './LinkDirectory.css'

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

export function LinkDirectory({ categories, searchPlaceholder, searchLabel }) {
  const [query, setQuery] = useState('')

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return categories

    return categories
      .map((category) => ({
        ...category,
        links: category.links.filter((link) => link.label.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((category) => category.links.length > 0)
  }, [categories, query])

  const totalResults = filteredCategories.reduce((sum, category) => sum + category.links.length, 0)

  return (
    <div className="link-directory">
      <div className="link-directory__search">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={searchLabel}
        />
      </div>

      {query && (
        <p className="link-directory__results-count">
          {totalResults} {totalResults === 1 ? 'link encontrado' : 'links encontrados'}
        </p>
      )}

      {filteredCategories.length === 0 ? (
        <p className="link-directory__empty">Nenhum link encontrado para "{query}".</p>
      ) : (
        <div className="link-directory__columns">
          {filteredCategories.map((category) => (
            <div className="link-directory__category" key={category.category}>
              <h3 className="link-directory__category-title">{category.category}</h3>
              <ul className="link-directory__list">
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
  )
}
