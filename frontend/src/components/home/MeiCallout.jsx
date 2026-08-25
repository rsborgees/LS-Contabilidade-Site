import { WhatsappButton } from '../shared/WhatsappButton'
import './MeiCallout.css'

export function MeiCallout() {
  return (
    <section className="section section--tight mei">
      <div className="container mei__inner">
        <div>
          <h2 className="mei__title">MEI, temos soluções em contabilidade para você!</h2>
          <p className="mei__text">Uma contabilidade que cabe no seu bolso, sem burocracia.</p>
        </div>
        <WhatsappButton variant="primary" message="Olá! Sou MEI e quero saber mais sobre a contabilidade da LS.">
          Falar com um especialista
        </WhatsappButton>
      </div>
    </section>
  )
}
