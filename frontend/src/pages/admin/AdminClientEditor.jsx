import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'
import './Admin.css'

export function AdminClientEditor() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()
  usePageTitle(isEditing ? 'Editar Cliente' : 'Novo Cliente')

  const [name, setName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [logo, setLogo] = useState(null)
  const [existingLogoUrl, setExistingLogoUrl] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingClient, setIsLoadingClient] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) return

    fetch('/api/clients')
      .then((response) => response.json())
      .then((clients) => {
        const client = clients.find((item) => String(item.id) === id)
        if (client) {
          setName(client.name)
          setWebsiteUrl(client.websiteUrl || '')
          setExistingLogoUrl(client.logoUrl)
        }
      })
      .finally(() => setIsLoadingClient(false))
  }, [id, isEditing])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!isEditing && !logo) {
      setError('Selecione uma imagem de logo.')
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('websiteUrl', websiteUrl)
    if (logo) {
      formData.append('logo', logo)
    }

    try {
      const response = await fetch(isEditing ? `/api/clients/${id}` : '/api/clients', {
        method: isEditing ? 'PUT' : 'POST',
        body: formData,
      })

      if (!response.ok) {
        setError('Não foi possível salvar o cliente.')
        return
      }

      navigate('/admin/clientes')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingClient) {
    return (
      <div className="admin-editor__container">
        <p className="admin-dashboard__status">Carregando cliente...</p>
      </div>
    )
  }

  return (
    <div className="admin-editor__container">
      <div className="admin-dashboard__header">
        <h1 className="admin-editor__title">{isEditing ? 'Editar cliente' : 'Novo cliente'}</h1>
        <Link to="/admin/clientes" className="admin-editor__cancel">
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
          <span>Nome do cliente</span>
          <input type="text" required value={name} onChange={(event) => setName(event.target.value)} />
        </label>

        <label className="admin-editor__field">
          <span>Link do site (opcional)</span>
          <input
            type="url"
            placeholder="https://www.sitedocliente.com.br"
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
          />
        </label>

        <label className="admin-editor__field">
          <span>Logo {isEditing && '(deixe em branco para manter a atual)'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setLogo(event.target.files[0] || null)}
          />
          {existingLogoUrl && !logo && (
            <img src={existingLogoUrl} alt="Logo atual" className="admin-editor__current-cover" />
          )}
        </label>

        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar cliente'}
        </button>
      </form>
    </div>
  )
}
