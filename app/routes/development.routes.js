const route = require('express').Router();
const storage = require('../../config/multer');
const multer = require('multer');
const uploader = multer({ storage });



const { getDevelopers, newDeveloper, editDeveloper, getDeveloperById, updateDeveloper, deleteDeveloper, handleUpdateDeveloper } = require('../controller/development.contoller.js');

route.get('/addDev', (req, res) => {
  // Renderiza la vista create.ejs, que contiene el formulario para crear un nuevo juego
  res.render('devadd');
});


  route.get('/dev', async (req, res) => {
    try {
      const results = await getDevelopers(); // Llamada a la función getGames con await
      
      res.render('develoops', { results: results }); // Renderizar la vista con los datos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      res.status(500).json({ error: 'Error al obtener los juegos de la base de datos.' });
    }
  });
route.post('/addDev', uploader.single('image'), newDeveloper);
route.get('/editDev/:id', editDeveloper);
route.get('/deleteDev/:id', deleteDeveloper)


  route.post('/updateDeveloper/:id',uploader.single('image') , handleUpdateDeveloper);



  route.get('/home', async (req, res) => {
    try {
      const results = await getDevelopers(); // Llamada a la función getGames con await
      
      res.render('../views/home', { results: results }); // Renderizar la vista con los datos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      res.status(500).json({ error: 'Error al obtener los juegos de la base de datos.' });
    }
  });


module.exports = route