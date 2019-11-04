var mongoose = require('mongoose');
var Filme = require('../models/filme')

const Filmes = module.exports


Filmes.listar = () => {
    return Filme
        .find()
        .sort({ title: 1 })
        .limit(100)
        .exec()
}

Filmes.consultar = fid => {
    return Filme
        .findOne({ _id: fid })
        .exec()
}

Filmes.inserir = (filme) => {
    const novoFilme = new Filme({
        _id: new mongoose.Types.ObjectId,
        title: filme.title,
        year: filme.year,
        cast: filme.cast,
        genres: filme.genres
    })

    return novoFilme.save()
}

Filmes.remover = (fid) => {
    return Filme
        .findOneAndDelete({ _id: fid })
        .exec()

}


Filmes.atualizar = (fid, data) => {
    return Filme
        .findOneAndUpdate({ _id: fid }, data)
        .exec();
};