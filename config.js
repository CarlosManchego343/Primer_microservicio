//Archivo para configurar variables de entorno

module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },

    jwt: {
        secret: process.env.SECRET || 'notasecret!'
    }
}