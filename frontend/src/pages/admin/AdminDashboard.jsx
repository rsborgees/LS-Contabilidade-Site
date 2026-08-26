import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'
import './Admin.css'

export function AdminDashboard() {
  usePageTitle('Painel do Blog')
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    loadPosts()
  }, [])

  function loadPosts() {
    setStatus('loading')
    fetch('/api/posts')
      .then((response) => {
        if (!response.ok) throw new Error('Falha ao buscar posts')
        return response.json()
      })
      .then((data) => {
        setPosts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  async function handleDelete(id) {
    if (!window.confirm('Excluir esse post? Essa ação não pode ser desfeita.')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    loadPosts()
  }

  return (
    <div className="admin-dashboard__container">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Posts</h1>
        <Link to="/admin/posts/novo" className="btn btn--primary">
          Novo post
        </Link>
      </div>

      {status === 'loading' && <p className="admin-dashboard__status">Carregando posts...</p>}

      {status === 'error' && (
        <div className="admin-dashboard__status admin-dashboard__status--error">
          <p>Não foi possível carregar os posts agora.</p>
          <button type="button" className="admin-dashboard__retry" onClick={loadPosts}>
            Tentar de novo
          </button>
        </div>
      )}

      {status === 'ready' && posts.length === 0 && (
        <p className="admin-dashboard__status">
          Nenhum post ainda. Clique em "Novo post" pra criar o primeiro.
        </p>
      )}

      {status === 'ready' && posts.length > 0 && (
        <ul className="admin-dashboard__list">
          {posts.map((post) => (
            <li key={post.id} className="admin-dashboard__item">
              <span className="admin-dashboard__item-title">{post.title}</span>
              <div className="admin-dashboard__actions">
                <Link to={`/admin/posts/${post.id}/editar`} className="admin-dashboard__edit">
                  Editar
                </Link>
                <button
                  type="button"
                  className="admin-dashboard__delete"
                  onClick={() => handleDelete(post.id)}
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
