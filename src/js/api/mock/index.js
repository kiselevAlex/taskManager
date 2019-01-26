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
    console.log(login, password);
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
                    code: 403
                })
        }, time)
    })
}


export default {
    fetchToken (data = {}) {
        return login(data, 1000)
    },
    fetchTasks (data = {}) {
        return fetch(tasks, 1000)
    }
}