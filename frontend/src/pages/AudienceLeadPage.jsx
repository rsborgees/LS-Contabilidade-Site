import { usePageTitle } from '../hooks/usePageTitle'
import { ContactForm } from '../components/contact/ContactForm'
import { WhatsappButton } from '../components/shared/WhatsappButton'
import { AUDIENCE_PAGES } from '../data/audiencePages'
import './LeadPage.css'

export function AudienceLeadPage({ slug }) {
  const page = AUDIENCE_PAGES[slug]
  usePageTitle(page.navLabel)

  const content = (
    <>
      <h1 className="lead-hero__title">{page.heading}</h1>

      {page.paragraphs?.map((paragraph) => (
        <p className="lead-hero__text" key={paragraph}>
          {paragraph}
        </p>
      ))}

      {page.checklist && (
        <ul className="lead-hero__checklist">
          {page.checklist.map((item) => (
            <li key={item}>
              <span className="lead-hero__check-icon" aria-hidden="true">
                <svg viewBox="0 0 14 11" width="12" height="9">
                  <path
                    d="M1 5.5L5 9.5L13 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {page.closingLine && (
        <p className="lead-hero__text lead-hero__text--closing">{page.closingLine}</p>
      )}

      <div className="lead-hero__actions">
        <a href="#lead-form" className="btn btn--primary lead-hero__cta">
          {page.ctaLabel}
        </a>
        {page.showWhatsapp && (
          <WhatsappButton
            variant="outline-on-dark"
            message={`Olá! Quero saber mais sobre a contabilidade para ${page.navLabel.toLowerCase()}.`}
          >
            Falar no WhatsApp
          </WhatsappButton>
        )}
      </div>
    </>
  )

  return (
    <>
      <section className="lead-hero">
        <div
          className={`container lead-hero__inner ${page.image ? 'lead-hero__inner--split' : ''}`}
        >
          <div>{content}</div>

          {page.image && (
            <img src={page.image} alt={page.navLabel} className="lead-hero__image" />
          )}
        </div>
      </section>

      <section className="section lead-form-section" id="lead-form">
        <div className="container lead-form-section__inner">
          <h2 className="lead-form-section__title">Deixe seus dados que a gente entra em contato</h2>
          <ContactForm defaultSubject={page.navLabel} />
        </div>
      </section>
    </>
  )
}
