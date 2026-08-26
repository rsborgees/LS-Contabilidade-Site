import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { usePageTitle } from '../../hooks/usePageTitle'
import './Admin.css'

export function AdminPostEditor() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  usePageTitle(isEditing ? 'Editar Post' : 'Novo Post')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [existingCoverUrl, setExistingCoverUrl] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) return

    fetch(`/api/posts/${id}`)
      .then((response) => response.json())
      .then((post) => {
        setTitle(post.title)
        setContent(post.content)
        setExistingCoverUrl(post.coverImageUrl)
      })
      .finally(() => setIsLoadingPost(false))
  }, [id, isEditing])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (coverImage) {
      formData.append('coverImage', coverImage)
    }

    try {
      const response = await fetch(isEditing ? `/api/posts/${id}` : '/api/posts', {
        method: isEditing ? 'PUT' : 'POST',
        body: formData,
      })

      if (!response.ok) {
        setError('Não foi possível salvar o post.')
        return
      }

      navigate('/admin')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingPost) {
    return (
      <div className="admin-editor__container">
        <p className="admin-dashboard__status">Carregando post...</p>
      </div>
    )
  }

  return (
    <div className="admin-editor__container">
      <div className="admin-dashboard__header">
        <h1 className="admin-editor__title">{isEditing ? 'Editar post' : 'Novo post'}</h1>
        <Link to="/admin" className="admin-editor__cancel">
          Cancelar
        </Link>
      </div>

      <form className="admin-editor__form" onSubmit={handleSubmit}>
        {error && (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        )}

        <label className="admin-editor__field">
          <span>Título</span>
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="admin-editor__field">
          <span>Imagem de capa {isEditing && '(deixe em branco para manter a atual)'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setCoverImage(event.target.files[0] || null)}
          />
          {existingCoverUrl && !coverImage && (
            <img src={existingCoverUrl} alt="Capa atual" className="admin-editor__current-cover" />
          )}
        </label>

        <div className="admin-editor__split">
          <label className="admin-editor__field">
            <span>Conteúdo (Markdown)</span>
            <textarea
              rows={16}
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>

          <div className="admin-editor__preview">
            <span className="admin-editor__preview-label">Prévia</span>
            <div
              className="admin-editor__preview-content"
              dangerouslySetInnerHTML={{ __html: marked.parse(content || '') }}
            />
          </div>
        </div>

        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar post'}
        </button>
      </form>
    </div>
  )
}
