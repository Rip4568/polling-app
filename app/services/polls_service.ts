//import { typeInferValidatorType } from '@vinejs/vine';
import Poll from '#models/poll'
import { DateTime } from 'luxon'

interface CreatePollData {
  title: string
  description: string | null | undefined
  dateExpiration: DateTime | null | undefined
  dateBegin: DateTime | null | undefined
  options: { title: string }[]
  deviceIdOwner: string
}

interface UpdatePollData {
  title?: string
  description?: string | null
  banner?: string | null
  dateExpiration?: DateTime | null
  dateBegin?: DateTime | null
  deviceIdOwner?: string
  options?: { title: string }[]
}

export default class PollsService {
  /**
   * Converte uma string, DateTime, null ou undefined para DateTime ou null.
   *
   * @param date - A data a ser convertida. Pode ser uma string ISO, um objeto DateTime, null ou undefined.
   * @returns Um objeto DateTime se a conversão for bem-sucedida, ou null caso contrário.
   */
  private toDateTime(date: string | DateTime | null | undefined): DateTime | null {
    if (date instanceof DateTime) return date
    if (typeof date === 'string') return DateTime.fromISO(date)
    return null
  }
  public async all(): Promise<Poll[]> {
    return await Poll.all()
  }

  public async paginatePolls(page: number, perPage: number) {
    const polls = await Poll.query().paginate(page, perPage)
    return polls
  }

  public async create(data: CreatePollData): Promise<Poll> {
    const poll = await Poll.create({
      title: data.title,
      description: data.description,
      //! caso utilize o SQLite, o dateBegin e dateExpiration não podem ser null e tipo Datetime ou date, so aceita string
      //? dateBegin: data.dateBegin ? data.dateBegin.toSQL() : DateTime.now().toSQL(),
      dateBegin: data.dateBegin ? data.dateBegin : DateTime.now(),
      dateExpiration: data.dateExpiration ? data.dateExpiration : DateTime.now().plus({ days: 7 }),
      deviceIdOwner: data.deviceIdOwner,
    })

    await poll.related('options').createMany(data.options)
    return poll.refresh()
  }

  public async getBy(
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

  public async find(id: number): Promise<Poll | null> {
    return await Poll.find(id)
  }

  public async update(pollId: number, pollDto: Partial<UpdatePollData>): Promise<Poll> {
    const poll = await this.getBy(pollId)
    if (!poll) {
      throw new Error('Poll not found')
    }
    poll.merge(pollDto)
    const pollUpdated = await poll.save()
    return pollUpdated
  }
}
