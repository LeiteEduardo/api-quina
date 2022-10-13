import { Request, Response } from 'express'
import GameModel from '../database/GameModel'

const GamesController = {

    async index(req:Request,res:Response): Promise<Response>{
        let games = await GameModel.find()
        return res.json(games)
    },
    async findByConcurso(req:Request,res:Response): Promise<Response>{
        const { concurso } = req.params
        let games = await GameModel.find( {concurso: concurso} )
        return res.json(games)
    },
    async create(req:Request,res:Response): Promise<Response>{
        const { concurso, data, dezena1, dezena2, dezena3, dezena4, dezena5, dataProxGame, } = req.body
        let games = await GameModel.create( req.body )
        return res.json(games)
    },
}

export default GamesController