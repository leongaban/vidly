const express = require('express');
const Joi = require('joi'); // https://www.npmjs.com/package/joi
const app = express();

// Adding and using JSON middleware.
app.use(express.json());

// Genres array.
const genres = [];

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
 * { POST } all genres
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
