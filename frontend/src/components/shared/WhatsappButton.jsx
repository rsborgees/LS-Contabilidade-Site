import { buildWhatsappUrl } from '../../lib/constants'

export function WhatsappButton({ message, variant = 'primary', children }) {
  return (
    <a
      className={`btn btn--${variant}`}
      href={buildWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children ?? 'Falar no WhatsApp'}
    </a>
  )
}
