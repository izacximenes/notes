import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Note extends BaseModel {
  public static owner = scope((query, user: User) => {
    query.where('user_id', user.id)
  })

  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column()
  public user_id: number

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
