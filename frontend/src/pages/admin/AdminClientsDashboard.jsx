import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'
import './Admin.css'

export function AdminClientsDashboard() {
  usePageTitle('Painel de Clientes')
  const [clients, setClients] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    loadClients()
  }, [])

  function loadClients() {
    setStatus('loading')
    fetch('/api/clients')
      .then((response) => {
        if (!response.ok) throw new Error('Falha ao buscar clientes')
        return response.json()
      })
      .then((data) => {
        setClients([...data].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  async function handleDelete(id) {
    if (!window.confirm('Excluir esse cliente? Essa ação não pode ser desfeita.')) return
    await fetch(`/api/clients/${id}`, { method: 'DELETE' })
    loadClients()
  }

  return (
    <div className="admin-dashboard__container">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Clientes</h1>
        <Link to="/admin/clientes/novo" className="btn btn--primary">
          Novo cliente
        </Link>
      </div>

      {status === 'loading' && <p className="admin-dashboard__status">Carregando clientes...</p>}

      {status === 'error' && (
        <div className="admin-dashboard__status admin-dashboard__status--error">
          <p>Não foi possível carregar os clientes agora.</p>
          <button type="button" className="admin-dashboard__retry" onClick={loadClients}>
            Tentar de novo
          </button>
        </div>
      )}

      {status === 'ready' && clients.length === 0 && (
        <p className="admin-dashboard__status">
          Nenhum cliente ainda. Clique em "Novo cliente" pra cadastrar o primeiro.
        </p>
      )}

      {status === 'ready' && clients.length > 0 && (
        <ul className="admin-dashboard__list">
          {clients.map((client) => (
            <li key={client.id} className="admin-dashboard__item">
              <img src={client.logoUrl} alt="" className="admin-dashboard__item-logo" />
              <span className="admin-dashboard__item-title">{client.name}</span>
              <div className="admin-dashboard__actions">
                <Link to={`/admin/clientes/${client.id}/editar`} className="admin-dashboard__edit">
                  Editar
                </Link>
                <button
                  type="button"
                  className="admin-dashboard__delete"
                  onClick={() => handleDelete(client.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
