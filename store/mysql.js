const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((error) => {
        if (error) {
            console.log('[db err]', error);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!')
        }
    })

    connection.on('error', error => {
        console.error('[db err]', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw error;
        }
    })
}

handleCon();

function list(table) {
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if (error) return reject (error);
            resolve(data);
        })
    })
}

module.exports = {
    list
}