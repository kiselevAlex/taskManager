import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api-client'
import * as Cookies from 'js-cookie'
import Task from './../api/types/Task'
import User from './../api/types/User'
import router from './../router/index'

Vue.use(Vuex);

export interface AppState {
    tasks: any;
    preloaders: any;
}

export default new Vuex.Store<AppState>({
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
        updateTask(state, data: Task){
            state.tasks = state.tasks.reduce((res: Array<Task>, el: Task) => {
                res.push(el.id == data.id ? data : el);
                return res;
            }, [])
        }
    },
    actions: {
        async login({commit, dispatch}, data: User){
            commit("runPreloader", "login")
            try {
                const { token } = await api.fetchToken(data)
                Cookies.set('token', token, { expires: 1, path: '/' })
                dispatch('notifyByCode', { code: 200, isAu: true })
                return token
            } catch(err) {
                dispatch('notifyByCode', err)
                return err;
            } finally {
                commit("stopPreloader", "login")
            }
        },
        async updateTasks({commit, dispatch}, data: User){
            commit("runPreloader", "tasks")
            try {
                let res = await api.fetchTasks(data)
                commit("tasks", res);
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
                commit('updateTask', res);
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
        notifyByCode({}, {code, message, isAu}){
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
        preloaders: (state) => (name: string): boolean => {
            return state.preloaders.includes(name);
        },
        tasks: (state): Array<Task> => {
            return state.tasks || [];
        },
        task: (state) => (id: number): Task => {
            return state.tasks.reduce((res: Task, el: Task) =>{
                return el.id == id ? el : res
            },{});
        }
    }
})