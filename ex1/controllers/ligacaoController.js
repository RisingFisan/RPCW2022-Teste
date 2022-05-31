const Ligacao = require('../models/ligacao')
const Cidade = require('../models/cidade')

module.exports.list_by_origin = (origem) => {
    return Ligacao.aggregate([{
        $match: {origem: origem}
    }, {
        $lookup: {
            'from': Cidade.collection.name,
            'localField': "destino",
            "foreignField": "_id",
            "as": "destino"
        }
    },{
        $project: {
            "id_ligacao": "$_id",
            "id_destino": {$first: "$destino._id"},
            "nome_destino": {$first: "$destino.nome"},
            "_id": 0
        }
    }]).exec()
}

module.exports.list_by_dist = (dist) => {
    return Ligacao.aggregate([{
        $match: {distância: {$gt: dist}}
    }, {
        $lookup: {
            'from': Cidade.collection.name,
            'localField': "destino",
            "foreignField": "_id",
            "as": "destino"
        }
    }, {
        $lookup: {
            'from': Cidade.collection.name,
            'localField': "origem",
            "foreignField": "_id",
            "as": "origem"
        }
    },{
        $project: {
            "id_ligacao": "$_id",
            "id_origem": {$first: "$origem._id"},
            "nome_origem": {$first: "$origem.nome"},
            "id_destino": {$first: "$destino._id"},
            "nome_destino": {$first: "$destino.nome"},
            "_id": 0
        }
    }]).exec()
}