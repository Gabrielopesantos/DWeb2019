var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
var nanoid = require('nanoid')

var myBD = __dirname + "/../data.json"
/*
jsonfile.readFile(myBD, (erro, musicas) => {
  if (!erro) {
    for (i = 0; i < musicas.length; i++) {
      musicas[i].id = nanoid();


    }
    console.log('Sucesso')
    console.log(musicas[1])

    jsonfile.writeFile('data.json', musicas, function (err) {
      if (err) console.log('Erro')
    })

  }
  else {
    console.log('Erro')
  }
})
*/
/* GET home page. */
router.get('/', function (req, res, next) {
  jsonfile.readFile(myBD, (erro, musicas) => {
    if (!erro) {
      musicas.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
      res.render('index', { lista: musicas });
    }
    else {
      res.render('error', { message: "Erro na leitura da BD", error: err })
    }
  })
});

router.get('/adicionar', function (req, res, next) {
  res.render('new-music.pug')
})

router.post('/', function (req, res) {
  jsonfile.readFile(myBD, (erro, musicas) => {
    if (erro) {
      res.render('new-music')
      return
    }
    req.body.id = nanoid()
    musicas.push(req.body)
    jsonfile.writeFile(myBD, musicas, { spaces: 2 }, erro => {
      if (erro)
        res.render('new-music')
      else {
        musicas.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
        res.render('index', { lista: musicas })
      }
    })
  })
})

router.delete('/:id', function (req, res) {
  var id = req.params.id
  jsonfile.readFile(myBD, (erro, musicas) => {
    if (erro) {
      res.render('error', { message: "Erro na leitura da BD", error: err })
      return
    }
    var index = musicas.findIndex(m => m.id == id)
    if (index > -1) {
      musicas.splice(index, 1)
      jsonfile.writeFile(myBD, musicas, { spaces: 2 }, erro => {
        if (erro) console.log(erro)
        else console.log('BD atualizada')
      })
    }
    else {
      console.log('Erro: não encontrei o elemento a remover...')
    }
    res.end('0')
  })
})

router.get('/editar/:id', function (req, res, next) {
  var id = req.params.id
  jsonfile.readFile(myBD, (erro, musicas) => {
    if (erro) {
      res.render('error', { message: "Erro na leitura da BD", error: erro })
      return
    }
    var musica = musicas.find(m => m.id == id)
    if (musica != undefined) {
      res.render('edit-music', { m: musica })
    }
    else {
      console.log('Erro: música não encontrada')
    }
  })
});

router.put('/:id', function (req, res) {
  var id = req.params.id
  jsonfile.readFile(myBD, (err, arq) => {
    if (err) {
      res.render('error', { message: "Erro na leitura da BD", error: err })
      return
    }
    var index = arq.findIndex(m => m.id == id)
    if (index > -1) {
      arq.splice(index, 1)
      arq.push(req.body)
      jsonfile.writeFile(myBD, arq, { spaces: 2 }, err => {
        if (err) console.log(err)
        else console.log('BD atualizada')
        arq.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
        res.render('index', { lista: arq })
      })
    }
    else {
      console.log('Erro: não encontrei o elemento a remover...')
    }
    res.end('0')
  })
})

router.get('/mais/:id', function (req, res, next) {
  var id = req.params.id
  jsonfile.readFile(myBD, (erro, musicas) => {
    if (erro) {
      res.render('error', { message: "Erro na leitura da BD", error: erro })
      return
    }
    var musica = musicas.find(m => m.id == id)
    console.log(musica)

    if (musica != undefined) {
      res.render('more', { m: musica })
    }
    else {
      console.log('Erro: Música não encontrada')
    }
  })
})

module.exports = router;
