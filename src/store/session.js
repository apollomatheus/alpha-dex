const cookies = require('../utils').cookies

const state = {
    session: null,
};

const mutations = {
    ValidateSession(state,callback) {
        if (state.session) {
            var reply = window.EIPC({ "command": "validateSession", "session": state.session });
            callback({valid: (reply.code == 200), error: reply.error});
        }
    },

    DefaultPreferences(state,callback) {
        if (callback && state.session) {
            var reply = window.EIPC({ "command": "defaultPreferences", "session": state.session });
            callback(reply);
        }
    },

    GetPreferences(state,callback) {
        if (callback && state.session) {
            var reply = window.EIPC({ "command": "getPreferences", "session": state.session });
            callback(reply);
        }
    },

    TryLogin(state,params) {
        if (params.password && params.callback) {
            var reply = window.EIPC({ "command": "tryLogin", "password": params.password });
            params.callback({code: reply.code, error: reply.error, session: reply.session });
        }
    },
    
    TryRegister(state,params) {
        if (params.password && params.callback) {
            var reply = window.EIPC({ "command": "tryRegister", "password": params.password });
            params.callback({code: reply.code, error: reply.error });
        }
    },

    GetCookieSession(state,callback) {
        var cookie = cookies.find('session');
        if (cookie) {
            callback(true);
        } else {
            callback(false);
        }
    },

    ClearCookieSession(state) {
        cookies.remove('session');
    },

    SaveSession(state,params) {
        if (params.session) {
            cookies.remove('session');
            cookies.insert('session',params.session);
            state.session = params.session;
        }
    },
};

module.exports = {
    state,
    mutations,
}