import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories/userFactory'
import test from 'japa'
import { request, userTest } from 'Test/utils'
import faker from 'faker'

test.group('auth', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[login] - ensure login is working  with credentials', async (assert) => {
    const password = 'secret'
    const user = await UserFactory.merge({ password }).create()
    const { body } = await request
      .post('/login')
      .send({
        email: user.email,
        password,
      })
      .expect(200)

    assert.exists(body.token)
  })

  test('[register] - ensure register is working', async (assert) => {
    const { body } = await request
      .post('/register')
      .send({
        email: faker.internet.email(),
        password: 'secret',
        name: faker.internet.userName(),
      })
      .expect(200)

    assert.exists(body.message)
  })

  test('[register] - ensure register name  is required', async (assert) => {
    const { body } = await request
      .post('/register')
      .send({
        email: faker.internet.email(),
        password: 'secrete',
      })
      .expect(422)

    assert.equal(body.errors[0].field, 'name')
  })

  test('[register] - ensure register email  is required', async (assert) => {
    const { body } = await request
      .post('/register')
      .send({
        name: faker.internet.userName(),
        password: 'secrete',
      })
      .expect(422)

    assert.equal(body.errors[0].field, 'email')
  })

  test('[register] - ensure register password  is required', async (assert) => {
    const { body } = await request
      .post('/register')
      .send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
      })
      .expect(422)

    assert.equal(body.errors[0].field, 'password')
  })

  test('[logout] - should able to delete token after logout', async (assert) => {
    const user = await userTest()
    const { body } = await request
      .delete('/logout')
      .set('Authorization', `${user.type} ${user.token}`)
      .expect(200)

    const token = await Database.from('api_tokens').where({ user_id: user.user.id }).first()

    assert.exists(body.message)
    assert.isNull(token)
  })

  test('[info] - should able to return user info logged', async (assert) => {
    const user = await userTest()
    const { body } = await request
      .get('/info')
      .set('Authorization', `${user.type} ${user.token}`)

      .expect(200)

    assert.equal(body.name, user.user.name)
    assert.equal(body.email, user.user.email)
  })

  test('[logout] - ensure logout is not working without credentials', async () => {
    await request.delete('/logout').expect(401)
  })
})
