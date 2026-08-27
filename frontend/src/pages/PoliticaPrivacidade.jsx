import { usePageTitle } from '../hooks/usePageTitle'
import { SectionHeading } from '../components/shared/SectionHeading'
import { COMPANY_NAME, EMAIL } from '../lib/constants'
import './PoliticaPrivacidade.css'

export function PoliticaPrivacidade() {
  usePageTitle('Política de Privacidade')

  return (
    <section className="section politica-privacidade">
      <div className="container politica-privacidade__container">
        <SectionHeading
          title="Política de Privacidade"
          description="Como a LS Contabilidade coleta, usa e protege os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
          align="left"
        />

        <p className="politica-privacidade__updated">Última atualização: agosto de 2026.</p>

        <h2>1. Quem somos</h2>
        <p>
          {COMPANY_NAME} é a controladora dos dados pessoais tratados através deste site. Para
          qualquer dúvida sobre esta política ou sobre o tratamento dos seus dados, entre em
          contato pelo e-mail <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>2. Quais dados coletamos</h2>
        <p>Coletamos dados pessoais apenas quando você preenche um formulário de contato no site, incluindo:</p>
        <ul>
          <li>Nome</li>
          <li>Telefone / WhatsApp</li>
          <li>E-mail</li>
          <li>Assunto e mensagem enviados</li>
        </ul>
        <p>Não coletamos dados de navegação para fins de publicidade ou perfilamento.</p>

        <h2>3. Para que usamos esses dados</h2>
        <p>
          Os dados enviados pelos formulários são usados exclusivamente para responder ao seu
          contato e apresentar nossos serviços contábeis. As mensagens são enviadas por e-mail à
          nossa equipe comercial e não são armazenadas em banco de dados neste site.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Utilizamos apenas cookies estritamente necessários ao funcionamento do site, como o
          cookie de sessão usado para autenticação no painel administrativo interno. Atualmente
          não utilizamos cookies de análise, publicidade ou rastreamento de terceiros.
        </p>

        <h2>5. Compartilhamento de dados</h2>
        <p>
          Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins de
          marketing. Seus dados podem ser processados por prestadores de serviço que nos ajudam a
          operar o site (por exemplo, o serviço de envio de e-mails dos formulários de contato),
          sempre limitados à finalidade de viabilizar esse envio.
        </p>

        <h2>6. Seus direitos (LGPD)</h2>
        <p>Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento dos seus dados;</li>
          <li>Acessar os dados que temos sobre você;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Solicitar a portabilidade dos seus dados a outro fornecedor;</li>
          <li>Revogar o consentimento e solicitar a eliminação dos dados tratados com base nele.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, entre em contato pelo e-mail{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>7. Alterações a esta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente para refletir mudanças em nossas
          práticas ou por exigência legal. A data da última atualização está sempre indicada no
          topo desta página.
        </p>
      </div>
    </section>
  )
}
