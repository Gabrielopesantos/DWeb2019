var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function (req, res) {
  Filmes.listar()
    .then(dados => res.render('index', { lista: dados }))
    .catch(erro => res.render('error', { message: "Erro na leitura da BD", error: erro }))
});


router.get('/:idFilme', function (req, res) {
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


router.post('/', (req, res) => {
  console.log('Inserção de um filme')

  let filme = {
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast.split(','),
    genres: req.body.genres.split(','),
  }

  console.log(filme)
  Filmes.inserir(filme)
    .then(resultado => {
      console.log('Inserção feito com sucesso' + resultado);
      res.redirect('/filmes/')
    })
    .catch(erro => {
      console.log(erro);
      res.render('error', { error: erro });
    });
})

router.delete('/:idFilme', (req, res) => {
  console.log('Request para remoção do filme com id ' + req.params.idFilme);

  let idFilme = req.params.idFilme;

  Filmes.remover(idFilme)
    .then(resultado => {
      console.log('resultado: ' + resultado);
      res.rendirect('/');
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});


router.get('/editar/:idFilme', function (req, res, next) {
  var idFilme = req.params.idFilme
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('editar-filme', { f: dados }))
    .catch(erro => res.render('error', { message: "Erro na leitura da BD", error: erro }))
});

router.put('/:idFilme', (req, res) => {
  console.log(`request de atualização do Filme com id ${req.params.idFilme}`);

  let idFilme = req.params.idFilme;
  let filme = {
    title: req.body.title,
    year: req.body.year,
    cast: req.body.cast,
    genres: req.body.genres
  };
  console.log(filme)

  Filmes.atualizar(idFilme, filme)
    .then(resultado => {
      console.log(resultado);
      res.redirect('/');
    })
    .catch(erro => {
      console.log(erro);
      res.render('error', { error: erro });
    });
});

module.exports = router;
