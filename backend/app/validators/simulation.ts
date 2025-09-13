import vine from '@vinejs/vine'

export const createSimulationValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100),
    result: vine.any().optional(),
  })
)

export const updateSimulationValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100).optional(),
    result: vine.any().optional(),
  })
)