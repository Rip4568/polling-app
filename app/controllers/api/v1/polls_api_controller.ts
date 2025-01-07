import Poll from '#models/poll'
import { ImageService } from '#services/image_service'
import PollsService from '#services/polls_service'
import { createPollValidator, PollInterface, updatePollValidator } from '#validators/poll_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export interface ParamsPoll {
  poll_id: number
}

@inject()
export default class PollsAPIController {
  constructor(
    private readonly pollService: PollsService,
    private readonly imageService: ImageService
  ) {}

  async store({ request, response }: HttpContext) {
    const data: PollInterface = request.only(['title', 'description', 'banner', 'options'])

    const deviceIdOwner = request.input('deviceId') || request.ip()

    if (request.file('banner')) {
      const banner = request.file('banner')
      if (banner) {
        const bannerPath = await this.imageService.store(banner)
        data.banner = bannerPath
      }
    }

    const validationData = {
      ...data,
      deviceIdOwner,
    }

    try {
      const validatedData = await createPollValidator.validate(validationData)
      const poll = await this.pollService.create(validatedData)

      return response.status(201).json({
        message: 'Poll created successfully',
        poll,
      })
    } catch (error) {
      console.log(JSON.stringify(error), error)
      return response.status(422).json({
        message: 'Validation failed',
        error,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext & { params: ParamsPoll }) {
    const pollId = params.poll_id
    const poll = await this.pollService.find(pollId)
    if (!poll) {
      return response.status(404).json({
        message: 'Poll not found',
        error: 'POLL_NOT_FOUND',
      })
    }
    return response.status(201).json({
      message: 'Poll retrieved successfully',
      poll,
    })
  }

  /**
   * Edit individual record
   */
  //async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext & { params: ParamsPoll }) {
    if (!params.poll_id) {
      return response.status(404).json({
        message: 'provide the poll_id',
      })
    }
    const poll = await this.pollService.getBy(params.poll_id)
    if (!poll) {
      return response.status(404).json({
        message: 'poll not found',
      })
    }
    const validatedData = await request.validateUsing(updatePollValidator)
    const pollUpdated = await this.pollService.update(params.poll_id, validatedData)

    return response.status(200).json({
      message: 'poll updated successfully',
      poll: pollUpdated,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const deviceIdOwner = params.deviceIdOwner
    const poll = await Poll.query().where('deviceIdOwner', deviceIdOwner).first()
    if (!poll) {
      return response.status(404).json({
        message: 'Poll not found',
        error: 'POLL_NOT_FOUND',
      })
    }
    if (poll.deviceIdOwner !== deviceIdOwner) {
      return response.status(403).json({
        message: 'Poll not found',
        error: 'POLL_NOT_FOUND',
      })
    }
    await poll.delete()
    return response.status(200).json({
      message: 'Poll deleted successfully',
      poll,
    })
  }

  /**
   * Display a list of resource
   */
  async index({ response, params }: HttpContext & { params: { page: number; perPage: number } }) {
    const polls = await this.pollService.paginatePolls(params.page ?? 1, params.perPage ?? 10)
    return response.status(200).json({
      message: 'Polls retrieved successfully',
      polls,
    })
  }

  async vote({ params, request, response }: HttpContext) {
    const deviceId = request.header('X-Device-Id') || request.ip()

    try {
      const result = await this.pollService.vote({
        pollId: params.id,
        optionId: params.optionId,
        deviceId,
      })

      return response.json(result)
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
