import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { PlanCard } from '../components/shared/PlanCard'
import { ContactForm } from '../components/contact/ContactForm'
import { PLANS, PLAN_FEATURES } from '../data/plans'
import './Planos.css'

function FeatureIcon({ included }) {
  if (included) {
    return (
      <svg viewBox="0 0 14 11" width="13" height="10" aria-hidden="true">
        <path
          d="M1 5.5L5 9.5L13 1.5"
          stroke="var(--color-brand-dark)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="#9aa1a9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Planos() {
  usePageTitle('Planos de Assessoria Contábil')
  const [selectedPlan, setSelectedPlan] = useState('')

  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Planos de Assessoria Contábil"
            description="Compare os planos e escolha o que melhor se encaixa no faturamento e nas necessidades da sua empresa."
          />

          <div className="plan-cards">
            {PLANS.map((plan) => (
              <PlanCard plan={plan} key={plan.id}>
                <a
                  href="#lead-form"
                  className="plan-card__cta"
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  Quero esse!
                </a>

                <ul className="plan-card__features">
                  {PLAN_FEATURES.map((feature, index) => {
                    const included = index < plan.includedCount
                    return (
                      <li className={included ? 'is-included' : 'is-excluded'} key={feature}>
                        <FeatureIcon included={included} />
                        {feature}
                      </li>
                    )
                  })}
                </ul>

                <a
                  href="#lead-form"
                  className="plan-card__cta"
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  Quero esse!
                </a>
              </PlanCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="lead-form">
        <div className="container plans-form__inner">
          <SectionHeading title="Deixe seus dados que a gente entra em contato" />
          <ContactForm
            defaultSubject="Planos de Assessoria Contábil"
            planOptions={PLANS.map((plan) => plan.name)}
            initialPlan={selectedPlan}
          />
        </div>
      </section>
    </>
  )
}
