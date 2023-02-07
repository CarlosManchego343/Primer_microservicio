
const TABLA = "auth";

module.exports = function (injectedStore) {

    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
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
    }
};