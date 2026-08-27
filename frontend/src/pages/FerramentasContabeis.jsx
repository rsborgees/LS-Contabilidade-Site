import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import './FerramentasContabeis.css'

const TOOLS = [
  {
    title: 'Utilitários Contábeis',
    description:
      'Índices econômicos, tabelas práticas, certidões negativas, cálculo de impostos em atraso, Simples Nacional e muito mais.',
    to: '/utilitarios-contabeis',
    cta: 'Acessar',
  },
  {
    title: 'Links Úteis',
    description:
      'Atalhos rápidos para bancos, sites do governo, associações, federações, confederações e conselhos.',
    to: '/links-uteis',
    cta: 'Acessar',
  },
  {
    title: 'Downloads',
    description:
      'Baixe modelos e formulários prontos para editar e imprimir, além de links para consultas e certidões.',
    to: '/downloads',
    cta: 'Acessar',
  },
  {
    title: 'Agenda Tributária',
    description: 'Acompanhe os compromissos e prazos da área contábil de maneira rápida e fácil.',
    href: 'http://www.idealsoftwares.com.br/agendas/index-.php',
    cta: 'Acessar',
  },
  {
    title: 'Manual Empresarial',
    description: 'Um manual explicativo e gratuito sobre o funcionamento da contabilidade na sua empresa.',
    href: '/arquivos-download/manual-empresarial.pdf',
    cta: 'Baixar',
  },
  {
    title: 'Diversos',
    description:
      'Espaço reservado para conteúdos específicos disponibilizados aos nossos clientes, como links e documentos para download.',
    to: '/diversos',
    cta: 'Acessar',
  },
]

export function FerramentasContabeis() {
  usePageTitle('Ferramentas Contábeis')

  return (
    <section className="section ferramentas-contabeis">
      <div className="container">
        <SectionHeading
          title="Ferramentas Contábeis"
          description="Encontre aqui diversas ferramentas contábeis e administrativas para agilizar o seu dia."
        />

        <div className="ferramentas-contabeis__grid">
          {TOOLS.map((tool) => (
            <article className="ferramentas-contabeis__card" key={tool.title}>
              <h3 className="ferramentas-contabeis__card-title">{tool.title}</h3>
              <p className="ferramentas-contabeis__card-description">{tool.description}</p>
              {tool.to ? (
                <Link to={tool.to} className="btn btn--outline ferramentas-contabeis__card-cta">
                  {tool.cta}
                </Link>
              ) : (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline ferramentas-contabeis__card-cta"
                >
                  {tool.cta}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
