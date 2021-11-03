import User from 'App/Models/User'
import { UserFactory } from 'Database/factories/userFactory'
import { request } from './supertest'

interface Token {
  token: string
  type: string
  user: User
}

export const userTest = async (): Promise<Token> => {
  const password = 'secret'
  const user = await UserFactory.merge({ password }).create()
  const { body } = await request
    .post('/login')
    .send({
      email: await user.email,
      password,
    })
    .expect(200)

  return { type: body.type, token: body.token, user }
}
