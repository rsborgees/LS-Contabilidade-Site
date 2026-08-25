import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { NAV_LINKS } from '../../data/nav'
import { buildWhatsappUrl } from '../../lib/constants'
import './Header.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header__bar">
        <NavLink to="/" className="header__brand" onClick={closeMenu}>
          <img src={logo} alt="LS Contabilidade" className="header__logo" />
        </NavLink>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary header__nav-cta"
            href={buildWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Fale no WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
