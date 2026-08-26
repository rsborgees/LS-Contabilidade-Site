import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { usePageTitle } from '../hooks/usePageTitle'
import './BlogPost.css'

export function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')

  usePageTitle(post ? post.title : 'Blog')

  useEffect(() => {
    setStatus('loading')
    fetch(`/api/posts/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error('Post não encontrado')
        return response.json()
      })
      .then((data) => {
        setPost(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [slug])

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container">
          <p className="blog-post__status">Carregando...</p>
        </div>
      </section>
    )
  }

  if (status === 'error' || !post) {
    return (
      <section className="section">
        <div className="container">
          <p className="blog-post__status">Não encontramos esse post.</p>
          <Link to="/blog" className="btn btn--primary">
            Voltar pro blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section blog-post">
      <div className="container blog-post__container">
        {post.coverImageUrl && (
          <img src={post.coverImageUrl} alt={post.title} className="blog-post__cover" />
        )}
        <h1 className="blog-post__title">{post.title}</h1>
        <span className="blog-post__date">
          {new Date(post.createdAt).toLocaleDateString('pt-BR')}
        </span>
        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        />
      </div>
    </section>
  )
}
