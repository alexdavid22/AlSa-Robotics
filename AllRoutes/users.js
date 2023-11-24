const express = require('express');
const router = express.Router();
const database = require('../database');
const passport = require('passport');
const LocalStrategy = require('passport-local');


//register strategy
router.post('/register', function(req, res, next) {
    // Primește datele de la formular
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    // Verifică dacă adresa de email este deja înregistrată
    database.connection.query('SELECT email FROM test_users WHERE email = ?', [email], function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.length > 0) {
        // Adresa de email există deja, redirectează către pagina de înregistrare
        req.session.errorMsg = 'I have verrified your desired data and it seems that your email is already in use. Either if you have or dont have an account with this email, please contact my master. Tell him I sent you to him because of email duplication.';
        return res.redirect('/register/were-you-here-before');
      }
      // Verifică dacă parola și confirmarea parolei corespund
      if (password !== confirmPassword) {
        // Parola și confirmarea parolei nu se potrivesc, afișează o eroare
        req.session.errorMsg = 'I have verrified your desired data and it seems that your password is not the same as the confirmation for your password. It is important to carefully type your password as this will be saved crypted in my masters database and only YOU will know what value it has!';
        return res.redirect('register/were-you-here-before');
      }
      // Dacă ajungi aici, înseamnă că adresa de email este unică și poți continua procesul de înregistrare
      database.connection.query('INSERT INTO test_users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, password], function(err) {
          if (err) {
            return next(err);
          }
          let user = {
            id: this.lastID, // sau altă modalitate de a obține ID-ul utilizatorului
            email: email
          };
          req.login(user, function(err) {
            if (err) {
              return next(err);
            }
            res.redirect('/');
          });
      });
    });
  });
  
  
  //login strategy
  passport.use(new LocalStrategy({
    usernameField: 'email', // Specifică câmpul email în loc de username
    passwordField: 'password' // Câmpul pentru parolă rămâne password
  }, function verify(email, password, cb) {
    // Verifică credențialele în baza de date MySQL
    database.connection.query('SELECT * FROM test_users WHERE email = ? AND password = ?', [email, password], function(err, results) {
      if (err) { return cb(err); }
      if (results.length < 1) { 
        console.log('error email')
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
  
      // Utilizatorul există, și poate fi returnat
      let user = {
        id: results[0].id,
        email: results[0].email
      };
      return cb(null, user);
    });
  }));
  
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, email: user.email });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/try-again-the-credentials'
  }))
  
  //logout strategy
  router.post('/logout', (req,res) => {
    req.session.destroy((err) => {
      if (err) throw err
      res.redirect('/login')
    })
  })
  
  
  module.exports = router;