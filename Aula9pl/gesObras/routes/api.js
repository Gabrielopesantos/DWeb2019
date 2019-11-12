var express = require('express');
var router = express.Router();

var Obras = require('../controllers/obras')

/* GET users listing. */
router.get('/obras', function (req, res, next) {
  var query = req.query;
  console.log(query)
  if (query.hasOwnProperty('ano')) {
    Obras.listar_obras_ano(query.ano)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else if (query.hasOwnProperty('compositor') || query.hasOwnProperty('duracao')) {
    Obras.listar_obras_compositor_duracao(query.compositor, query.duracao)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else if (query.hasOwnProperty('periodo')) {
    Obras.listar_obras_periodo(query.periodo)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  } else {
    Obras.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
});



router.get('/compositores', function (req, res, next) {
  Obras.listar_compositores()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/periodos', function (req, res, next) {
  Obras.listar_periodos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/obras/:idObra', function (req, res, next) {
  var idObra = req.params.idObra;
  Obras.consultar(idObra)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;