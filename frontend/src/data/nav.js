export const NAV_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Sobre Nós', to: '/sobre' },
  {
    label: 'Serviços',
    children: [
      { label: 'Nossos Serviços', to: '/servicos' },
      { label: 'Profissionais Liberais', to: '/profissionais-liberais' },
      { label: 'Prestador de Serviços', to: '/prestador-de-servicos' },
      { label: 'Comércio', to: '/comercio' },
      { label: 'Farmácias', to: '/farmacias' },
    ],
  },
  { label: 'Fale Conosco', to: '/contato' },
]
