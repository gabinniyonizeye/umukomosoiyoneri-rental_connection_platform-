#!/usr/bin/env node
import { startVitest } from 'vitest/node'

const args = process.argv.slice(2)
const config = {
  run: args.includes('run'),
  ui: args.includes('--ui'),
  coverage: args.includes('--coverage')
}

startVitest(config.run ? 'run' : 'watch', [], {
  coverage: config.coverage ? { provider: 'v8' } : undefined,
  ui: config.ui
})
