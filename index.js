// export DEBUG=app:startup
const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const http = require('http');const helment = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const reqLogger = require('./middleware/reqLogger');
const app = express();

// Routes
const home = require('./routes/home');
const genres = require('./routes/genres');

app.set('view engine', 'pug');
app.set('views', './views');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helment());
app.use('/', home);
app.use('/api/genres', genres);

if (app.get('env') === 'development') {
  debug('Morgan enabled...');
  app.use(morgan('tiny')); // HTTP request logger middleware
  app.use(reqLogger); // Log Request Bodies
}

/*
 * { GET } nomics API
 */
app.get('/api/nomics', (req, res) => {
  const key = '8feb5b31914ce3584de5c396d7d65a39';

  return http.get({
    hostname: `https://api.nomics.com`,
    port: 80,
    path: `/v1/prices?key=${key}`,
    agent: false  // create a new agent just for this one request
  }, (res) => {
    debug(res);
    return res;
  });
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => debug(`Listening on port ${port}...`));
