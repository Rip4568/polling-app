/*
|--------------------------------------------------------------------------
| Routes Web file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
const PollsController = () => import('#controllers/polls_controller')

router.resource('polls', PollsController).as('polls')

router.get('/', [PollsController, 'welcome']).as('polls.welcome')
