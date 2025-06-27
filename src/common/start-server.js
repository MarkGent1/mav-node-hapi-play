'use strict'

import { createServer } from '../server.js'
import { createLogger } from './logging/logger.js'

async function startServer() {
  let server

  try {
    server = await createServer()
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(`Access your backend on ${server.info.uri}`)
    console.log('Hapi server running on %s', server.info.uri)
  } catch (ex) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(ex)
    console.log(ex)
  }

  return server
}

export { startServer }
