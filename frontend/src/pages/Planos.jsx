import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { ContactForm } from '../components/contact/ContactForm'
import { PLANS, PLAN_FEATURES } from '../data/plans'
import './Planos.css'

function CheckIcon() {
  return (
    <svg className="plans-table__check" viewBox="0 0 14 11" width="14" height="11" aria-hidden="true">
      <path
        d="M1 5.5L5 9.5L13 1.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function Planos() {
  usePageTitle('Planos de Assessoria Contábil')

  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Planos de Assessoria Contábil"
            description="Compare os planos e escolha o que melhor se encaixa no faturamento e nas necessidades da sua empresa."
          />

          <div className="plans-table-wrap">
            <table className="plans-table">
              <thead>
                <tr>
                  <th scope="col" className="plans-table__service-col">
                    Serviço
                  </th>
                  {PLANS.map((plan) => (
                    <th scope="col" key={plan.id}>
                      <span className="plans-table__dot" style={{ background: plan.color }} />
                      {plan.name}
                      <span className="plans-table__range">{plan.revenueRange}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_FEATURES.map((feature, index) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    {PLANS.map((plan) => (
                      <td key={plan.id}>
                        {index < plan.includedCount ? (
                          <CheckIcon />
                        ) : (
                          <span className="plans-table__dash" aria-hidden="true">
                            —
                          </span>
                        )}
                        <span className="plans-table__sr-only">
                          {index < plan.includedCount ? 'Incluso' : 'Não incluso'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="plans-cta">
            <a href="#lead-form" className="btn btn--primary">
              Contratar um plano
            </a>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="lead-form">
        <div className="container plans-form__inner">
          <SectionHeading title="Deixe seus dados que a gente entra em contato" />
          <ContactForm
            defaultSubject="Planos de Assessoria Contábil"
            planOptions={PLANS.map((plan) => plan.name)}
          />
        </div>
      </section>
    </>
  )
}
