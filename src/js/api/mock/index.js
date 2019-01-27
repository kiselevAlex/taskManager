import users from './data/users.json'
import tasks from './data/tasks.json'
import Cookies from 'js-cookie'

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
                    code: 200,
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
    fetchToken (data = {}) {
        return login(data, 1000)
    },
    async fetchTasks (data = {}) {
        try{
            return {
                code: 200,
                data: await fetch(tasks, 3000)
            }
        } catch (err) {
            return {
                code: 403,
            }
        }
    },
    async editTasks(data) {
        try{
            return {
                code: 200,
                data: await fetch(data, 3000)
            }
        } catch (err) {
            return {
                code: 403,
            }
        }
    }
}