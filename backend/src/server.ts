import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { pingRoute } from './routes/ping.route';

//Inicializamos el servidor Fastify
const server: FastifyInstance = Fastify({logger: true})

//Registramos las rutas
const registerRoutes = async () => {
  //Dentro de este array agregamos las rutas
  const routes = [
    {name: 'pingRoute', handler: pingRoute}
  ]


  for (const route of routes) {
    try{
      await route.handler(server);
      server.log.info(`Ruta ${route.name} registrada correctamente`)
    
    } catch (error) {
      server.log.error(`Error al registrar la ruta ${route.name}:`, error)
    }
  }





}



const start = async () => {
  try {

    await registerRoutes()
    await server.listen({ port: 3000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log('🚀 Servidor corriendo en http://localhost:' + port);

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()