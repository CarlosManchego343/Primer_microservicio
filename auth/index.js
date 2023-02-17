const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {  
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) { 
        const decoded = decodeHeader(req);

        if (decoded.id !== owner) {
            throw error("No puedes hacer eso", 401); 
        }
    },

    logged: function(req, owner) { 
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {

    // Esta funcion verifica que el token se le pase correctamente
    if(!auth) {
        throw error("No viene token", 403); 
    }

    if(auth.indexOf('Bearer ') === -1) {
        throw error("Formato invalido", 400);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verify(token);

    req.user = decode;

    return decode;
}

module.exports = {
    sign,
    check, 
}