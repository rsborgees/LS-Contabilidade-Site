import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieConsent } from '../shared/CookieConsent'
import { WhatsappWidget } from '../shared/WhatsappWidget'

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <WhatsappWidget />
    </>
  )
}
