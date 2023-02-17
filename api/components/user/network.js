// Toda la parte de la red del usuario

const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');


const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/followers', followers);
//Ese secure('update') ejecuta el caso update del archivo secure
router.put('/', secure('update'), upsert);

function list(req, res) {
    controller.list().then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((error) => {
        response.error(req, res, error.message, 500);
    });
}

function get(req, res) {
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

function follow(req, res) {
    controller.follow(req.user.id, req.params.id).then(
        data => {
            response.success(req, res, data, 201);
        }
    ).catch((error) => {
        response.error(req, res, error.message, 500);
    })
}

function followers(req, res) {
    controller.followers(req.params.id).then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((error) => {
        response.error(req, res, error.message, 500);
    });
}

module.exports = router;