import { pool } from '../db.js'

const DIACRITICS_REGEX = new RegExp('[̀-ͯ]', 'g')

export function generateSlug(title) {
  return title
    .normalize('NFD')
    .replace(DIACRITICS_REGEX, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function ensureUniqueSlug(baseSlug, excludePostId) {
  let slug = baseSlug
  let suffix = 2

  while (true) {
    const result = await pool.query(
      excludePostId
        ? 'SELECT id FROM posts WHERE slug = $1 AND id != $2'
        : 'SELECT id FROM posts WHERE slug = $1',
      excludePostId ? [slug, excludePostId] : [slug],
    )

    if (result.rows.length === 0) {
      return slug
    }

    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }
}
