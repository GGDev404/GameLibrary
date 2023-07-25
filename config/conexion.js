const mssql = require('mssql')
const mssql_data = require('./mssql_data.json')

const ObjectConnection = {
    user : mssql_data.mssql.user,
    password : mssql_data.mssql.password,
    server : mssql_data.mssql.server,
    database : mssql_data.mssql.database,
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
}

const myConn = new mssql.ConnectionPool(ObjectConnection)

myConn.connect().then(() => {
    console.log('Conexión a la base de datos exitosa.');
  }).catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = myConn