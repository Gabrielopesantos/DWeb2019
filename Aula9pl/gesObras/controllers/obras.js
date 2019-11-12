var Obra = require('../models/obras')

module.exports.listar = () => {
    return Obra
        .find()
        .exec()
}

module.exports.listar_obras_ano = ano => {
    return Obra
        .find({ anoCriacao: ano })
        .exec();
}

module.exports.listar_obras_compositor_duracao = (compositor, duracao) => {
    return Obra
        .find({ compositor: compositor, duracao: { $gt: duracao } })
        .exec()
}

module.exports.listar_obras_periodo = periodo => {
    return Obra
        .find({ periodo: periodo })
        .exec();
}

module.exports.consultar = id => {
    return Obra
        .find({ _id: id })
        .exec()
}

module.exports.listar_compositores = () => {
    return Obra
        .find({}, { '_id': 0, 'compositor': 1 })
        .distinct('compositor')
        .exec();
}

module.exports.listar_periodos = () => {
    return Obra
        .find({}, { '_id': 0, 'periodo': 1 })
        .distinct('periodo')
        .exec();
}
