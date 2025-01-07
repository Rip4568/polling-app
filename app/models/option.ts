import Poll from '#models/poll'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Image from './image.js'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare pollId: number

  @belongsTo(() => Image)
  declare icon: BelongsTo<typeof Image>

  @column()
  declare description: string | null

  @belongsTo(() => Poll)
  declare poll: BelongsTo<typeof Poll>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
