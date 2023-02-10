//Archivo para configurar variables de entorno

module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },

    jwt: {
        secret: process.env.SECRET || 'notasecret!'
    },

    mysql: {
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',
        user:  process.env.MYSQL_USER || 'sql10597269',
        password: process.env.MYSQL_PASS || '4rYMuZM1nV',
        database: process.env.MYSQL_DB || 'sql10597269'
    }
    
}