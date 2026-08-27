import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import './Diversos.css'

export function Diversos() {
  usePageTitle('Diversos')

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title="Diversos"
          description="Espaço reservado para conteúdos específicos disponibilizados aos nossos clientes, como links e documentos para download."
        />
        <p className="diversos__notice">Em breve, novos conteúdos serão disponibilizados aqui.</p>
      </div>
    </section>
  )
}
