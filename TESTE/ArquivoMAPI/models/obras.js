var mongoose = require('mongoose')

var instrumentoSchema = new mongoose.Schema({
    designacao: String
})


var obraSchema = new mongoose.Schema({
    _id: String,
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [instrumentoSchema],
})

module.exports = mongoose.model('obras', obraSchema)