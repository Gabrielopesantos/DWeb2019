var express = require('express');
var router = express.Router();
var Premios = require('../controllers/prizes');

router.get('/premios', function (req, res) {
  var query = req.query;
  if (query.hasOwnProperty('categoria')) {
    Premios.listarPorCategoria(categoria, data)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (query.hasOwnProperty('categoria') || query.hasOwnProperty('data')) {
    Premios.listarPorCategoriaData(categoria, data)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error))
  }
  else {
    Premios.listar()
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error))
  }
});

router.get('/premios/:idPremio', function (req, res) {
  Premios.consultar(req.params.idPremio)
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).jsonp(error))
});

router.get('/categorias', function (req, res) {
  Premios.listarCategorias()
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).jsonp(error))
})

router.get('/laureados', function (req, res) {
  Premios.listarLaureados()
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).jsonp(error))
})

module.exports = router;