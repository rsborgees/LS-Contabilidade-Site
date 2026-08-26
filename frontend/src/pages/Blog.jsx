import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import './Blog.css'

export function Blog() {
  usePageTitle('Blog')
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
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
  }, [])

  return (
    <section className="section blog">
      <div className="container">
        <h1 className="blog__title">Blog</h1>
        <p className="blog__intro">
          Novidades e conteúdo sobre contabilidade, fiscal e gestão.
        </p>

        {status === 'loading' && <p className="blog__status">Carregando posts...</p>}
        {status === 'error' && (
          <p className="blog__status">Não foi possível carregar os posts agora.</p>
        )}
        {status === 'ready' && posts.length === 0 && (
          <p className="blog__status">Ainda não há posts publicados.</p>
        )}

        <div className="blog__grid">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} className="blog__card" key={post.slug}>
              {post.coverImageUrl && (
                <img src={post.coverImageUrl} alt={post.title} className="blog__card-image" />
              )}
              <h2 className="blog__card-title">{post.title}</h2>
              <span className="blog__card-date">
                {new Date(post.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
