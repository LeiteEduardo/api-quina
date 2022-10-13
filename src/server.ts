import express, { Request, Response } from 'express'
import moongose from 'mongoose'
import router from './routes'
import axios from "axios";

//const job = nodeSchedule.scheduleJob('*/15 23 * * 1-6', () => {

const app = express()
app.use(express.json())
app.use(router)

moongose.connect('mongodb+srv://user:admin10@cluster0.qadnzlu.mongodb.net/?retryWrites=true&w=majority')
.then((data) => {
    console.log('MongoDB Connection Succeeded')
})
.catch((err) => {
    console.log('Error DB Connection ',err.message)
})

app.get('/',(req:Request,res:Response) => {
    return res.send('Hellow World!')
})

app.listen(3333)

const nodeSchedule = require('node-schedule')
nodeSchedule.scheduleJob('*/15 22 * * 1-6', async () => {
    console.log(Date())

    const latestGame = await axios.get("https://loteriascaixa-api.herokuapp.com/api/quina/latest")

    var i = 1

    while ( i !== Number(latestGame.data.concurso) )
    {
        const gameInDB = await axios.get("http://localhost:3333/game/"+i)
        
        if (gameInDB.data.length == 0)
        {
            const game = await axios.get("https://loteriascaixa-api.herokuapp.com/api/quina/"+i)
            
            await axios.post('http://localhost:3333/game', 
            { 
                concurso: game.data.concurso,
                dezena1: game.data.dezenas[0],
                dezena2: game.data.dezenas[1],
                dezena3: game.data.dezenas[2],
                dezena4: game.data.dezenas[3],
                dezena5: game.data.dezenas[4],
                data: Date.parse(game.data.data.replaceAll("/","-")),
            })
            console.log('Jogo ' + game.data.concurso + ' inserido com Sucesso!')
        }    
        i++
    }
})