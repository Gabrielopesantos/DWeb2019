var express = require('express');
var router = express.Router();
var axios = require('axios')
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ';

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apiKey)
    .then(dados => res.render('index', { entidades: dados.data }))
    .catch(erro => res.render('error', { error: erro }))

});


/* GET Entidade por ID. */
router.get('/:id', function (req, res, next) {
  var dados1, dados2, dados3, dados4;
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
    .then(dados => {
      dados1 = dados.data;
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
        .then(dados => {
          dados2 = dados.data
          axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
            .then(dados => {
              dados3 = dados.data
              axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
                .then(dados => {
                  dados4 = dados.data
                  console.log(dados4)
                  res.render('info', { e: dados1, e2: dados2, e3: dados3, e4: dados4 })
                })
                .catch(erro => {
                  res.render('error', { error: erro })
                })
            })
            .catch(erro => {
              res.render('error', { error: erro })
            })
        })
        .catch(erro => {
          res.render('error', { error: erro })
        })
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

/* GET Entidade por ID. */
router.get('/:id/tipologias', function (req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ')
    .then(dados => {
      res.render('listar_tipologias', { tipologias: dados.data })
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});
module.exports = router;
