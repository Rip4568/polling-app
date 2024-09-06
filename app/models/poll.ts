import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Option from './option.js'

export default class Poll extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare banner: string | undefined | null

  @column()
  declare description: string | undefined | null

  @column.dateTime()
  declare dateExpiration: DateTime | undefined | null

  @column.dateTime()
  declare dateBegin: DateTime | undefined | null

  @column({ columnName: 'multiple_choices_avaliable' })
  declare multipleChoicesAvaliable: boolean

  @column()
  declare deviceIdOwner: string

  @hasMany(() => Option)
  declare options: HasMany<typeof Option>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
