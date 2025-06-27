'use strict'

import { healthRoute } from '../routes/health.js'
import { example } from '../routes/example.js'

const defaultRoutes = {
  plugin: {
    name: 'Default routes',
    register: async function (server, _options) {
      server.route([healthRoute].concat(example))
    }
  }
}

export { defaultRoutes }
