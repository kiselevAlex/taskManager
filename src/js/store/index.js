import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api-client'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        preloaders: [],
    },
    mutations: {
        stopPreloader(state, data) {
            let idx = state.preloaders.indexOf(data);
            if (idx != -1)
                state.preloaders = state.preloaders.slice(idx + 1)
        },
        runPreloader(state, data) {
            let idx = state.preloaders.indexOf(data);
            if (idx == -1)
                state.preloaders.push(data);
        }
    },
    actions: {
        async login({commit}, data){
            commit("runPreloader", "login")
            try {
                console.log(await api.fetchToken(data))
            } catch(err) {
                console.log(err);
            } finally {
                commit("stopPreloader", "login")
            }
        }
    },
    getters: {
        preloaders: (state) => (name) => {
            return state.preloaders.includes(name);
        }
    }
})