import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoIcon from '../../assets/logo-icon.png'
import { usePageTitle } from '../../hooks/usePageTitle'
import './Admin.css'

export function AdminLogin() {
  usePageTitle('Login do Admin')
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        setError('E-mail ou senha inválidos.')
        return
      }

      navigate('/admin')
    } catch {
      setError('Não foi possível entrar agora. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="admin-login">
      <div className="admin-login__container">
        <img src={logoIcon} alt="LS Contabilidade" className="admin-login__logo-icon" />
        <h1 className="admin-login__title">Entrar no painel</h1>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          {error && (
            <p className="admin-login__error" role="alert">
              {error}
            </p>
          )}

          <label className="admin-login__field">
            <span>E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="admin-login__field">
            <span>Senha</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  )
}
