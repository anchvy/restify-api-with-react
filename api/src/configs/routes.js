const endpoint = '/api'
const articlePathname = '/article'

const routes = {
  user: {
    data: `${endpoint}/me`,
    auth: `${endpoint}/auth`,
    register: `${endpoint}/register`,
    verify: `${endpoint}/user/:userId/verify/:hash`,
  },
  article: {
    list: `${endpoint}${articlePathname}/list`,
    create: `${endpoint}${articlePathname}/create`,
  },
}

export default routes
