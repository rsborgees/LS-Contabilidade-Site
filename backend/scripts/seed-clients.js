import { copyFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLIENT_ASSETS_DIR = path.join(__dirname, '../../frontend/src/assets/clients')
const UPLOADS_DIR = path.join(__dirname, '../uploads')

const CLIENT_FILES = [
  ['071-film.jpeg', '071 Film'],
  ['dinamo-transporte-logistica.jpg', 'Dínamo Transporte e Logística'],
  ['espaco-maternar.jpeg', 'Espaço Maternar'],
  ['farmacia-guerra.jpg', 'Farmácia Guerra'],
  ['fusion-studio-pilates.png', 'Fusion Studio de Pilates'],
  ['gabarito-auto-pecas.jpg', 'Gabarito Auto Peças'],
  ['manusocorro-construcao-civil.png', 'Manusocorro Serviços de Construção Civil'],
  ['ti-ideal.png', 'TI Ideal'],
  ['vge-transportadora.jpeg', 'VGE Transportadora'],
  ['bahia-tech-notebooks.webp', 'Bahia Tech Notebooks'],
  ['banco-cora.png', 'Banco Cora'],
  ['clinesf.jpeg', 'Clinesf'],
  ['eletromed.jpg', 'Eletromed'],
  ['facility-refrigeracao.jpg', 'Facility Refrigeração'],
  ['farma-boa-vida.jpg', 'Farma Boa Vida'],
  ['farmacia-popular-da-gente.jpeg', 'Farmácia Popular da Gente'],
  ['farmanova.webp', 'Farmanova'],
  ['fito-flora.jpg', 'Fito Flora'],
  ['franco-confeitaria.jpg', 'Franco Confeitaria'],
  ['grupo-evo.jpeg', 'Grupo Evo'],
  ['farmacias-fort-popular.jpeg', 'Farmácias Fort Popular'],
  ['jr-cirurgia.png', 'JR Cirurgia'],
  ['kalio-construtora.avif', 'Kalio Construtora'],
  ['soften-sistemas.svg', 'Soften Sistemas'],
  ['master-climatizacao.jpg', 'Master Climatização'],
]

async function seedClients() {
  for (const [fileName, name] of CLIENT_FILES) {
    const existing = await pool.query('SELECT id FROM clients WHERE name = $1', [name])
    if (existing.rows.length > 0) {
      console.log(`Já existe, pulando: ${name}`)
      continue
    }

    const sourcePath = path.join(CLIENT_ASSETS_DIR, fileName)
    if (!existsSync(sourcePath)) {
      console.warn(`Arquivo não encontrado, pulando: ${fileName}`)
      continue
    }

    const ext = path.extname(fileName)
    const storedFileName = `${randomUUID()}${ext}`
    copyFileSync(sourcePath, path.join(UPLOADS_DIR, storedFileName))

    await pool.query('INSERT INTO clients (name, logo_image_path) VALUES ($1, $2)', [
      name,
      storedFileName,
    ])
    console.log(`Migrado: ${name}`)
  }

  console.log('Migração de clientes concluída.')
  await pool.end()
}

seedClients().catch((error) => {
  console.error('Falha ao migrar clientes:', error)
  process.exit(1)
})
