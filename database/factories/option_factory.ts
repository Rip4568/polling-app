import factory from '@adonisjs/lucid/factories'
import Option from '#models/option'

export const OptionFactory = factory
  .define(Option, async ({ faker }) => {
    return {}
  })
  .build()