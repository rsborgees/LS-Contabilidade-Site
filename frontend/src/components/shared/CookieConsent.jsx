import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsent.css'

const STORAGE_KEY = 'ls-cookie-consent'

function readStoredConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeConsent() {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'accepted')
  } catch {
    // Sem acesso ao localStorage (modo privado, etc.) — apenas fecha o aviso nesta sessão.
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(readStoredConsent() !== 'accepted')
  }, [])

  if (!isVisible) return null

  function handleAccept() {
    storeConsent()
    setIsVisible(false)
  }

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p className="cookie-consent__text">
        Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento do site.
        Consulte nossa{' '}
        <Link to="/politica-de-privacidade" className="cookie-consent__link">
          Política de Privacidade
        </Link>{' '}
        para saber mais.
      </p>
      <button type="button" className="btn btn--primary cookie-consent__accept" onClick={handleAccept}>
        Aceitar
      </button>
    </div>
  )
}
