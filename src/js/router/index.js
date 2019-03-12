import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

import Login from '@/Login';
import TaskList from '@/TaskList';
import Task from '@/Task';
import Logout from '@/Logout';

Vue.use(Router);

const base = '';

let router = new Router({
    // mode: 'history',
    base: base,
    routes: [
        {
            path: '/login',
            name: 'Login',
            components: {
                default: Login
            },
            meta: {
                title: 'Authorization',
                needAU: false,
            }
        }, {
            path: '/:id',
            name: 'Task',
            components: {
                default: Task,
                header: Logout
            },
            meta: {
                title: 'Task',
                needAU: true,
                breadcrumbs: [{
                    name: 'TaskList',
                    title: 'Task List',
                }, {
                    title: 'Task',
                }]
            }
        }, {
            path: '/:id/edit',
            name: 'TaskEdit',
            components: {
                default: Task,
                header: Logout
            },
            meta: {
                edit: true,
                title: 'Edit task',
                needAU: true,
                breadcrumbs: [{
                    name: 'TaskList',
                    title: 'Task List',
                }, {
                    title: 'Task',
                }]
            }
        }, {
            path: '/',
            name: 'TaskList',
            components: {
                default: TaskList,
                header: Logout
            },
            meta: {
                title: 'Task list',
                needAU: true,
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.needAU)) {
        if (!Cookies.get('token'))
            next({name: 'Login'})
        else
            next()
    } else if (to.matched.some(record => record.name == 'Login')) {
        if (!Cookies.get('token'))
            next()
        else
            next({name: 'TaskList'})
    } else {
        next()
    }
})

export default router