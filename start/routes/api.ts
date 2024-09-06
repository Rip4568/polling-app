/*
|--------------------------------------------------------------------------
| The api routes file
|--------------------------------------------------------------------------
|
| 
|
*/

import router from '@adonisjs/core/services/router'

const PollsApiController = () => import('#controllers/api/v1/polls_api_controller')

router
  .group(() => {
    router
      .group(() => {
        router.resource('polls', PollsApiController).as('polls')
      })
      .prefix('/v1')
    router
      .get('/', async () => {
        return {
          message: 'Hello World',
        }
      })
      .as('root')
  })
  .prefix('/api')
  .as('api')
