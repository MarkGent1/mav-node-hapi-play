'use strict'

import Hapi from '@hapi/hapi'
import { config } from './config.js'
import { defaultRoutes } from './plugins/router.js'
import { failAction } from './common/fail-action.js'
import { requestLogger } from './common/logging/request-logger.js'
import { pulse } from './common/pulse.js'

async function createServer() {
  const server = Hapi.server({
    host: config.get('host'),
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: false
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hola'
    }
  })

  await server.register([defaultRoutes, pulse, requestLogger])

  return server
}

export { createServer }
