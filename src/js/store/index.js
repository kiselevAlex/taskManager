import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api-client'
import Cookies from 'js-cookie'
import router from './../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        preloaders: [],
        tasks: []
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
        },
        tasks(state, data){
            state.tasks = data
        },
        updateTask(state, data){
            state.tasks = state.tasks.reduce((res, el) => {
                res.push(el.id == data.id ? data : el);
                return res;
            }, [])
        }
    },
    actions: {
        async login({commit, dispatch}, data){
            commit("runPreloader", "login")
            try {
                let res = await api.fetchToken(data)
                Cookies.set('token', res.token, { expires: 1, path: '/' })
                res.isAu = true;
                dispatch('notifyByCode', res)
                return res
            } catch(err) {
                dispatch('notifyByCode', err)
                return err;
            } finally {
                commit("stopPreloader", "login")
            }
        },
        async updateTasks({commit, dispatch}, data = {}){
            commit("runPreloader", "tasks")
            try {
                let res = await api.fetchTasks(data)
                commit("tasks", res.data);
                return res;
            } catch(err) {
                dispatch('notifyByCode', err);
                return err;
            } finally {
                commit("stopPreloader", "tasks")
            }
        },
        async editTask({commit, dispatch}, data = {}){
            commit("runPreloader", "tasks")
            try {
                let res = await api.editTasks(data)
                commit('updateTask', res.data);
                router.push({name: 'Task', params: {id: data.id}})
            } catch(err) {
                dispatch('notifyByCode', err);
                return err;
            } finally {
                commit("stopPreloader", "tasks")
            }
        },
        logout(){
            Cookies.remove('token');
            router.push({name: 'Login'})
        },
        notifyByCode({comit}, data = {}){
            const {code, message, isAu} = data;
            switch(code){
                case 200:
                    if (isAu) router.push({name: 'TaskList'})
                    break;
                case 400:
                    Vue.prototype.$notify({
                        title: 'Error',
                        message: message || 'Incorrect login / password pair',
                        showClose: false,
                        type: 'error'
                    })
                    break;
                case 403:
                    router.push({name: 'Login'})
                    break;
                default:
                    Vue.prototype.$notify({
                        title: 'Error',
                        message: message || 'Service is temporarily unavailable',
                        showClose: false,
                        type: 'error'
                    })
            }
        }
    },
    getters: {
        preloaders: (state) => (name) => {
            return state.preloaders.includes(name);
        },
        tasks: (state) => {
            return state.tasks || [];
        },
        task: (state) => (id) => {
            return state.tasks.reduce((res, el) =>{
                return el.id == id ? el : res
            },{});
        }
    }
})