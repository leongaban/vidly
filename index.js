const express = require('express');
const Joi = require('joi'); // https://www.npmjs.com/package/joi
const app = express();

// Adding JSON middleware.
app.use(express.json());

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
    name: req.body.name
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
