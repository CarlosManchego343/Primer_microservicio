
const TABLA = 'post';
const { nanoid } = require('nanoid');
const error = require('../../../utils/error');

module.exports = function (injectedstore) {

    let store = injectedstore;

    if(!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    async function get(id) {
        const user = await store.get(TABLA, id);
        if(!user) {
            throw error('No existe este post', 404);
        }
        return user;
    }

    async function upsert(data, user) {
        const post = {
            id: data.id,
            user: user,
            test: data.test,
        };

        if(!data.id) {
            post.id = nanoid();
        };

        return store.upsert(TABLA, post).then(() => post);
    }

    async function like(post, user) {
        const like = await store.upsert(COLLECTION + '_like', {
            post: post,
            user: user,
        });

        return like;
	}

	async function postsLiked(user) {
		const users = await store.query(COLLECTION + '_like', { user: user }, {post: post});
		return users;
	}

	async function postLikers(post) {
		const users = await store.query(COLLECTION + '_like', { post: post }, {post: post});
		return users;
	}

	return {
		list,
		get,
		upsert,
		like,
		postsLiked,
		postLikers,
	}
}