import type { HttpContext } from '@adonisjs/core/http'
import Simulation from '#models/simulation'
import Client from '#models/client'
import { createSimulationValidator, updateSimulationValidator } from '#validators/simulation'

export default class SimulationsController {
  async index({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const clientId = params.clientId

    // Vérifier que le client appartient à l'utilisateur
    const client = await Client.query()
      .where('id', clientId)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    const simulations = await Simulation.query().where('client_id', clientId)

    return response.json({
      simulations: simulations.map(simulation => ({
        id: simulation.id,
        name: simulation.name,
        result: simulation.result,
        clientId: simulation.clientId,
        createdAt: simulation.createdAt,
        updatedAt: simulation.updatedAt,
      })),
    })
  }

  async store({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const clientId = params.clientId
    const payload = await request.validateUsing(createSimulationValidator)

    // Vérifier que le client appartient à l'utilisateur
    const client = await Client.query()
      .where('id', clientId)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    const simulation = await Simulation.create({
      ...payload,
      clientId: clientId,
    })

    return response.status(201).json({
      message: 'Simulation created successfully',
      simulation: {
        id: simulation.id,
        name: simulation.name,
        result: simulation.result,
        clientId: simulation.clientId,
        createdAt: simulation.createdAt,
        updatedAt: simulation.updatedAt,
      },
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const { clientId, id } = params

    // Vérifier que le client appartient à l'utilisateur
    const client = await Client.query()
      .where('id', clientId)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    const simulation = await Simulation.query()
      .where('id', id)
      .where('client_id', clientId)
      .first()

    if (!simulation) {
      return response.status(404).json({
        message: 'Simulation not found',
      })
    }

    return response.json({
      simulation: {
        id: simulation.id,
        name: simulation.name,
        result: simulation.result,
        clientId: simulation.clientId,
        createdAt: simulation.createdAt,
        updatedAt: simulation.updatedAt,
      },
    })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const { clientId, id } = params
    const payload = await request.validateUsing(updateSimulationValidator)

    // Vérifier que le client appartient à l'utilisateur
    const client = await Client.query()
      .where('id', clientId)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    const simulation = await Simulation.query()
      .where('id', id)
      .where('client_id', clientId)
      .first()

    if (!simulation) {
      return response.status(404).json({
        message: 'Simulation not found',
      })
    }

    simulation.merge(payload)
    await simulation.save()

    return response.json({
      message: 'Simulation updated successfully',
      simulation: {
        id: simulation.id,
        name: simulation.name,
        result: simulation.result,
        clientId: simulation.clientId,
        createdAt: simulation.createdAt,
        updatedAt: simulation.updatedAt,
      },
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const { clientId, id } = params

    // Vérifier que le client appartient à l'utilisateur
    const client = await Client.query()
      .where('id', clientId)
      .where('user_id', user.id)
      .first()

    if (!client) {
      return response.status(404).json({
        message: 'Client not found',
      })
    }

    const simulation = await Simulation.query()
      .where('id', id)
      .where('client_id', clientId)
      .first()

    if (!simulation) {
      return response.status(404).json({
        message: 'Simulation not found',
      })
    }

    await simulation.delete()

    return response.json({
      message: 'Simulation deleted successfully',
    })
  }
}