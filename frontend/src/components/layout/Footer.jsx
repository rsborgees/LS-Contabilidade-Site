import { Link } from 'react-router-dom'
import logo from '../../assets/logo2.png'
import { NAV_LINKS } from '../../data/nav'
import { ADDRESS_LINES, COMPANY_NAME, EMAIL, PHONE_DISPLAY, buildWhatsappUrl } from '../../lib/constants'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={logo} alt={COMPANY_NAME} className="footer__logo" />
          <p className="footer__tagline">
            Assessoria contábil, fiscal, pessoal e societária para empresas e profissionais em
            Salvador, na Bahia e em todo o Brasil.
          </p>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Navegação</h3>
          <ul>
            {NAV_LINKS.flatMap((link) => link.children ?? [link]).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Contato</h3>
          <ul>
            <li>
              <a className="footer__link" href={buildWhatsappUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp: {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a className="footer__link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Endereço</h3>
          <address className="footer__address">
            {ADDRESS_LINES.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {year} {COMPANY_NAME}. Todos os direitos reservados.
          </span>
          <span>Atendimento presencial em Salvador e na Bahia · Atendimento digital em todo o Brasil.</span>
        </div>
      </div>
    </footer>
  )
}
