'use strict'

const healthRoute = {
  method: 'GET',
  path: '/health',
  handler: (_request, h) => {
    return h.response({ message: 'success' })
  }
}

export { healthRoute }
