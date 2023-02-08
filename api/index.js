// Servicio de la api: se extrae todos los microservicios
// que se estaran usando


const express = require('express');

// Se incluye el body parser para trabajar con todos los datos en JSON
const bodyParser = require('body-parser');

const config = require('../config.js');

const app = express();

app.use(bodyParser.json());

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

//ROUTER - Se llaman todas las rutas

//Ruta del usuario
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors); 

app.listen(config.api.port, () => {
    console.log("Api escuchando en el puerto ", config.api.port);
})