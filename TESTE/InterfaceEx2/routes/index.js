var express = require('express');
var router = express.Router();
var axios = require('axios');
var apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"


router.get('/', function (req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apikey)
    .then(dados => res.render('index', { entidades: dados.data }))
    .catch(erro => res.render('error', { error: erro }))

});

/* GET Entidade por ID. */
router.get('/:id', function (req, res, next) {
  var dados1, dados2, dados3, dados4;
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=' + apikey)
    .then(dados => {
      dados1 = dados.data
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=' + apikey)
        .then(dados => {
          dados2 = dados.data
          axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=' + apikey)
            .then(dados => {
              dados3 = dados.data
              axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=' + apikey)
                .then(dados => {
                  dados4 = dados.data
                  console.log(dados4)
                  res.render('pagina', { e: dados1, e2: dados2, e3: dados3, e4: dados4 })
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
module.exports = router;
