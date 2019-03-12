import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from './store/index'
import App from './App'
import './../less/index.less'

Vue.use(ElementUI, { locale })

new Vue({
    el: '.app',
    store,
    router,
    render: h => h(App)
});