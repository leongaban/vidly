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

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
