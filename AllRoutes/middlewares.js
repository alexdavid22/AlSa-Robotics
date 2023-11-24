// Middleware pentru a verifica dacă utilizatorul este autentificat
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }
  
  // Middleware pentru a verifica dacă utilizatorul NU este autentificat
  function preventIfAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/'); // Utilizatorul este deja autentificat, redirecționează către pagina principală
    }
    next(); // Utilizatorul nu este autentificat, permite accesul
  }
  
  module.exports = { ensureAuthenticated, preventIfAuthenticated };