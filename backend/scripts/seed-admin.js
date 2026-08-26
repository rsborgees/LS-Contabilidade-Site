import { pool } from '../src/db.js'
import { hashPassword } from '../src/auth/hash.js'

function getArg(name) {
  const prefix = `--${name}=`
  const arg = process.argv.find((value) => value.startsWith(prefix))
  return arg ? arg.slice(prefix.length) : undefined
}

async function seedAdmin() {
  const email = getArg('email')
  const password = getArg('password')

  if (!email || !password) {
    console.error('Uso: npm run seed:admin -- --email=voce@exemplo.com --password=umaSenhaForte')
    process.exit(1)
  }

  const passwordHash = await hashPassword(password)

  await pool.query(
    `INSERT INTO admins (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [email, passwordHash],
  )

  console.log(`Admin ${email} criado/atualizado com sucesso.`)
  await pool.end()
}

seedAdmin().catch((error) => {
  console.error('Falha ao criar admin:', error)
  process.exit(1)
})
