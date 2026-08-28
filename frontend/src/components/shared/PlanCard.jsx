import './PlanCard.css'

export const PLAN_ICONS = {
  light: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M5 12.5L10 17.5L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export function PlanCard({ plan, children }) {
  return (
    <div className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}>
      {plan.featured && <span className="plan-card__badge">Mais popular</span>}
      <div className="plan-card__icon">{PLAN_ICONS[plan.id]}</div>
      <h3 className="plan-card__name">{plan.name}</h3>
      <p className="plan-card__tagline">{plan.tagline}</p>

      <div className="plan-card__price">
        <span className="plan-card__price-label">Faturamento</span>
        <span className="plan-card__price-value">{plan.revenueRange}</span>
      </div>

      {children}
    </div>
  )
}
