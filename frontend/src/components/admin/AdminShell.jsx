import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo2.png'
import './AdminShell.css'

export function AdminShell() {
  const navigate = useNavigate()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <header className="admin-shell__bar">
        <Link to="/admin" className="admin-shell__brand">
          <img src={logo} alt="LS Contabilidade" className="admin-shell__logo" />
          <span className="admin-shell__label">Painel Administrativo</span>
        </Link>
        <button type="button" className="admin-shell__logout" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <nav className="admin-shell__tabs">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `admin-shell__tab ${isActive ? 'admin-shell__tab--active' : ''}`}
        >
          Blog
        </NavLink>
        <NavLink
          to="/admin/clientes"
          className={({ isActive }) => `admin-shell__tab ${isActive ? 'admin-shell__tab--active' : ''}`}
        >
          Clientes
        </NavLink>
      </nav>

      <main className="admin-shell__content">
        <Outlet />
      </main>
    </div>
  )
}
