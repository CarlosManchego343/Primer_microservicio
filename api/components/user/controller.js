// Este archivo es el unico que va a llamar a los datos

const store = require('../../../store/dummy');

const TABLA = 'user';

function list() {
    return store.list(TABLA);
}

module.exports = {
    list,
};