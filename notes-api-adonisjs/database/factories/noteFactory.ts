import Factory from '@ioc:Adonis/Lucid/Factory'
import Note from 'App/Models/Note'
import { UserFactory } from './userFactory'

export const NoteFactory = Factory.define(Note, ({ faker }) => {
  return {
    text: faker.lorem.lines(2),
  }
})
  .relation('user', () => UserFactory)
  .build()
