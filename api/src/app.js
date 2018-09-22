import 'dotenv/config'
import restify from 'restify'
import restifyJWT from 'restify-jwt-community'
import corsMiddleware from 'restify-cors-middleware'
import routes from './configs/routes'
import controllers from './controllers'

const server = restify.createServer()
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['authorization', 'content-type'],
})

// Middleware
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.authorizationParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.use(
  restifyJWT({
    secret: process.env.JWT_SECRET_KEY,
    credentialsRequired: false,
  }).unless({ path: [routes.user.auth, routes.user.register] })
)

// Route: User
server.post(routes.user.auth, controllers.user.auth)
server.post(routes.user.register, controllers.user.register)
server.get(routes.user.data, controllers.user.getData)

// Route: Article
server.get(routes.article.list, controllers.article.getList)
server.post(routes.article.create, controllers.article.create)

// Error Handler
server.on('NotFound', (_req, _res, _err, cb) => cb())

server.listen(process.env.PORT, () => {
  console.log(`API LISTEN TO PORT:${process.env.PORT}, ${server.url}`)
})
