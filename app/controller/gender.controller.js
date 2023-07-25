const { Factory } = require('../factory/query_factory');

async function getGenders() {
  try {
    let sql = `SELECT * FROM Generos`;
    const result = await Factory(sql);
    return result;
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    throw error;
  }
}

async function editGender(req, res) {
  const { id } = req.params;

  try {
    const gender = await getGenderById(id);

    if (!gender) {
      return res.status(404).json({ error: 'Género no encontrado.' });
    }

    res.render('editGender', { gender: gender[0] });
  } catch (error) {
    console.error('Error al obtener el género:', error);
    res.status(500).json({ error: 'Error al obtener el género de la base de datos.' });
  }
}

async function getGenderById(id) {
  try {
    let sql = `SELECT * FROM Generos WHERE id_categoria = @id`;
    const params = { id };
    const result = await Factory(sql, params);
    return result;
  } catch (error) {
    console.error('Error al obtener el género:', error);
    throw error;
  }
}

async function updateGender(genderId, updatedFields) {
  try {
    let sql = 'UPDATE Generos SET nombre = @nombre, descripcion = @descripcion, img = @img WHERE id_categoria = @genderId';
    const params = {
      genderId: genderId,
      nombre: updatedFields.Nombre,
      descripcion: updatedFields.descripcion,
      img: updatedFields.img
    };

    await Factory(sql, params);

    return;
  } catch (error) {
    console.error('Error al actualizar el género:', error);
    throw error;
  }
}

async function deleteGender(req, res) {
  const { id } = req.params;
  let sql = `DELETE FROM Generos WHERE id_categoria = @id`;
  const params = { id: id };
  try {
    await Factory(sql, params);
    res.redirect('/genders');
  } catch (error) {
    console.error('Error al eliminar el género:', error);
    res.status(500).json({ error: 'Error al eliminar el género de la base de datos.' });
  }
}

async function newGender(req, res) {
  const { body, file } = req;
    if (file) {
      let url = `http://localhost:2077/image/${file.filename}`;
      let sql = 'INSERT INTO Generos (nombre, descripcion, img) VALUES (@nombre, @descripcion, @img)';
  const params = {
    nombre: body.nombre,
    descripcion: body.descripcion,
    img: url,
      };
  
      try {
        await Factory(sql, params);
  
        res.redirect('/genders');
      }
       catch (error) {
        console.error('Error al insertar el juego:', error);
        res.status(500).json({ error: 'Error al insertar el juego en la base de datos.' });
      }
    } else {
      res.status(400).json({ error: 'Debes adjuntar una imagen para el juego.' });
    }
  }

async function handleUpdateGender(req, res) {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const gender = await getGenderById(id);

    if (!gender) {
      return res.status(404).json({ error: 'Género no encontrado.' });
    }
    const imgUrl = `http://localhost:2077/image/${req.file.filename}`;
    const updatedFields = {
      Nombre: nombre,
      descripcion,
      img:imgUrl,
    };

    await updateGender(id, updatedFields);

    res.redirect('/genders');
  } catch (error) {
    console.error('Error al actualizar el género:', error);
    res.status(500).json({ error: 'Error al actualizar el género en la base de datos.' });
  }
}

module.exports = {
  getGenders,
  newGender,
  editGender,
  getGenderById,
  updateGender,
  deleteGender,
  handleUpdateGender
}

