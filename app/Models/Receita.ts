import { DateTime } from 'luxon'
import { 
  BaseModel,column
} from '@ioc:Adonis/Lucid/Orm'


export default class Receitas extends BaseModel {
  @column({ isPrimary: true })
  public id: number 

  @column()
  public titulo: string

  @column()
  public tipo: string

  @column()
  public receita: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}