import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export interface PollInterface {
  title: string
  banner: string | null | undefined
  description: string | null | undefined
  dateExpiration?: DateTime
  dateBegin?: DateTime
  deviceIdOwner?: string
  options: { title: string }[]
}

export const createPollValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().nullable(),
    banner: vine.string().trim().optional(),
    dateExpiration: vine
      .date()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null))
      .optional(),
    dateBegin: vine
      .date()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null))
      .optional(),
    options: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1).maxLength(255),
        })
      )
      .minLength(2)
      .maxLength(10),
    deviceIdOwner: vine.string().trim().minLength(1).maxLength(255),
  })
)

export const updatePollValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255).optional(),
    description: vine.string().trim().nullable().optional(),
    banner: vine.string().trim().optional(),
    dateExpiration: vine
      .date()
      .optional()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
    dateBegin: vine
      .date()
      .optional()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
    deviceIdOwner: vine.string().trim().optional(),
    options: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1).maxLength(255),
        })
      )
      .minLength(2)
      .maxLength(10)
      .optional(),
  })
)
