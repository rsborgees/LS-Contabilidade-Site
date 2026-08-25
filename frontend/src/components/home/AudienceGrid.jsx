import { SectionHeading } from '../shared/SectionHeading'
import { AUDIENCES } from '../../data/audiences'
import './AudienceGrid.css'

export function AudienceGrid() {
  return (
    <section className="section section--tight section--alt">
      <div className="container">
        <SectionHeading
          title="Feito para empresas e profissionais de todos os tipos"
          description="Não importa a sua área, temos uma solução contábil sob medida para o seu negócio."
        />

        <ul className="audience-grid">
          {AUDIENCES.map((audience) => (
            <li className="audience-grid__tag" key={audience}>
              {audience}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
