 
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Receitas from '../../Models/Receita'
import ReceitasValidator from '../../Validators/ReceitasValidator'


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
       const { titulo,receita,tipo } = await request.validate(ReceitasValidator)
       try {
         const receitas = await Receitas.findOrFail(params.id)
         receitas.titulo = titulo
         receitas.receita = receita
         receitas.tipo = tipo
         await receitas.save()
         return receitas
   
       } catch (error) {
         response.status(400).send("Receita não encontrada!!!")
       }
     }
   
     public async destroy({ params, response }: HttpContextContract) {
       try {
         const receitas = await Receitas.findOrFail(params.id)
         await receitas.delete()
         return receitas
       } catch (error) {
         response.status(400).send("Receita não encontrada!!!")
       }
     }
   }
   