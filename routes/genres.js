const express = require('express');
const genres = express.Router();

// Consts
const imgPath = 'https://via.placeholder.com/50x50';
const genreIdNotFound = 'The genre with the given ID was not found.';

// Genres array
const genresList = [
  { id: 1, name: 'action', image: imgPath },
  { id: 2, name: 'adventure', image: imgPath },
  { id: 3, name: 'comedy', image: imgPath }
];

/*
 * { GET } all genres
 */
genres.get('/', (req, res) => {
  res.send(genresList);
});

/*
 * { POST } add a new genre to genres
 */
genres.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genresList.length + 1,
    name: req.body.name,
    image: req.body.image
  };

  genresList.push(genre);
  res.send(genre);
});

/*
 * { PUT } update an existing genre
 */
genres.put('/:id', (req, res) => {
  const genre = genresList.find(g => g.id === parseInt(req.params.id));
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
genres.delete('/:id', (req, res) => {
  const genre = genresList.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(genreIdNotFound);

  const index = genresList.indexOf(genre);
  genresList.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
    image: Joi.string().required()
  };

  return Joi.validate(genre, schema);
}

module.exports = genres;
