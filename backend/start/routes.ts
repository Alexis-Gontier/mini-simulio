/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Authentication routes
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  
  // Protected routes
  router.group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.get('/me', [AuthController, 'me'])
  }).use(middleware.auth())
  
}).prefix('/api/auth')

// Client routes (protected)
router.group(() => {
  router.get('/clients', [ClientsController, 'index'])
  router.post('/clients', [ClientsController, 'store'])
  router.get('/clients/:id', [ClientsController, 'show'])
  router.put('/clients/:id', [ClientsController, 'update'])
  router.delete('/clients/:id', [ClientsController, 'destroy'])
}).prefix('/api').use(middleware.auth())
