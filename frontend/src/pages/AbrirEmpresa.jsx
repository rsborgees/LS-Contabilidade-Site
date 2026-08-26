import { usePageTitle } from '../hooks/usePageTitle'
import { ContactForm } from '../components/contact/ContactForm'
import './LeadPage.css'

export function AbrirEmpresa() {
  usePageTitle('Abertura de Empresa')

  return (
    <>
      <section className="lead-hero">
        <div className="container lead-hero__inner">
          <h1 className="lead-hero__title">Abertura de empresa em todo Brasil</h1>
          <p className="lead-hero__text">
            Aqui na LS Contabilidade e Legalização de Empresas, abrimos empresa em todo estado da
            Bahia em até 24hs. Nos demais estados, olhamos cada caso de forma isolada. Conte com
            a expertise da nossa equipe e abra já a sua empresa sem burocracia.
          </p>
          <a href="#lead-form" className="btn btn--primary lead-hero__cta">
            Quero abrir minha empresa
          </a>
        </div>
      </section>

      <section className="section lead-form-section" id="lead-form">
        <div className="container lead-form-section__inner">
          <h2 className="lead-form-section__title">Deixe seus dados que a gente entra em contato</h2>
          <ContactForm defaultSubject="Abertura de empresa" />
        </div>
      </section>
    </>
  )
}
