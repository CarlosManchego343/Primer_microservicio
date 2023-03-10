// Este archivo es el unico que va a trabajar con las bases de datos

const TABLA = 'user';
const { nanoid } = require('nanoid');
const auth = require('../auth');

module.exports = function (injectedStore) {

    let store = injectedStore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        };

        if(body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        };

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    function follow(from, to) {
        return store.upsert(
            TABLA + '_follow',{
            user_from: from,
            user_to: to
        });
    }

    function followers(user_from) {
        return store.query(
            TABLA + '_follow', {
                user_from: user_from
            }
        )
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        followers
    };
}

