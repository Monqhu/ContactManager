import { FastifyInstance, RouteShorthandOptions } from 'fastify';

export async function pingRoute(server: FastifyInstance) {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            pong: {
              type: 'string'
            }
          }
        }
      }
    }
  }
  

  server.get('/ping', opts, async (request, reply) => {
    return { pong: 'it worked!'}
  })


}