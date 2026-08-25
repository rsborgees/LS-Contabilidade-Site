import { WhatsappButton } from '../shared/WhatsappButton'
import { SectionHeading } from '../shared/SectionHeading'
import './OpenOrMigrate.css'

export function OpenOrMigrate() {
  return (
    <section className="section section--tight open-migrate">
      <div className="container">
        <SectionHeading title="Abrir uma empresa ou migrar sua contabilidade" />

        <div className="open-migrate__grid">
          <div className="open-migrate__card">
            <h3 className="open-migrate__card-title">Abrir uma empresa</h3>
            <p className="open-migrate__card-text">
              Cuidamos de todo o processo de abertura da sua empresa de forma rápida e fácil,
              para você focar no que realmente importa: o seu negócio.
            </p>
            <WhatsappButton
              variant="outline"
              message="Olá! Quero abrir uma empresa com a LS Contabilidade."
            >
              Quero abrir minha empresa
            </WhatsappButton>
          </div>

          <div className="open-migrate__card">
            <h3 className="open-migrate__card-title">Migrar sua contabilidade</h3>
            <p className="open-migrate__card-text">
              Já tem contador? Migramos a contabilidade da sua empresa para a LS com economia e
              melhor planejamento financeiro.
            </p>
            <WhatsappButton
              variant="outline"
              message="Olá! Quero migrar a contabilidade da minha empresa para a LS Contabilidade."
            >
              Quero migrar minha contabilidade
            </WhatsappButton>
          </div>
        </div>
      </div>
    </section>
  )
}
