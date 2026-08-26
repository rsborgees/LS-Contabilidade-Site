import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { ContactForm } from '../components/contact/ContactForm'
import { PLANS, PLAN_FEATURES } from '../data/plans'
import './Planos.css'

const PLAN_ICONS = {
  light: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path d="M5 12.5L10 17.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  essencial: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M4.5 20c1.4-3.8 4.4-6 7.5-6s6.1 2.2 7.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  consultiva: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path
        d="M12 3l2.1 5.6L20 10l-5.9 1.6L12 17l-2.1-5.4L4 10l5.9-1.4L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  ),
}

function FeatureIcon({ included, color }) {
  if (included) {
    return (
      <svg viewBox="0 0 14 11" width="13" height="10" aria-hidden="true">
        <path
          d="M1 5.5L5 9.5L13 1.5"
          stroke={color}
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
              <div
                className="plan-card"
                style={{ '--plan-color': plan.color, '--plan-text-color': plan.textColor }}
                key={plan.id}
              >
                <div className="plan-card__icon">{PLAN_ICONS[plan.id]}</div>
                <h3 className="plan-card__name">{plan.name}</h3>
                <p className="plan-card__tagline">{plan.tagline}</p>

                <div className="plan-card__price">
                  <span className="plan-card__price-label">Faturamento</span>
                  <span className="plan-card__price-value">{plan.revenueRange}</span>
                </div>

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
                      <li
                        className={included ? 'is-included' : 'is-excluded'}
                        key={feature}
                      >
                        <FeatureIcon included={included} color={plan.textColor} />
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
              </div>
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
