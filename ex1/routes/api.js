var express = require('express');
var router = express.Router();

var CidadeController = require('../controllers/cidadeController')
var LigacaoController = require('../controllers/ligacaoController')

router.get('/cidades', function(req, res, next) {
  if(req.query.distrito) {
    CidadeController.list_by_district(req.query.distrito).then( value => {
      res.jsonp(value)
    }).catch( error => {
      res.status(500).jsonp({error: error})
    })
  }
  else {
    CidadeController.list().then( value => {
      res.jsonp(value)
    }).catch( error => {
      res.status(500).jsonp({error: error})
    })
  }
});

router.get('/cidades/nomes', function(req, res, next) {
  CidadeController.city_names().then( value => {
    res.jsonp(value)
  }).catch( error => {
    res.status(500).jsonp({error: error})
  })
});

router.get('/cidades/:id', function(req, res, next) {
  CidadeController.lookup(req.params.id).then( value => {
    res.jsonp(value)
  }).catch( error => {
    res.status(500).jsonp({error: error})
  })
});

router.get('/distritos', function(req, res, next) {
  CidadeController.district_list().then( value => {
    res.jsonp(value)
  }).catch( error => {
    res.status(500).jsonp({error: error})
  })
});

router.get('/ligacoes', function(req, res, next) {
  if(req.query.origem) {
    LigacaoController.list_by_origin(req.query.origem).then( value => {
      res.jsonp(value)
    }).catch( error => {
      res.status(500).jsonp({error: error})
    })
  }
  else if(req.query.dist) {
    LigacaoController.list_by_dist(parseFloat(req.query.dist)).then( value => {
      res.jsonp(value)
    }).catch( error => {
      res.status(500).jsonp({error: error})
    })
  }
  else {
    next()
  }
});


module.exports = router;
