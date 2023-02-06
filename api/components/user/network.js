// Toda la parte de la red del usuario

const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

function list (req, res) {
    const lista = controller.list().then(() => {
        response.success(req, res, lista, 200);
    }).catch((error) => {
        response.error(req, res, error.message, 500);
    });
}

function get (req, res) {
    controller.get(req.params.id).then((user) => {
        response.success(req, res, user, 200);
    }).catch((error) => {
        response.error(req, res, error.message, 500);
    })
}

function upsert(req, res) {
    controller.upsert(req.body).then((user) => {
        response.success(req, res, user, 200);
    }).catch((error) => {
        response.error(req, res, error.message, 500);
    })
}

module.exports = router;