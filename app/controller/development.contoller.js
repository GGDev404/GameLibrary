const { Factory } = require('../factory/query_factory')
// En la función getGames, no necesitamos escapar los valores, simplemente hacemos la consulta directamente
async function getDevelopers() {
  try {
    let sql = `SELECT * FROM desarrolladoras`; // Consulta SQL para obtener las desarrolladoras
    const result = await Factory(sql);

    return result; // Retornar los resultados en lugar de enviarlos directamente
  } catch (error) {
    console.error('Error al obtener las desarrolladoras:', error);
    throw error; // Re-lanzamos el error para que se maneje en la ruta
  }
}

async function editDeveloper(req, res) {
  const { id } = req.params;

  try {
    // Obtener los detalles de la desarrolladora con el ID proporcionado desde la base de datos
    const developer = await getDeveloperById(id);

    if (!developer) {
      // Si la desarrolladora no se encuentra en la base de datos, devolver un mensaje de error
      return res.status(404).json({ error: 'Desarrolladora no encontrada.' });
    }

    // Renderizar la vista editDeveloper.ejs con los detalles de la desarrolladora
    res.render('devEdit', { developer: developer[0] });
  } catch (error) {
    console.error('Error al obtener la desarrolladora:', error);
    res.status(500).json({ error: 'Error al obtener la desarrolladora de la base de datos.' });
  }
}

async function getDeveloperById(id) {
  try {
    let sql = `SELECT * FROM desarrolladoras WHERE id_desarrolladora = @id`; // Consulta SQL para obtener la desarrolladora por su ID
    const params = { id }; // Parámetros para el marcador de posición @id
    const result = await Factory(sql, params);
    return result; // Retorna el resultado de la consulta
  } catch (error) {
    console.error('Error al obtener la desarrolladora:', error);
    throw error; // Re-lanzamos el error para que se maneje en la ruta
  }
}

async function updateDeveloper(developerId, updatedFields) {
  try {
    console.log(updatedFields); // Asegurémonos de qué contiene el objeto updatedFields

    let sql = 'UPDATE desarrolladoras SET nombre = @nombre, pais = @pais, img = @img, fundacion = @fundacion WHERE id_desarrolladora = @developerId'; // Consulta SQL para actualizar la desarrolladora
    const params = {
      developerId: developerId, // Asignamos el developerId al parámetro @developerId
      nombre: updatedFields.Nombre, // Accedemos directamente a la propiedad Nombre dentro de updatedFields
      pais: updatedFields.pais,
      img: updatedFields.img,
      fundacion: updatedFields.fundacion,
    };

    await Factory(sql, params);

    // Aquí puedes realizar cualquier otro procesamiento necesario después de actualizar la desarrolladora.

    return; // Retorna si la actualización fue exitosa.
  } catch (error) {
    console.error('Error al actualizar la desarrolladora:', error);
    throw error;
  }
}

async function deleteDeveloper(req, res) {
  const { id } = req.params;
  let sql = `DELETE FROM desarrolladoras WHERE id_desarrolladora = @id`;
  const params = { id: id };
  try {
    await Factory(sql, params);
    res.redirect('/dev');
  } catch (error) {
    console.error('Error al eliminar la desarrolladora:', error);
    res.status(500).json({ error: 'Error al eliminar la desarrolladora de la base de datos.' });
  }
}
  
  
  // En la función newGame, utilizamos parámetros con marcadores de posición
  async function newDeveloper(req, res) {
    const { body, file } = req;
    if (file) {
      let url = `http://localhost:2077/image/${file.filename}`;
      let sql = 'INSERT INTO desarrolladoras (nombre, pais, img, fundacion) VALUES (@nombre, @pais, @img, @fundacion)';
      const params = {
        nombre: body.Nombre,
        pais: body.pais,
        img: url,
        fundacion: body.fundacion,
      };
  
      try {
        await Factory(sql, params);
        res.redirect('/dev');
      } catch (error) {
        console.error('Error al insertar la desarrolladora:', error);
        res.status(500).json({ error: 'Error al insertar la desarrolladora en la base de datos.' });
      }
    } else {
      res.status(400).json({ error: 'Debes adjuntar una imagen para la desarrolladora.' });
    }
  }

  async function handleUpdateDeveloper(req, res) {
    const { id } = req.params;
    const { Nombre, pais, fundacion,  } = req.body;
    console.log(req.body);
    try {
      // Primero, obtenemos los detalles de la desarrolladora actual desde la base de datos
      const developer = await getDeveloperById(id);
  
      if (!developer) {
        // Si la desarrolladora no se encuentra en la base de datos, devolver un mensaje de error
        return res.status(404).json({ error: 'Desarrolladora no encontrada.' });
      }
  
      // Si no se proporcionó una nueva imagen, usamos la imagen actual de la desarrolladora
      const imgUrl = `http://localhost:2077/image/${req.file.filename}`;
  
      // Objeto con los campos actualizados para la desarrolladora
      const updatedFields = {
        Nombre,
        pais,
        fundacion,
        img: imgUrl,
      };
  
      // Llamamos a la función de actualización de la desarrolladora con el ID y los campos actualizados
      await updateDeveloper(id, updatedFields);
  
      // Redirigimos a la página principal (o donde quieras que se muestren las desarrolladoras actualizadas)
      res.redirect('/dev');
  
    } catch (error) {
      console.error('Error al actualizar la desarrolladora:', error);
      res.status(500).json({ error: 'Error al actualizar la desarrolladora en la base de datos.' });
    }
  }



module.exports = {
  getDevelopers,
  newDeveloper,
    editDeveloper,
    getDeveloperById,
    updateDeveloper,
    deleteDeveloper,
    handleUpdateDeveloper
}