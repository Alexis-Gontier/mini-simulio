import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100),
    email: vine.string().email().normalizeEmail(),
  })
)

export const updateClientValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100).optional(),
    email: vine.string().email().normalizeEmail().optional(),
  })
)