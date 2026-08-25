import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { ContactForm } from '../components/contact/ContactForm'
import { ADDRESS_LINES, EMAIL, MAPS_EMBED_SRC, PHONE_DISPLAY, buildWhatsappUrl } from '../lib/constants'
import './Contato.css'

export function Contato() {
  usePageTitle('Fale Conosco')

  return (
    <section className="section contato">
      <div className="container">
        <SectionHeading
          title="Vamos conversar sobre a contabilidade da sua empresa"
          description="Atendimento presencial em Salvador e em toda a Bahia. Atendimento digital para todo o Brasil."
        />

        <div className="contato__grid">
          <ContactForm />

          <div className="contato__info">
            <div className="contato__info-block">
              <h3>WhatsApp / Telefone</h3>
              <a href={buildWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="contato__info-block">
              <h3>E-mail</h3>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>

            <div className="contato__info-block">
              <h3>Endereço</h3>
              <address>
                {ADDRESS_LINES.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="contato__map">
              <iframe
                title="Localização da LS Contabilidade"
                src={MAPS_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
