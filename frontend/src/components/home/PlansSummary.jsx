import { Link } from 'react-router-dom'
import { SectionHeading } from '../shared/SectionHeading'
import { PlanCard } from '../shared/PlanCard'
import { PLANS } from '../../data/plans'
import './PlansSummary.css'

export function PlansSummary() {
  return (
    <section className="section section--tight plans-summary">
      <div className="container">
        <SectionHeading
          title="Planos de Assessoria Contábil"
          description="Compare os planos e escolha o que melhor se encaixa no faturamento e nas necessidades da sua empresa."
        />

        <div className="plan-cards">
          {PLANS.map((plan) => (
            <PlanCard plan={plan} key={plan.id}>
              <Link to="/planos" className="plan-card__cta">
                Ver detalhes
              </Link>
            </PlanCard>
          ))}
        </div>

        <div className="plans-summary__footer">
          <Link to="/planos" className="btn btn--primary">
            Ver todos os planos
          </Link>
        </div>
      </div>
    </section>
  )
}
