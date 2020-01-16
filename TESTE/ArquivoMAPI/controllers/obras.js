var Obra = require('../models/obras')

module.exports.listar = () => {
    return Obra
        .find({}, { '_id': true, 'titulo': true, 'tipo': true, "compositor:": true })
        .exec()
}

module.exports.consultar = id => {
    return Obra
        .find({ _id: id })
        .exec();
}

module.exports.listar_tipos = () => {
    return Obra
        .find({}, { '_id': 0, 'periodo': 1 })
        .distinct('tipo')
        .exec()
}

module.exports.listar_compositor = compositor => {
    return Obra
        .find({ compositor: compositor })
        .exec();
}

module.exports.listar_numparts = () => {
    return Obra
        .aggregate([{ $unwind: "$instrumentos.instrumento" }, { $group: { _id: { "id": "$_id", "titulo": "$titulo" }, count: { $sum: 1 } } }])
        .exec();
}