import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'choices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('ip_device')
      table.integer('option_id')
      table.foreign('option_id').references('options.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
