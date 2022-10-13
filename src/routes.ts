import { Router } from "express"
import GamesController from "./controllers/GamesController"


const router = Router()

router.get('/games',GamesController.index)
router.get('/game/:concurso',GamesController.findByConcurso)
router.post('/game',GamesController.create)

export default router