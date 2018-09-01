const express = require('express');
const home = express.Router();

/*
 * { GET } The homepage
 */
home.get('/', (req, res) => {
  res.render('index', { title: 'Vidly', message: 'Welcome to Vidly!' });
});

module.exports = home;
