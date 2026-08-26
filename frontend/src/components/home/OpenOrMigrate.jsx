import { Link } from 'react-router-dom'
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
            <Link to="/abrir-empresa" className="btn btn--primary">
              Quero abrir minha empresa
            </Link>
          </div>

          <div className="open-migrate__card">
            <h3 className="open-migrate__card-title">Migrar sua contabilidade</h3>
            <p className="open-migrate__card-text">
              Já tem contador? Migramos a contabilidade da sua empresa para a LS com economia e
              melhor planejamento financeiro.
            </p>
            <Link to="/trocar-contador" className="btn btn--primary">
              Quero migrar minha contabilidade
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
