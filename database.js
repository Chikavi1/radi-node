const mysql = require('mysql');
const { promisify } = require('util');


const pool  = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "adoption"
}) 


pool.getConnection((err,conexion) => {
    if(err){
        console.log('error chabal');
    }
    if(conexion) conexion.release();
    console.log('conexion establecida');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;