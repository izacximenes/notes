import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  /**
   * register
   */
  public async register({ request, response }: HttpContextContract) {
    const postRegisterSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
        rules.maxLength(255),
      ]),
      password: schema.string({}, [rules.minLength(6)]),
    })

    const payload = await request.validate({ schema: postRegisterSchema })

    const user = new User()
    user.merge(payload)
    user.save()

    return response.ok({
      message: 'success',
    })
  }

  /**
   * login
   */
  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.use('api').attempt(email, password)

    return token.toJSON()
  }

  /**
   * show
   */
  public async show({ auth }: HttpContextContract) {
    return auth.user
  }

  /**
   * logout
   */
  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').logout()
    return response.ok({
      message: 'success',
    })
  }
}
