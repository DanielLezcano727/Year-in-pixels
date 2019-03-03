const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

const db = mysql.createPool(database);

db.getConnection((err, con) => {
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS LOST');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATBASE HAS TO MANY CONNECTIONS');
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(con) con.release();
    console.log('DB is connected');
    return;
});

db.query = promisify(db.query);

module.exports = db;