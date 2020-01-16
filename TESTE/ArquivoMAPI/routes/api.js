var express = require('express');
var router = express.Router();

var Obras = require('../controllers/obras')


router.get('/obras/', function (req, res, next) {
  if (req.query.compositor) {
    Obras.listar_compositor(req.query.compositor)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else if (req.query.instrumento) {
    Obras.listar_instrumento(req.query.instrumento)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else {
    Obras.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
});


router.get('/obras/:id', function (req, res, next) {
  Obras.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


router.get('/tipos', function (req, res, next) {
  Obras.listar_tipos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


router.get('/obrasQuant', function (req, res, next) {
  Obras.listar_numparts()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});


module.exports = router;
