// Permite la exportación de todos los controladores

const controller = require('./controller');

const store = require('../../../store/dummy');

module.exports = controller(store);