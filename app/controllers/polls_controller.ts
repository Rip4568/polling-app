import Poll from '#models/poll'
import { ImageService } from '#services/image_service'
import PollsService from '#services/polls_service'
import { createPollValidator, updatePollValidator } from '#validators/poll_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PollsController {
  constructor(
    private readonly pollsService: PollsService,
    private readonly imageService: ImageService
  ) {}

  /**
   * Display welcome page
   */
  async welcome({ view }: HttpContext) {
    return view.render('pages/welcome')
  }

  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const polls = await this.pollsService.all()
    return view.render('pages/home', { polls })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/polls/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    const validatedData = await request.validateUsing(createPollValidator)

    const poll = await this.pollsService.create(validatedData)
    return response.redirect().toRoute('polls.create')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const poll = await this.pollsService.find(params.poll_id)
    if (!poll) {
      return response.status(404).json({
        message: 'Poll not found',
        error: 'POLL_NOT_FOUND',
      })
    }
    const validatedData = await request.validateUsing(updatePollValidator)
    poll.merge(validatedData)
    await poll.save()
    return response.status(200).json({
      message: 'Poll updated successfully',
      poll,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
