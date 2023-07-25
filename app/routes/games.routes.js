const route = require('express').Router();
const storage = require('../../config/multer');
const multer = require('multer');
const uploader = multer({ storage });



const { getGames, newGame, editGames, getGameById, updateGame, DeleteGames, handleUpdateGame } = require('../controller/game.controller');
const { getDevelopers } = require('../controller/development.contoller');
const { getGenders } = require('../controller/gender.controller');
const { render } = require('../app');

route.get('/addGame', (req, res) => {
  // Renderiza la vista create.ejs, que contiene el formulario para crear un nuevo juego
  res.render('videogames');
});
route.get('/game', (req, res) => {
    
    // Renderiza la vista create.ejs, que contiene el formulario para crear un nuevo juego
    res.render('videogameshome');
  });

  route.get('/Games', async (req, res) => {
    try {
      const results = await getGames(); // Llamada a la función getGames con await
      
      res.render('videogameshome', { results: results }); // Renderizar la vista con los datos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      res.status(500).json({ error: 'Error al obtener los juegos de la base de datos.' });
    }
  });
route.post('/addGame', uploader.single('image'), newGame);
route.get('/edit/:id', editGames);
route.get('/delete/:id', DeleteGames)


  route.post('/updateGame/:id',uploader.single('image') , handleUpdateGame);

route.get('/', async (req, res) => {
    try {
      const results = await getGames(); // Llamada a la función getGames con await

      res.render('../views/main', { results: results }); // Renderizar la vista con los datos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      res.status(500).json({ error: 'Error al obtener los juegos de la base de datos.' });
    }
  });

  route.get('/home', async (req, res) => {
    try {
      const results = await getGames(); // Llamada a la función getGames con await
      const dev = await getDevelopers();
      const gender = await getGenders();
      res.render('../views/home', { results: results, dev: dev, gender: gender }); // Renderizar la vista con los datos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      res.status(500).json({ error: 'Error al obtener los juegos de la base de datos.' });
    }
  });


module.exports = route