import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { LinkDirectory } from '../components/shared/LinkDirectory'
import { DOWNLOADS_CATEGORIES } from '../data/downloads'

export function Downloads() {
  usePageTitle('Downloads')

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          title="Downloads"
          description="Modelos, formulários e links úteis prontos para baixar e agilizar os processos da sua empresa."
        />

        <LinkDirectory
          categories={DOWNLOADS_CATEGORIES}
          searchPlaceholder="Buscar um documento (ex: rescisão, admissão, DARF...)"
          searchLabel="Buscar download"
        />
      </div>
    </section>
  )
}
