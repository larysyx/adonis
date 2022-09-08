 
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Receitas from '../../Models/Receitas'
import ViagemValidator from '../../Validators/ReceitasValidator'


export default class ReceitasController {
     public async index({ }: HttpContextContract) {
       const receitas = await Receitas.all()
       return receitas
     }
   
     public async store({ request }: HttpContextContract) {
       const tipo = await request.validate(ReceitasValidator)
       const receitas = await Receitas.create({ ...tipo })
       return receitas
     }
   
     public async show({ params, response }: HttpContextContract) {
       try {
         const receitas = await Receitas.findOrFail(params.id)
         return receitas
       } catch (error) {
         response.status(400).send("Receita não encontrada!!!")
       }
     }
   
     public async update({ request, params, response }: HttpContextContract) {
       const { name } = await request.validate(ReceitasValidator)
       try {
         const receitas = await Receitas.findOrFail(params.id)
         receitas.name = name
         await receitas.save()
         return receitas
   
       } catch (error) {
         response.status(400).send("Receita não encontrada!!!")
       }
     }
   
     public async destroy({ params, response }: HttpContextContract) {
       try {
         const Receitas = await Receitas.findOrFail(params.id)
         await Receitas.delete()
         return Receitas
       } catch (error) {
         response.status(400).send("Receita não encontrada!!!")
       }
     }
   }
   