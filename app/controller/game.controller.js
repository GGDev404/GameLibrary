const { Factory } = require('../factory/query_factory')
// En la función getGames, no necesitamos escapar los valores, simplemente hacemos la consulta directamente
async function getGames() {
    try {
      let sql = `SELECT * FROM juegos`; // Aquí define tu consulta SQL para obtener los juegos
      const result = await Factory(sql);
      
      return result; // Retornar los resultados en lugar de enviarlos directamente
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      throw error; // Re-lanzamos el error para que se maneje en la ruta
    }
  }

  //Vamos a editar los archivos
  async function editGames(req, res) {
    const { id } = req.params;
  
    try {
      // Aquí debes obtener los detalles del juego con el ID proporcionado desde la base de datos
      const game = await getGameById(id); // Suponiendo que tienes una función llamada getGameById para obtener los detalles del juego por ID
      
      if (!game) {
        // Si el juego no se encuentra en la base de datos, devolver un mensaje de error
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }
      // Renderizar la vista edit.ejs con los detalles del juego

      res.render('editGame', { game: game[0]});
    } catch (error) {
      console.error('Error al obtener el juego:', error);
      res.status(500).json({ error: 'Error al obtener el juego de la base de datos.' });
    }
  }

  async function getGameById(id) {
    try {
      let sql = `SELECT * FROM juegos WHERE id_juego = @id`; // Consulta SQL para obtener el juego por su ID
      const params = { id }; // Parámetros para el marcador de posición @id
      const result = await Factory(sql, params);
      return result; // Retorna el resultado de la consulta
    } catch (error) {
      console.error('Error al obtener el juego:', error);
      throw error; // Re-lanzamos el error para que se maneje en la ruta
    }
  }

  async function updateGame(gameId, updatedFields) {
    try {
      console.log(updatedFields); // Asegurémonos de qué contiene el objeto updatedFields
        
      let sql = 'UPDATE juegos SET nombre = @nombre, descripcion = @descripcion, genero = @genero, img = @img WHERE id_juego = @gameId'; // Consulta SQL para actualizar el juego
      const params = {
        gameId: gameId, // Asignamos el gameId al parámetro @gameId
        nombre: updatedFields.Nombre, // Accedemos directamente a la propiedad title dentro de updatedFields
        descripcion : updatedFields.descripcion,
        genero : updatedFields.genero,
        img : updatedFields.img
    };

  
      await Factory(sql, params);
  
      // Aquí puedes realizar cualquier otro procesamiento necesario después de actualizar el juego.
  
      return; // Retorna si la actualización fue exitosa.
    } catch (error) {
      console.error('Error al actualizar el juego:', error);
      throw error;
    }
  }

  async function DeleteGames(req, res) {
    const { id } = req.params;
    let sql = `DELETE FROM  juegos WHERE id_juego = @id`
      const params = {id: id}
    try {
        
        await Factory(sql, params);
        res.redirect('/games');
    } catch (error) {
      console.error('Error al obtener el juego:', error);
      res.status(500).json({ error: 'Error al obtener el juego de la base de datos.' });
    }
  }
  
  
  // En la función newGame, utilizamos parámetros con marcadores de posición
  async function newGame(req, res) {
    const { body, file } = req;
    if (file) {
      let url = `http://localhost:2077/image/${file.filename}`;
      let sql = 'INSERT INTO juegos (nombre, descripcion, genero,img) VALUES (@nombre, @descripcion, @genero, @img)';
      const params = {
        nombre: body.Nombre,
        descripcion: body.descripcion,
        genero: body.genero,
        img: url,
      };
  
      try {
        await Factory(sql, params);
  
        res.redirect('/games');
      }
       catch (error) {
        console.error('Error al insertar el juego:', error);
        res.status(500).json({ error: 'Error al insertar el juego en la base de datos.' });
      }
    } else {
      res.status(400).json({ error: 'Debes adjuntar una imagen para el juego.' });
    }
  }

  async function handleUpdateGame(req, res) {
    const { id } = req.params;
    const { Nombre, descripcion, genero, image } = req.body;
    console.log(req.body);
    try {
      // Primero, obtenemos los detalles del juego actual desde la base de datos
      const game = await getGameById(id);
  
      if (!game) {
        // Si el juego no se encuentra en la base de datos, devolver un mensaje de error
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }
  
      // Si no se proporcionó una nueva imagen, usamos la imagen actual del juego
      const imgUrl = `http://localhost:2077/image/${req.file.filename}`
  
      // Objeto con los campos actualizados para el juego
      const updatedFields = {
        Nombre,
        descripcion,
        genero,
        img: imgUrl,
      };
  
      // Llamamos a la función de actualización del juego con el ID y los campos actualizados
      await updateGame(id, updatedFields);
  
      // Redirigimos a la página principal (o donde quieras que se muestren los juegos actualizados)
      res.redirect('/games');
  
    } catch (error) {
      console.error('Error al actualizar el juego:', error);
      res.status(500).json({ error: 'Error al actualizar el juego en la base de datos.' });
    }
  }



module.exports = {
    getGames,
    newGame,
    editGames,
    getGameById,
    updateGame,
    DeleteGames,
    handleUpdateGame
}