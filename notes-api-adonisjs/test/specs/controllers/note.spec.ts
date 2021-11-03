import Database from '@ioc:Adonis/Lucid/Database'
import { NoteFactory } from 'Database/factories/noteFactory'
import test from 'japa'
import { request, userTest } from 'Test/utils'
import faker from 'faker'
import Note from 'App/Models/Note'

test.group('/notes', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[index] - should return list of Note', async (assert) => {
    const user = await userTest()
    const createList = await NoteFactory.merge({ user_id: user.user.id }).createMany(10)
    const { body } = await request
      .get('/notes')
      .set('Authorization', `${user.type} ${user.token}`)
      .expect(200)

    assert.isArray(body)
    assert.lengthOf(body, createList.length)
    body.forEach((note: Note) => {
      assert.exists(note.id)
      assert.exists(note.text)
    })
  })

  test('[index] - should return list of Note current logged user', async (assert) => {
    const user = await userTest()
    const user2 = await userTest()
    const createListUserLogged = await NoteFactory.merge({ user_id: user.user.id }).createMany(5)
    await NoteFactory.merge({ user_id: user2.user.id }).createMany(2)
    const { body } = await request
      .get('/notes')
      .set('Authorization', `${user.type} ${user.token}`)
      .expect(200)

    assert.lengthOf(body, createListUserLogged.length)
  })

  test('[index] - should return list of Note filted by queryString search', async (assert) => {
    const user = await userTest()
    const searchList = await NoteFactory.merge({
      user_id: user.user.id,
      text: 'search',
    }).createMany(5)
    await NoteFactory.merge({ user_id: user.user.id, text: 'not Match' }).createMany(2)
    const { body } = await request
      .get('/notes')
      .set('Authorization', `${user.type} ${user.token}`)
      .query({
        search: 'search',
      })
      .expect(200)

    assert.lengthOf(body, searchList.length)
  })
  test('[store] - should be create Note', async (assert) => {
    const user = await userTest()
    const payload = {
      text: faker.lorem.lines(1),
    }
    const { body } = await request
      .post('/notes')
      .set('Authorization', `${user.type} ${user.token}`)
      .send(payload)
      .expect(200)
    const note = await Note.findBy('text', payload.text)
    assert.equal(body.text, payload.text)
    assert.isNotNull(note)
    assert.equal(body.id, note?.id)
  })

  test('[show] - should be return Note by id', async (assert) => {
    const user = await userTest()
    const noteFactory = await NoteFactory.merge({ user_id: user.user.id }).create()
    const { body } = await request
      .get(`/notes/${noteFactory.id}`)
      .set('Authorization', `${user.type} ${user.token}`)
      .expect(200)

    assert.equal(body.text, noteFactory.text)
    assert.equal(body.id, noteFactory?.id)
  })

  test('[show] - should be return error 404 when not found Note', async () => {
    const user = await userTest()
    await request.get(`/notes/200`).set('Authorization', `${user.type} ${user.token}`).expect(404)
  })

  test('[update] - should be update Note', async (assert) => {
    const user = await userTest()
    const noteFactory = await NoteFactory.merge({ user_id: user.user.id }).create()
    const newText = faker.lorem.lines(1)

    const { body } = await request
      .put(`/notes/${noteFactory.id}`)
      .set('Authorization', `${user.type} ${user.token}`)
      .send({
        text: newText,
      })
      .expect(200)

    assert.equal(body.text, newText)
  })

  test('[delete] - should be delete Note', async (assert) => {
    const user = await userTest()
    const noteFactory = await NoteFactory.merge({ user_id: user.user.id }).create()

    await request
      .delete(`/notes/${noteFactory.id}`)
      .set('Authorization', `${user.type} ${user.token}`)
      .expect(200)

    const note = await Note.find(noteFactory.id)

    assert.isNull(note)
  })
})
