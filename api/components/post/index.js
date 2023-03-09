// Permite la exportación de todos los controladores

const controller = require('./controller');

const store = require('../../../store/mysql');

module.exports = controller(store);