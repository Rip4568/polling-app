import factory from '@adonisjs/lucid/factories'
import Choice from '#models/choice'

export const ChoiceFactory = factory
  .define(Choice, async ({ faker }) => {
    return {}
  })
  .build()