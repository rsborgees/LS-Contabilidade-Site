import { Link } from 'react-router-dom'
import { SectionHeading } from '../shared/SectionHeading'
import { SERVICE_CATEGORIES } from '../../data/services'
import './ServicesSummary.css'

export function ServicesSummary() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading
          title="Serviços completos para a sua empresa"
          description="Da abertura à gestão do dia a dia, cuidamos da parte contábil para você focar no seu negócio."
        />

        <div className="services-summary__grid">
          {SERVICE_CATEGORIES.map((category) => (
            <div className="services-summary__card" key={category.slug}>
              <h3 className="services-summary__title">{category.title}</h3>
              <p className="services-summary__description">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="services-summary__cta">
          <Link to="/servicos" className="btn btn--primary">
            Ver todos os serviços
          </Link>
        </div>
      </div>
    </section>
  )
}
