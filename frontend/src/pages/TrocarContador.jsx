import contadorImage from '../assets/page-contador.png'
import { usePageTitle } from '../hooks/usePageTitle'
import { ContactForm } from '../components/contact/ContactForm'
import './LeadPage.css'

export function TrocarContador() {
  usePageTitle('Troca de Contador')

  return (
    <>
      <section className="lead-hero">
        <div className="container lead-hero__inner lead-hero__inner--split">
          <div>
            <h1 className="lead-hero__title">
              Fazer a troca da sua contabilidade atual para a LS Contabilidade nunca foi tão fácil
            </h1>
            <p className="lead-hero__text">
              Você não precisa se preocupar com absolutamente nada. Esse é um trâmite 100% feito
              entre contadores, e todo o nosso time fica responsável por fazer essa mudança.
            </p>
            <a href="#lead-form" className="btn btn--primary lead-hero__cta">
              Quero trocar de contador
            </a>
          </div>

          <img
            src={contadorImage}
            alt="Aperto de mãos representando a transição entre contadores"
            className="lead-hero__image"
          />
        </div>
      </section>

      <section className="section lead-form-section" id="lead-form">
        <div className="container lead-form-section__inner">
          <h2 className="lead-form-section__title">Deixe seus dados que a gente entra em contato</h2>
          <ContactForm defaultSubject="Troca de contador" />
        </div>
      </section>
    </>
  )
}
