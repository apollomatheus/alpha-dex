import Vuex from 'vuex'
import Vue from 'vue'

//import modules from './modules';
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const modules = {
    //orders: require('./orders'),
    session: require('./session'),
    system: require('./system'),
};

export default new Vuex.Store({
    modules,
});









