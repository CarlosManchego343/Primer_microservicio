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

function get(table, id) {
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (error, data) => {
            if (error) return reject (error);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise ((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            if (error) return reject (error);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise ((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            if (error) return reject (error);
            resolve(result);
        })
    })
}


//Esta función va a validar si debe de crear un usuario o actualizarlo
async function upsert(table, data) {
    // Primero se toma la tabla de la base de datos con la funcion list
    let lista = await list(table);
    // Se crea un array vacio de ids
    let data_id = [];
    // Se recorre TODA la tabla
    for (let key in lista) {
        // Si el data.id existe, lo que se hace es guardarlo en 
        // el array de los ids
        if (data.id === lista[key].id) {
            data_id.push(lista[key].id)
        }
    }

    // En el caso de que se encuentre almacenados al menos un id
    // en el array de ids, se dara por hecho que se debe de usar
    // el update para actualizar los datos, en caso contrario
    // solo se insert el nuevo parametro
    if (data_id.length > 0) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, result) => {
            if (error) return reject(error);
            resolve(result[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert, 
    query
}