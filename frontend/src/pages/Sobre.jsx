import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import './Sobre.css'

const PHILOSOPHY = ['Qualidade', 'Cumprimento de prazos', 'Sigilo', 'Eficácia', 'Profissionalismo']

const VALUES = [
  'Ética',
  'Segurança',
  'Transparência',
  'Inovação',
  'Responsabilidade',
  'Comprometimento',
  'Qualidade nos serviços',
  'Respeito ao próximo',
]

const AREAS = ['Contábil', 'Fiscal', 'Pessoal', 'Imposto de Renda', 'Auditoria', 'Societária', 'Tributária']

export function Sobre() {
  usePageTitle('Sobre Nós')

  return (
    <>
      <section className="section sobre-hero">
        <div className="container">
          <SectionHeading
            title="10 anos cuidando da contabilidade de quem confia na LS"
            description="Prestamos assessoria por meio de uma equipe treinada e qualificada, investindo continuamente em especialização, educação e inovação de processos."
          />

          <ul className="sobre-areas">
            {AREAS.map((area) => (
              <li key={area} className="sobre-areas__tag">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container sobre-grid">
          <div className="sobre-card">
            <h3 className="sobre-card__title">Missão</h3>
            <p>
              Ser uma empresa que proporciona aos colaboradores um ambiente de trabalho
              estimulante e, por meio da prestação de serviços, participar do sucesso dos
              clientes.
            </p>
          </div>

          <div className="sobre-card">
            <h3 className="sobre-card__title">Visão</h3>
            <p>
              Ser uma organização contábil de referência em Salvador e região, reconhecida pelo
              profissionalismo da equipe e pela qualidade dos serviços.
            </p>
          </div>

          <div className="sobre-card">
            <h3 className="sobre-card__title">Filosofia</h3>
            <ul className="sobre-card__list">
              {PHILOSOPHY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="Valores" />
          <ul className="sobre-values">
            {VALUES.map((value) => (
              <li className="sobre-values__tag" key={value}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
