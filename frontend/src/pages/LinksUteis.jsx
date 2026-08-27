import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { LinkDirectory } from '../components/shared/LinkDirectory'
import { USEFUL_LINK_CATEGORIES } from '../data/usefulLinks'

export function LinksUteis() {
  usePageTitle('Links Úteis')

  return (
    <section className="section links-uteis">
      <div className="container">
        <SectionHeading
          title="Links Úteis"
          description="Um atalho pros principais sistemas, portais de órgãos públicos e ferramentas que usamos no dia a dia da contabilidade."
        />

        <LinkDirectory
          categories={USEFUL_LINK_CATEGORIES}
          searchPlaceholder="Buscar um link (ex: eSocial, SEFAZ, DECORE...)"
          searchLabel="Buscar link útil"
        />
      </div>
    </section>
  )
}
