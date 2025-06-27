'use strict'

import { createLogger } from './common/logging/logger.js'
import { startServer } from './common/start-server.js'

await startServer()

process.on('unhandledRejection', (ex) => {
  const logger = createLogger()
  logger.info('Unhandled rejection')
  logger.error(ex)
  console.log(ex)
  process.exit(1)
})
