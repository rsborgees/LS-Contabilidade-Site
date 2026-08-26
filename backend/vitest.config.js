import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // Test files share a single real Postgres database (no per-file
    // isolation), so they must run sequentially to avoid one file's
    // beforeEach wiping rows another file's test is mid-way through using.
    fileParallelism: false,
  },
})
