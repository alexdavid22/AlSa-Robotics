const mysql = require('mysql2');
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login-db'
  }

const connection = mysql.createConnection(options);

const sessionStore = new mysqlstore (options);

connection.connect((err) => {
    if (err) {
      console.error('Eroare la conectare la baza de date:', err);
    } else {
      console.log('Conectat la baza de date cu succes');
      // Aici puteți continua cu alte operații legate de baza de date
    }
  });

module.exports = {connection, sessionStore}