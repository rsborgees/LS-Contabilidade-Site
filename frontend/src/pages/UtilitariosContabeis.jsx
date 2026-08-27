import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { LinkDirectory } from '../components/shared/LinkDirectory'
import { UTILITARIOS_CONTABEIS_CATEGORIES } from '../data/utilitariosContabeis'

export function UtilitariosContabeis() {
  usePageTitle('Utilitários Contábeis')

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title="Utilitários Contábeis"
          description="Índices econômicos, tabelas práticas, certidões, órgãos de classe por estado e outras ferramentas do dia a dia contábil."
        />

        <LinkDirectory
          categories={UTILITARIOS_CONTABEIS_CATEGORIES}
          searchPlaceholder="Buscar um utilitário (ex: Selic, CRC, Simples Nacional...)"
          searchLabel="Buscar utilitário contábil"
        />
      </div>
    </section>
  )
}
