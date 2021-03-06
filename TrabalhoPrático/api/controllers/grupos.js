var Grupo = require('../models/grupos')
module.exports.listar = () => {
    return Grupo
        .find()
        .exec()
}

module.exports.listarPorId = (gid) => {
    return Grupo
        .findById(gid)
        .exec()
}

module.exports.listarMembros = (gid) => {
    return Grupo
        .find({ '_id': gid }, { _id: 0, membros: 1 })
}

module.exports.inserir = grupo => {
    var novo = new Grupo(grupo)
    return novo.save()
}

module.exports.adicionarMembro = (gid, idMembro) => {
    return Grupo
        .update({ "_id": gid }, { $push: { "membros": idMembro } })
}

module.exports.removerMembro = (gid, idMembro) => {
    return Grupo
        .update({ "_id": gid }, { $pull: { "membros": idMembro } })
}

module.exports.updateNome = (gid, nome) => {
    return Grupo
        .update({ "_id": gid }, { "nome": nome })
}

module.exports.updateDescricao = (gid, descricao) => {
    return Grupo
        .update({ "_id": gid }, { "descricao": descricao })
}
