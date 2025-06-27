'use strict'

import { healthRoute } from '../routes/health.js'

const defaultRoutes = {
  plugin: {
    name: 'Default routes',
    register: async function (server, _options) {
      server.route(healthRoute)
    }
  }
}

export { defaultRoutes }
