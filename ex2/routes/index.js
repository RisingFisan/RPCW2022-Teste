var express = require('express');
var router = express.Router();

var axios = require('axios').default

router.use((req, res, next) => {
  if(req.cookies.token) next()
  else {
    axios.post("http://clav-api.di.uminho.pt/v2/users/login", {username: "rpcw2022@gmail.com", password: "2022"})
      .then( result => {
        let token = result.data.token
        res.cookie('token', token, {
          expires: new Date(Date.now() + '1d'),
          secure: false,
          httpOnly: true
        })
        res.redirect(req.url)
      }).catch( error => {
        res.status(500).send("<p>Erro na obtenção do token!</p>")
      })
  }
})

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/classes', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + req.cookies.token).then(value => {
    res.render('classes', {classes: value.data});
  }).catch( error => res.status(500).send("<p>Erro na obtenção das classes.</p>"))
});

router.get('/classes/:id', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + req.cookies.token).then(value => {
    res.render('classe', {cl: value.data});
  }).catch( error => res.status(500).send("<p>Erro na obtenção da classe.</p>"))
});

router.get('/termosIndice', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + req.cookies.token).then(value => {
    res.render('termosIndice', {termosIndice: value.data});
  }).catch( error => res.status(500).send("<p>Erro na obtenção dos termos de índice.</p>"))
});

module.exports = router;
