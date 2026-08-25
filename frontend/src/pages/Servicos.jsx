import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { WhatsappButton } from '../components/shared/WhatsappButton'
import { SERVICE_CATEGORIES } from '../data/services'
import './Servicos.css'

export function Servicos() {
  usePageTitle('Serviços')

  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Tudo o que a sua empresa precisa em um só lugar"
            description="Conheça em detalhes cada uma das nossas áreas de atuação."
          />

          <div className="servicos__list">
            {SERVICE_CATEGORIES.map((category) => (
              <article className="servicos__card" key={category.slug}>
                <h2 className="servicos__title">{category.title}</h2>
                <p className="servicos__description">{category.description}</p>
                <ul className="servicos__items">
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt servicos__cta">
        <div className="container servicos__cta-inner">
          <h2>Ainda não sabe qual serviço precisa?</h2>
          <p>Fale com a nossa equipe e receba uma orientação personalizada.</p>
          <WhatsappButton message="Olá! Quero entender melhor quais serviços da LS Contabilidade se encaixam na minha empresa.">
            Falar no WhatsApp
          </WhatsappButton>
        </div>
      </section>
    </>
  )
}
