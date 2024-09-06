import Option from '#models/option'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Choice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Option)
  declare option: BelongsTo<typeof Option>

  @column({ columnName: 'ip_device' })
  declare ipDevice: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
