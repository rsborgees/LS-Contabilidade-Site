import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { pool } from '../src/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schema = readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf-8')

async function migrate() {
  await pool.query(schema)
  console.log('Migração aplicada com sucesso.')
  await pool.end()
}

migrate().catch((error) => {
  console.error('Falha ao migrar:', error)
  process.exit(1)
})
