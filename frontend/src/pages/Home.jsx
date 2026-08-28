import { usePageTitle } from '../hooks/usePageTitle'
import { Hero } from '../components/home/Hero'
import { OpenOrMigrate } from '../components/home/OpenOrMigrate'
import { PlansSummary } from '../components/home/PlansSummary'
import { MeiCallout } from '../components/home/MeiCallout'
import { ServicesSummary } from '../components/home/ServicesSummary'
import { Benefits } from '../components/home/Benefits'
import { AudienceGrid } from '../components/home/AudienceGrid'
import { Trust } from '../components/home/Trust'
import { Faq } from '../components/home/Faq'
import { ContactCallout } from '../components/home/ContactCallout'

export function Home() {
  usePageTitle('Início')

  return (
    <>
      <Hero />
      <OpenOrMigrate />
      <PlansSummary />
      <MeiCallout />
      <ServicesSummary />
      <Benefits />
      <AudienceGrid />
      <Trust />
      <Faq />
      <ContactCallout />
    </>
  )
}
