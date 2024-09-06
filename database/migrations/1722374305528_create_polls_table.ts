import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'polls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('device_id_owner')
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('slug').notNullable()
      table.string('banner').nullable()
      table.boolean('is_active').defaultTo(true)
      table.boolean('multiple_choices_avaliable').defaultTo(false)
      table.timestamp('date_expiration')
      table.timestamp('date_begin')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
