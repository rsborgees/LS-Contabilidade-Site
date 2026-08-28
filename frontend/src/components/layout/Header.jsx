import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo2.png'
import { NAV_LINKS } from '../../data/nav'
import './Header.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()

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
      <div className="header__bar">
        <NavLink to="/" className="header__brand" onClick={closeMenu}>
          <img src={logo} alt="LS Contabilidade" className="header__logo" />
        </NavLink>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`} ref={navRef}>
          <ul className="header__nav-list">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                const isChildActive = link.children.some((child) => child.to === location.pathname)
                const isOpen = openDropdown === link.label

                return (
                  <li key={link.label} className="header__nav-item">
                    <button
                      type="button"
                      className={`header__nav-link header__nav-link--button ${
                        isChildActive ? 'header__nav-link--active' : ''
                      }`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown((current) => (current === link.label ? null : link.label))}
                    >
                      {link.label}
                      <svg
                        className={`header__dropdown-chevron ${isOpen ? 'header__dropdown-chevron--open' : ''}`}
                        viewBox="0 0 12 8"
                        width="10"
                        height="7"
                        aria-hidden="true"
                      >
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </button>

                    <ul className={`header__dropdown ${isOpen ? 'header__dropdown--open' : ''}`}>
                      {link.children.map((child) => (
                        <li key={child.to}>
                          <NavLink to={child.to} className="header__dropdown-link" onClick={closeMenu}>
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }

              return (
                <li key={link.to} className="header__nav-item">
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
              )
            })}
          </ul>
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
