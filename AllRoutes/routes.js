const express = require('express');
const router = express.Router();
const checkauth = require('./middlewares')

/* GET home page. */
router.get('/', checkauth.ensureAuthenticated, function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

// toate 'metodele get' / 'schimbarile' 'paginilor web' / 'url-ului'
router.get('/login',checkauth.preventIfAuthenticated, function(req, res, next) {
  res.render('login');
});

router.get('/register', checkauth.preventIfAuthenticated, function(req, res, next) {
res.render('register');
});

// ruta get pentru register in cazul in care exista o eroare
router.get('/register/were-you-here-before', checkauth.preventIfAuthenticated, function(req, res, next) {
  // Alte coduri pentru afișarea paginii de înregistrare
  
  const errorMsg = req.session.errorMsg;
  if (errorMsg) {
    res.locals.errorMsg = errorMsg; // Atribuie mesajul la res.locals pentru a-l putea afișa în șablon
    delete req.session.errorMsg; // Șterge mesajul din sesiune
  }
  
  // Renderizează pagina de înregistrare și afișează mesajul de eroare, dacă există
  res.render('register', {errorMsg: res.locals.errorMsg});
});

router.get('/login/try-again-the-credentials', checkauth.preventIfAuthenticated, function(req, res, next) {

  res.render('login', {errorMsg: 'I have verrified your credentials and it seems that one of them was incorectly typed. Can you please resend the details?'});
});

module.exports = router;