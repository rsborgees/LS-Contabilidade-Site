import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // Points DATABASE_URL at ls_blog_test (see .env.test) before any test
    // file loads db.js, so tests never touch the real dev/prod database.
    setupFiles: ['./vitest.setup.js'],
    // Test files share a single real Postgres database (no per-file
    // isolation), so they must run sequentially to avoid one file's
    // beforeEach wiping rows another file's test is mid-way through using.
    fileParallelism: false,
  },
})
