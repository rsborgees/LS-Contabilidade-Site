import { usePageTitle } from '../hooks/usePageTitle'
import { ContactForm } from '../components/contact/ContactForm'
import { AUDIENCE_PAGES } from '../data/audiencePages'
import './LeadPage.css'

export function AudienceLeadPage({ slug }) {
  const page = AUDIENCE_PAGES[slug]
  usePageTitle(page.navLabel)

  return (
    <>
      <section className="lead-hero">
        <div className="container lead-hero__inner">
          <h1 className="lead-hero__title">{page.heading}</h1>
          <p className="lead-hero__text">{page.intro}</p>

          <ul className="lead-hero__checklist">
            {page.checklist.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✅</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="lead-hero__text lead-hero__text--closing">{page.closingLine}</p>

          <a href="#lead-form" className="btn btn--primary lead-hero__cta">
            {page.ctaLabel}
          </a>
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
