import { BENEFITS } from '../../data/benefits'
import './Benefits.css'

export function Benefits() {
  return (
    <section className="section section--tight benefits">
      <div className="container benefits__grid">
        <div className="benefits__intro">
          <h2 className="benefits__title">Por que contratar a LS Contabilidade</h2>
          <p className="benefits__description">
            Muito além de fechar a folha no fim do mês: um time que acompanha a saúde
            financeira da sua empresa de perto.
          </p>
        </div>

        <ul className="benefits__list">
          {BENEFITS.map((benefit) => (
            <li className="benefits__item" key={benefit}>
              <span className="benefits__icon" aria-hidden="true">
                ✓
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
