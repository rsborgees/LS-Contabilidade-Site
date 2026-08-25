# Site Institucional LS Contabilidade — Design

## Contexto

A LS Contabilidade (Salvador/BA) precisa de um site institucional novo. Não existe
site anterior no repositório — há apenas um scaffold Vite (vanilla JS) não utilizado
em `frontend/`, que será substituído. Já existem assets reais:

- `frontend/src/assets/logo (1).png` — logo oficial (verde `#1C8932` + branco, ícone
  de calculadora).
- `frontend/src/clientes img/*` — 25 logos de empresas clientes (jpg/png/webp/avif/svg),
  usados em depoimentos/prova social.
- `frontend/src/assets/hero.png`, `vite.svg`, `javascript.svg` — placeholders do
  template Vite, serão descartados.

Todo o conteúdo textual (missão, visão, valores, serviços, depoimentos, FAQ, dados de
contato) foi levantado pelo usuário a partir do site de referência e está reproduzido
neste documento como fonte da verdade. Não há tabela de preços publicada — o site não
deve exibir valores.

## Decisões já aprovadas pelo usuário

- **Stack:** React puro via Vite (template `react`, JavaScript/JSX — sem
  TypeScript) + CSS puro (sem framework de utilitários), SPA estática,
  roteamento com `react-router-dom`. Decisão revisada em 2026-08-25: o usuário
  havia rodado `npm create vite@latest frontend` mas selecionado o template
  errado (vanilla JS, sem React) — substitui a escolha inicial de Next.js por
  Vite+React puro; em seguida o usuário pediu explicitamente JSX (não TSX) e
  CSS normal (não Tailwind), removendo essas duas dependências do projeto.
- **Notícias/Blog:** fora de escopo por enquanto. Sem CMS.
- **Formulário de contato:** via Formspree (serviço externo), chamado via
  `fetch` client-side, sem backend próprio.
- **Assets:** usar logo e fotos/logos de clientes já existentes no repositório
  (não gerar placeholders).
- **Cores:** verde `#1C8932` (extraído da logo) e branco, com um verde mais escuro
  `#146025` para hover/contraste e cinza neutro para texto secundário.
- **Deploy sugerido:** Netlify ou Vercel (ambos servem SPAs Vite estaticamente sem
  custo, bastando configurar fallback de rotas para `index.html`).

## Estrutura de rotas

- `/` — Início
- `/sobre` — Sobre Nós
- `/servicos` — Serviços
- `/contato` — Fale Conosco
- FAQ embutido na Home (seção de accordion), não como rota própria — evita uma
  página extra para um conteúdo curto que funciona bem como parte da landing.
- Roteamento client-side via `react-router-dom` (`BrowserRouter` + `Routes`),
  título de cada página atualizado via `document.title` em cada rota (sem
  dependência extra como react-helmet, já que não há SSR/SEO server-side neste
  modelo SPA).

## Conteúdo por página

### Início (`/`)

- Hero: nome, slogan "A contabilidade que a sua empresa precisa!", CTA WhatsApp
  ((71) 98427-6978) e CTA "Abrir empresa".
- Números: 10 anos no mercado, 100 empresas abertas.
- Blocos de destaque: "Abrir uma empresa" vs. "Migrar sua contabilidade".
- Chamada específica para MEI.
- Serviços em destaque (resumo das 6 categorias, com link para `/servicos`).
- Benefícios de contratar a LS (lista do briefing: relatórios mensais, IR, software
  de troca de documentos, canais de atendimento, etc).
- Perfis atendidos (e-commerce, beleza, TI, saúde, advogados, etc.) — grade de tags/ícones.
- Carrossel/grade de logos de clientes (usando as imagens de `clientes img/`).
- Depoimentos (Licita Elite Brasil, Manusocorro, Proinstall/Helison, Caroline
  Pitanga, Hugo Filmes).
- FAQ em accordion (reuniões presenciais, forma de pagamento, cidades atendidas,
  relatórios, processos/tecnologia, o que está incluso na mensalidade).
- Seção final de contato resumida + link para `/contato`.

### Sobre Nós (`/sobre`)

- Texto institucional (10 anos, equipe treinada, áreas de atuação: contábil, fiscal,
  pessoal, IR, auditoria, societária, tributária).
- Filosofia: qualidade, prazos, sigilo, eficácia, profissionalismo.
- Missão, Visão, Valores (lista completa do briefing).

### Serviços (`/servicos`)

- As 6 categorias detalhadas, cada uma com sua lista de itens:
  1. Serviços Contábeis (abertura/baixa de empresas, manutenção de obrigações).
  2. Departamento Fiscal (regularização fiscal/cadastral, SPED, ECF, EFD
     Contribuições, DCTF, etc).
  3. Departamento Pessoal (folha, cálculos trabalhistas).
  4. Serviços Societários (abertura de filiais, alterações contratuais,
     reativação de CNPJ).
  5. Imposto de Renda (pessoa física).
  6. Assessoria (contábil, fiscal, pessoal).
- Bloco de "abrir empresa" e "migrar contabilidade" com CTAs.

### Fale Conosco (`/contato`)

- Formulário (nome, telefone, e-mail, assunto, mensagem) via Formspree.
- Dados de contato: WhatsApp/telefone (71) 98427-6978, e-mail
  lscontabilidade9@gmail.com.
- Endereço: Av. Luis Viana (Paralela), 13.223, Hangar Business Park, Torre 07,
  CEP 41500-300 — com iframe do Google Maps.
- Nota de cobertura: atendimento presencial em Salvador e municípios da Bahia,
  digital em todo o Brasil.

## Design visual

- Paleta: `#1C8932` (primário), `#146025` (hover/contraste), branco, cinza neutro
  (texto secundário/backgrounds alternados).
- Tipografia via `next/font` (Inter ou equivalente), visual limpo e corporativo.
- Mobile-first (público final acessa bastante via WhatsApp/celular).
- Header fixo com logo + navegação + CTA WhatsApp; footer com dados de contato,
  navegação secundária e aviso de política de privacidade (texto simples, sem
  documento jurídico completo — fora de escopo).

## Fora de escopo (por decisão explícita do usuário)

- Seção/página de Notícias e "Links Úteis".
- CMS ou painel de administração.
- Tabela de preços/planos (não existe fonte confiável para esse dado).
- Backend próprio para o formulário (Formspree assume esse papel).

## Testes / validação

- `npm run build` (Vite) precisa passar sem erros de tipo/lint.
- Checagem visual manual (dev server) em mobile e desktop para cada página.
- Validação de que todos os links (WhatsApp, e-mail, mapa, âncoras do FAQ) abrem
  corretamente.
