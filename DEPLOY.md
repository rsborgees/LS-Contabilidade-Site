# Deploy no VPS

Pré-requisitos no servidor: Docker e Docker Compose instalados, domínio
apontando pro IP do VPS (necessário só pro passo de HTTPS).

## Primeira vez

1. Clonar o repositório no servidor e entrar na pasta.
2. Copiar `.env.example` para `.env` e preencher `POSTGRES_PASSWORD`,
   `JWT_SECRET`, `RESEND_API_KEY`, `CONTACT_EMAIL_TO` e `CONTACT_EMAIL_FROM`
   (formulários de contato do site — veja a seção "E-mail dos formulários
   de contato (Resend)" abaixo antes de preencher `CONTACT_EMAIL_FROM`).
3. Buildar o frontend (gera `frontend/dist`, que o nginx serve):
   ```bash
   cd frontend && npm ci && npm run build && cd ..
   ```
4. Subir o banco e o backend (sem o override de portas de dev):
   ```bash
   docker compose -f docker-compose.yml up -d --build db backend
   ```
5. Rodar a migração e criar o admin:
   ```bash
   docker compose -f docker-compose.yml exec backend npm run migrate
   docker compose -f docker-compose.yml exec backend npm run seed:admin -- --email=SEU_EMAIL --password=SUA_SENHA
   ```
6. Subir o nginx:
   ```bash
   docker compose -f docker-compose.yml up -d nginx
   ```
7. Confirmar que o site responde: `curl -I http://SEU_DOMINIO_OU_IP/`.

## E-mail dos formulários de contato (Resend)

O backend usa a [Resend](https://resend.com) para enviar o conteúdo dos
formulários de contato do site por e-mail. Sem um domínio verificado no
Resend, o envio só funciona para o e-mail dono da conta Resend — falha em
produção com "You can only send testing emails to your own email address".

Passo a passo pra liberar o envio pra qualquer destinatário (ex.:
`legalizacao@lscontabilidade.cnt.br`):

1. Acessar [resend.com/domains](https://resend.com/domains) e clicar em
   "Add Domain", informando `lscontabilidade.cnt.br`.
2. O Resend mostra registros DNS (geralmente TXT/SPF, CNAME/DKIM e
   opcionalmente TXT/DMARC). Adicionar cada um no painel de DNS onde o
   domínio `lscontabilidade.cnt.br` está registrado.
3. Voltar em resend.com/domains e clicar em "Verify" (propagação de DNS
   pode levar de minutos a algumas horas).
4. Depois de verificado, qualquer endereço `@lscontabilidade.cnt.br` pode
   ser usado em `CONTACT_EMAIL_FROM` (não precisa ser uma caixa de e-mail
   real — só precisa estar no domínio verificado).

## HTTPS (manual, depende do domínio já apontar pro servidor)

Instalar `certbot` no host (fora do Docker) e emitir o certificado para o
domínio, apontando o nginx pra usar os certificados gerados — ou trocar a
imagem `nginx:alpine` por uma variante com suporte a certbot integrado. Esse
passo fica pra quando o domínio estiver configurado.

## Deploys seguintes

```bash
git pull
cd frontend && npm ci && npm run build && cd ..
docker compose -f docker-compose.yml up -d --build
docker compose -f docker-compose.yml restart nginx
```

O `restart nginx` no final é necessário mesmo quando só o frontend mudou: como
o nginx serve `frontend/dist` por volume (não copiado pra dentro da imagem),
ele pode manter uma referência antiga do diretório depois que o `dist` é
apagado e recriado pelo build, e responder 403 até ser reiniciado.

## Observação sobre portas

`docker-compose.override.yml` expõe as portas do `db` (5432) e do `backend`
(4000) diretamente no host — é só para desenvolvimento local. No servidor,
sempre usar `docker compose -f docker-compose.yml ...` explicitamente (sem
deixar o Compose mesclar o override automaticamente), para manter `db` e
`backend` acessíveis apenas pela rede interna do Docker.
