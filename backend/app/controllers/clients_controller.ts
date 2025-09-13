import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import { createClientValidator, updateClientValidator } from '#validators/client'

export default class ClientsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const clients = await Client.query().where('user_id', user.id)

    return response.json({
      clients: clients.map(client => ({
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      })),
    })
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createClientValidator)
    
    const client = await Client.create({
      ...payload,
      userId: user.id,
    })

    return response.status(201).json({
      message: 'Client created successfully',
      client: {
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      },
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const client = await Client.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    return response.json({
      client: {
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      },
    })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(updateClientValidator)
    
    const client = await Client.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    client.merge(payload)
    await client.save()

    return response.json({
      message: 'Client updated successfully',
      client: {
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      },
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const client = await Client.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    await client.delete()

    return response.json({
      message: 'Client deleted successfully',
    })
  }
}