import { useState } from 'react'
import { buildWhatsappUrl } from '../../lib/constants'
import { WhatsappIcon } from './WhatsappIcon'
import './WhatsappWidget.css'

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function AvatarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.5" fill="#c3c9cf" />
      <path d="M4.5 20c1.4-4 4.4-6.3 7.5-6.3s6.1 2.3 7.5 6.3" fill="#c3c9cf" />
    </svg>
  )
}

export function WhatsappWidget() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="whatsapp-widget">
      {isOpen && (
        <div className="whatsapp-widget__card">
          <div className="whatsapp-widget__header">
            <p className="whatsapp-widget__greeting">Olá!</p>
            <p className="whatsapp-widget__subtitle">Escolha alguém do nosso time para conversar.</p>
          </div>

          <div className="whatsapp-widget__contact">
            <div className="whatsapp-widget__avatar">
              <AvatarIcon />
            </div>
            <div className="whatsapp-widget__contact-info">
              <span className="whatsapp-widget__contact-name">Lucas Silva</span>
              <span className="whatsapp-widget__contact-role">Atendimento Comercial</span>
            </div>
          </div>

          <a
            className="whatsapp-widget__chat-link"
            href={buildWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon size={18} />
            WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        className={`whatsapp-widget__toggle ${isOpen ? 'whatsapp-widget__toggle--close' : ''}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Fechar conversa no WhatsApp' : 'Abrir conversa no WhatsApp'}
      >
        {isOpen ? (
          <>
            <CloseIcon />
            Fechar
          </>
        ) : (
          <WhatsappIcon size={28} />
        )}
      </button>
    </div>
  )
}
