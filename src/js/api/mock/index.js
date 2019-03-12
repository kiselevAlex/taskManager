import users from './data/users.json'
import tasks from './data/tasks.json'

const fetch = (mockData, time = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData)
        }, time)
    })
}

const login = (data, time = 0) => {
    const {login, password} = data;
    return new Promise((resolve, reject) => {
        let user = users.reduce((res, el) => {
            return el.login == login 
                && el.password == password ? el : res;
        }, undefined);
        setTimeout(() => {
            if (user)
                resolve({
                    token: user.uid + 'very_cool_token'
                })
            else 
                reject({
                    code: 400
                })
        }, time)
    })
}


export default {
    async fetchToken(data = {}) {
        return login(data, 1000)
    },
    async fetchTasks(data = {}) {
        try{
            return await fetch(tasks, 3000)
        } catch (err) {
            return {
                code: 403,
            }
        }
    },
    async editTasks(data) {
        try{
            return await fetch(data, 3000)
        } catch (err) {
            return {
                code: 403,
            }
        }
    }
}