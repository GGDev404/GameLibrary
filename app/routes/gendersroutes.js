const route = require('express').Router();
const storage = require('../../config/multer');
const multer = require('multer');
const uploader = multer({ storage });

const { getGenders, newGender, editGender, getGenderById, updateGender, deleteGender, handleUpdateGender } = require('../controller/gender.controller');

route.get('/addGender', (req, res) => {
  // Renderiza la vista create.ejs, que contiene el formulario para crear un nuevo género
  res.render('gendersAdd'); // You may update the view name if needed
});

route.get('/genders', async (req, res) => {
  try {
    const results = await getGenders();
    res.render('gendershome', { results: results });
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    res.status(500).json({ error: 'Error al obtener los géneros de la base de datos.' });
  }
});

route.post('/addGender', uploader.single('image'), newGender);

route.get('/editGender/:id', editGender);
route.get('/deleteGender/:id', deleteGender);

route.post('/updateGender/:id', uploader.single('image'), handleUpdateGender);

route.get('/', async (req, res) => {
  try {
    const results = await getGenders();
    res.render('../views/main', { results: results });
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    res.status(500).json({ error: 'Error al obtener los géneros de la base de datos.' });
  }
});


module.exports = route;
