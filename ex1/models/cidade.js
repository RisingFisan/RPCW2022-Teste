const mongoose = require('mongoose')

const CidadeSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    população: Number,
    descrição: String,
    distrito: String
})

module.exports = mongoose.model("cidade", CidadeSchema)