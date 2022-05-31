const Cidade = require('../models/cidade')

module.exports.list = () => {
    return Cidade.find({},{nome:1, distrito:1}).exec()
}

module.exports.lookup = (id) => {
    return Cidade.findById(id).exec()
}

module.exports.city_names = () => {
    return Cidade.distinct("nome").exec()
}

module.exports.list_by_district = (distrito) => {
    return Cidade.find({distrito: distrito},{nome:1}).exec()
}

module.exports.district_list = () => {
    return Cidade.aggregate([{
        $group: {
            _id: "$distrito", 
            "cidades": {$addToSet: {"_id": "$_id", "nome": "$nome"}}}
    },{
        $project: {
            "nome_distrito": "$_id",
            "_id": 0,
            "cidades": 1
        }
    }]).exec()
}