import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/Login';
import TaskList from '@/TaskList';

Vue.use(Router);

const base = '';

let router = new Router({
    // mode: 'history',
    base: base,
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: 'Авторизация',
                needAU: false,
            }
        },
        {
            path: '/',
            name: 'TaskList',
            component: TaskList,
            meta: {
                title: 'Список задач',
                needAU: true,
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.needAU)) {
        next({
            path: '/login',
            params: { nextUrl: to.fullPath }
        })
    } else {
        next() 
    }
})

export default router