import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import router from './router/index'
import store from './store/index'
import App from './App'
import './../scss/index.scss'

Vue.use(ElementUI, { locale })

new Vue({
    el: '.app',
    store,
    router,
    render: h => h(App)
});