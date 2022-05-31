const mongoose = require('mongoose')

const LigacaoSchema = new mongoose.Schema({
    _id: String, 
    origem: String,
    destino: String,
    distância: mongoose.Types.Decimal128
})

module.exports = mongoose.model("ligacao", LigacaoSchema, "ligacoes")