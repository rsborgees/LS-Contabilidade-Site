import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { pool } from '../db.js'
import { ensureUniqueSlug, generateSlug } from './slug.js'

describe('generateSlug', () => {
  it('converts a title to accent-free kebab-case', () => {
    expect(generateSlug('Reforma Tributária: o que muda em 2026?')).toBe(
      'reforma-tributaria-o-que-muda-em-2026',
    )
  })
})

describe('ensureUniqueSlug', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM posts')
  })

  afterAll(async () => {
    await pool.end()
  })

  it('returns the base slug when there is no collision', async () => {
    const slug = await ensureUniqueSlug('meu-post')
    expect(slug).toBe('meu-post')
  })

  it('appends a numeric suffix on collision', async () => {
    await pool.query(
      "INSERT INTO posts (title, slug, content_markdown) VALUES ('Meu post', 'meu-post', 'conteúdo')",
    )
    const slug = await ensureUniqueSlug('meu-post')
    expect(slug).toBe('meu-post-2')
  })
})
