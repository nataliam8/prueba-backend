var mysql = require('mysql');
const {promisify} = require('util');
const conexion= mysql.createConnection({
    host : 'localhost',
    database : 'prueba_data_base',
    user : 'root',
    password : '',
    
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado a base de datos exitosamente ');
   
});
promisify(conexion.query);
module.exports = conexion;
