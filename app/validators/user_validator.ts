import vine from '@vinejs/vine'

export const createUserValidator = vine.object({
  username: vine.string().trim().minLength(1).maxLength(255),
  fullName: vine.string().trim().minLength(1).maxLength(255).nullable(),
  password: vine.string().trim().minLength(1).maxLength(255),
})

export const updateUserValidator = vine.object({
  username: vine.string().trim().minLength(1).maxLength(255).optional().optional(),
  fullName: vine.string().trim().minLength(1).maxLength(255).nullable().optional(),
  password: vine.string().trim().minLength(1).maxLength(255).optional().optional(),
})
