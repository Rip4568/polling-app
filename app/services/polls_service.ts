//import { typeInferValidatorType } from '@vinejs/vine';
import Option from '#models/option'
import Poll from '#models/poll'
import { DateTime } from 'luxon'
import Database from '@adonisjs/lucid/services/db'
import Choice from '#models/choice'

interface CreatePollData {
  title: string
  description: string | null | undefined
  dateExpiration: DateTime | null | undefined
  dateBegin: DateTime | null | undefined
  options: { title: string }[]
  deviceIdOwner: string
}

interface UpdatePollData extends Partial<CreatePollData> {}

interface VoteData {
  pollId: number
  optionId: number
  deviceId: string
}

export default class PollsService {
  async all(): Promise<Poll[]> {
    return await Poll.all()
  }

  async paginatePolls(page: number, perPage: number) {
    const polls = await Poll.query().paginate(page, perPage)
    return polls
  }

  async create(data: CreatePollData): Promise<Poll> {
    const trx = await Database.transaction()
    try {
      const poll = await Poll.create({
        title: data.title,
        description: data.description,
        dateBegin: data.dateBegin ? data.dateBegin : DateTime.now(),
        dateExpiration: data.dateExpiration
          ? data.dateExpiration
          : DateTime.now().plus({ days: 7 }),
        deviceIdOwner: data.deviceIdOwner,
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      })

      if (data.options && data.options.length > 0) {
        const optionsData = data.options.map((option) => ({
          title: option.title,
          pollId: poll.id,
        }))
        await Option.createMany(optionsData)
      }

      await trx.commit()
      await poll.load('options')
      return poll
    } catch (error) {
      await trx.rollback()
      throw new Error(`Error creating poll: ${error.message}`)
    }
  }
  async getBy(
    id?: number,
    title?: string,
    description?: string,
    deviceIdOwner?: string
  ): Promise<Poll | null> {
    const query = Poll.query()

    if (id !== undefined) {
      query.where('id', id)
    }

    if (title !== undefined) {
      query.whereILike('title', title)
    }

    if (description !== undefined) {
      query.whereILike('description', description)
    }

    if (deviceIdOwner !== undefined) {
      query.where('deviceIdOwner', deviceIdOwner)
    }

    return await query.first()
  }

  async find(id: number): Promise<Poll | null> {
    return await Poll.find(id)
  }

  async update(pollId: number, pollDto: Partial<UpdatePollData>): Promise<Poll> {
    const poll = await this.getBy(pollId)
    if (!poll) {
      throw new Error('Poll not found')
    }
    poll.merge(pollDto)
    const pollUpdated = await poll.save()
    return pollUpdated
  }

  async vote({ pollId, optionId, deviceId }: VoteData) {
    const existingVote = await Choice.query()
      .where('ip_device', deviceId)
      .whereHas('option', (query) => {
        query.where('poll_id', pollId)
      })
      .first()

    if (existingVote) {
      throw new Error('You have already voted in this poll')
    }

    const trx = await Database.transaction()

    try {
      await Choice.create(
        {
          optionId,
          ipDevice: deviceId,
        },
        { client: trx }
      )

      await trx.commit()

      const poll = await Poll.query()
        .where('id', pollId)
        .preload('options', (query) => {
          query.withCount('choices')
        })
        .firstOrFail()

      return poll
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
