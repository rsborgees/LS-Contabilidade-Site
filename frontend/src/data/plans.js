export const PLAN_FEATURES = [
  'Guias de Impostos',
  'Pró-labore',
  'Contabilidade Digital',
  'Atendimento por chat e telefone',
  'Atendimento Presencial',
  'Controle de Certidões',
  'Balancete e DRE mensal',
  'Reunião mensal',
  'Sistema de Gestão Financeira',
  'Planejamento Tributário',
  'Declaração de Faturamento mensal',
  'Certificado Digital e-CNPJ A1',
  'Customer Success',
]

export const PLANS = [
  {
    id: 'light',
    name: 'Contabilidade Light',
    color: '#22c55e',
    revenueRange: 'Até R$ 20.000/mês',
    includedCount: 4,
  },
  {
    id: 'essencial',
    name: 'Contabilidade Essencial',
    color: '#3b82f6',
    revenueRange: 'Até R$ 60.000/mês',
    includedCount: 8,
  },
  {
    id: 'consultiva',
    name: 'Contabilidade Consultiva',
    color: '#ef4444',
    revenueRange: 'Acima de R$ 60.000/mês',
    includedCount: PLAN_FEATURES.length,
  },
]
