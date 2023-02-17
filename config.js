//Archivo para configurar variables de entorno

module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },

    jwt: {
        secret: process.env.SECRET || 'notasecret!'
    },

    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user:  process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'usuarios'
    }
    
}