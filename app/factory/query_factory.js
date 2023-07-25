const util = require('util');
const conexion = require('../../config/conexion');
const sql = require('mssql');

async function Factory(query, params) {
  try {
    const request = new sql.Request(conexion);

    if (params) {
      for (const key in params) {
        request.input(key, params[key]);
      }
    }

    const result = await request.query(query);

    return result.recordset; // Devolvemos solo el array de resultados
  } catch (err) {
    console.log(`There was an error: ${err.message}`);
    throw err;
  }
}

module.exports = {
  Factory,
  conexion,
};