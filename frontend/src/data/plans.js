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
    tagline: 'Ideal para pequenos empresários',
    revenueRange: 'Até R$ 20.000/mês',
    includedCount: 4,
  },
  {
    id: 'essencial',
    name: 'Contabilidade Essencial',
    tagline: 'Ideal para empresas em consolidação e expansão',
    revenueRange: 'Até R$ 60.000/mês',
    includedCount: 8,
    featured: true,
  },
  {
    id: 'consultiva',
    name: 'Contabilidade Consultiva',
    tagline: 'Ideal para empresas que querem uma gestão financeira estratégica',
    revenueRange: 'Acima de R$ 60.000/mês',
    includedCount: PLAN_FEATURES.length,
  },
]
