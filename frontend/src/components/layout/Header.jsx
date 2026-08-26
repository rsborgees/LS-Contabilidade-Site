import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { NAV_LINKS } from '../../data/nav'
import { buildWhatsappUrl } from '../../lib/constants'
import './Header.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)

  function closeMenu() {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div className="container header__bar">
        <NavLink to="/" className="header__brand" onClick={closeMenu}>
          <img src={logo} alt="LS Contabilidade" className="header__logo" />
        </NavLink>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`} ref={navRef}>
          <ul className="header__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="header__nav-item">
                <div className="header__nav-link-wrap">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>

                  {link.children && (
                    <button
                      type="button"
                      className={`header__dropdown-toggle ${
                        openDropdown === link.label ? 'header__dropdown-toggle--open' : ''
                      }`}
                      aria-label={`Mostrar submenu de ${link.label}`}
                      aria-expanded={openDropdown === link.label}
                      onClick={() =>
                        setOpenDropdown((current) => (current === link.label ? null : link.label))
                      }
                    >
                      <svg viewBox="0 0 12 8" width="10" height="7" aria-hidden="true">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </button>
                  )}
                </div>

                {link.children && (
                  <ul
                    className={`header__dropdown ${
                      openDropdown === link.label ? 'header__dropdown--open' : ''
                    }`}
                  >
                    {link.children.map((child) => (
                      <li key={child.to}>
                        <NavLink to={child.to} className="header__dropdown-link" onClick={closeMenu}>
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
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
