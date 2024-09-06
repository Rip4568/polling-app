import factory from '@adonisjs/lucid/factories'
import Poll from '#models/poll'

export const PollFactory = factory
  .define(Poll, async ({ faker }) => {
    return {}
  })
  .build()