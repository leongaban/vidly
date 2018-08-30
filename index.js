const express = require('express');
const helment = require('helmet'); // https://github.com/helmetjs/helmet
const morgan = require('morgan'); // https://expressjs.com/en/resources/middleware/morgan.html
const Joi = require('joi'); // https://www.npmjs.com/package/joi
const logger = require('./logger');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`); // returns development if NODE_ENV is not set.

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helment());

if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // Set only on DEV
  app.use(logger);
  console.log('[DEV] Morgan enabled...');
}


// Consts
const imgPath = 'https://via.placeholder.com/50x50';
const genreIdNotFound = 'The genre with the given ID was not found.';

// Genres array.
const genres = [
  { id: 1, name: 'action', image: imgPath },
  { id: 2, name: 'adventure', image: imgPath },
  { id: 3, name: 'comedy', image: imgPath }
];

app.get('/', (req, res) => {
  res.send('Welcome to Vidly');
});

/*
 * { GET } all genres
 */
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

/*
 * { POST } add a genre to genres
 */
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    image: req.body.image
  };

  genres.push(genre);
  res.send(genre);
});

/*
 * { PUT } update a genre
 */
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(genreIdNotFound);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update genre
  genre.name = req.body.name;
  genre.image = req.body.image;

  res.send(genre);
});

/*
 * { DELETE } delete a genre
 */
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(genreIdNotFound);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
    image: Joi.string().required()
  };

  return Joi.validate(genre, schema);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
