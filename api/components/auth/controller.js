
const TABLA = "auth";
const auth = require('../../../auth');

module.exports = function (injectedStore) {

    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function login(userName, password) {
        const data = await store.query(TABLA, {userName: userName});
        if(data.password === password) {
            //generar token;
            return auth.sign(data);
        } else {
           throw new Error("Información invalida") 
        }

    }

    function upsert(data) {
        const authData = {
            id: data.id,
        }
        if(data.userName) {
            authData.userName = data.userName;
        }
        if(data.password) {
            authData.password = data.password; 
        }
        return store.upsert(TABLA, authData);
    }
    return {
        upsert,
        login
    }
};