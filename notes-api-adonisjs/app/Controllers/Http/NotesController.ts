import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema } from '@ioc:Adonis/Core/Validator'
import Note from 'App/Models/Note'
interface QsIndex {
  search: string
  orderBy: 'update_at' | 'update_at'
  order: 'desc' | 'asc'
}

const noteSchema = schema.create({
  text: schema.string(),
})

export default class NotesController {
  public async index({ request, auth }: HttpContextContract) {
    const query = Note.query()
    const qs = request.qs() as QsIndex
    const orderBy = qs.orderBy
    const order = qs.order
    const search = qs.search

    if (orderBy) {
      query.orderBy(orderBy, order)
    }

    if (search?.trim().length > 0) {
      query.where('text', 'LIKE', `%${search}%`)
    }

    query.where('user_id', auth.user?.id!)

    query.preload('user')
    return await query.exec()
  }

  public async create() {}

  public async store({ request, auth }: HttpContextContract) {
    const { text } = await request.validate({ schema: noteSchema })

    const note = await Note.create({
      text,
      user_id: auth.user?.id,
    })

    return note.toJSON()
  }

  public async show({ request, auth }: HttpContextContract) {
    return await Note.query()
      .where({
        id: request.param('id'),
        user_id: auth.user?.id,
      })
      .firstOrFail()
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, auth }: HttpContextContract) {
    const note = await Note.query()
      .withScopes((scopes) => scopes.owner(auth.user!))
      .where('id', request.param('id'))
      .firstOrFail()

    note.merge({
      text: request.input('text'),
    })

    await note.save()
    return note.toJSON()
  }

  public async destroy({ request, auth }: HttpContextContract) {
    const note = await Note.query()
      .withScopes((scopes) => scopes.owner(auth.user!))
      .where('id', request.param('id'))
      .firstOrFail()

    await note.delete()
  }
}
