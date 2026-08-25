import { Link } from 'react-router-dom'
import { SectionHeading } from '../shared/SectionHeading'
import {
  ADDRESS_LINES,
  EMAIL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  PHONE_DISPLAY,
  STREET_VIEW_EMBED_SRC,
  buildWhatsappUrl,
} from '../../lib/constants'
import './ContactCallout.css'

export function ContactCallout() {
  return (
    <section className="section section--generous contact-callout" id="contato">
      <div className="container contact-callout__grid">
        <div className="contact-callout__info">
          <SectionHeading title="Estamos em Salvador, prontos para te atender" align="left" />

          <ul className="contact-callout__list">
            <li>
              <strong>WhatsApp:</strong>{' '}
              <a href={buildWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <strong>E-mail:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <strong>Endereço:</strong>{' '}
              <address className="contact-callout__address">
                {ADDRESS_LINES.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
          </ul>

          <Link to="/contato" className="btn btn--primary">
            Falar Conosco
          </Link>
        </div>

        <div className="contact-callout__map">
          <iframe
            title="Street View da fachada da LS Contabilidade"
            src={STREET_VIEW_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="contact-callout__map-link"
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Como chegar no Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
