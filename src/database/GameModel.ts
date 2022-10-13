import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const GameModel = new Schema({
    concurso: {
        type: Number,
        unique: true,
    },
    dezena1: Number,
    dezena2: Number,
    dezena3: Number,
    dezena4: Number,
    dezena5: Number,
    data: Date,
},
{timestamps: true})

export default mongoose.model('Game',GameModel)