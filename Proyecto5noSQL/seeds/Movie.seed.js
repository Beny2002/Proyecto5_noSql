const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'Dune',
    director: 'Denis Villeneuve',
    year: 2021,
    genre: 'Ciencia ficción',
  },
  {
    title: 'Oppenheimer',
    director: 'Christopher Nolan',
    year: 2023,
    genre: 'Drama',
  },
  {
    title: 'Spider-Man: Across the Spider-Verse',
    director: 'Joaquim Dos Santos',
    year: 2023,
    genre: 'Animación',
  },
  {
    title: 'Del revés 2',
    director: 'Kelsey Mann',
    year: 2024,
    genre: 'Animación',
  },
  {
    title: 'Godzilla y Kong: El nuevo imperio',
    director: 'Adam Wingard',
    year: 2024,
    genre: 'Acción',
  },
  {
    title: 'Deadpool y Lobezno',
    director: 'Shawn Levy',
    year: 2024,
    genre: 'Comedia',
  },
];
const movieDocuments = movies.map(movie => new Movie(movie));
mongoose
  .connect('mongodb://localhost:27017/proyecto-basico-express-movies')
  .then(async () => {
    const allMovies = await Movie.find();
    if (allMovies.length) {
      await Movie.collection.drop(); 
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		await Movie.insertMany(movieDocuments);
    console.log('DatabaseCreated')
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
