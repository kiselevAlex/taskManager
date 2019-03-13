import { Component, Watch } from 'vue-property-decorator'
import BaseComponents from '@/BaseComponents'
import * as firebase from 'firebase'

@Component
export default class App extends BaseComponents {
    
    created(){
        firebase.initializeApp({
            apiKey: "AIzaSyDt6Pqs8q9v4s1yYL90b1eZ4eybCYi4JHY",
            authDomain: "taskmanager-a8506.firebaseapp.com",
            databaseURL: "https://taskmanager-a8506.firebaseio.com",
            projectId: "taskmanager-a8506",
            storageBucket: "taskmanager-a8506.appspot.com",
            messagingSenderId: "157464483144"
        })
    }

    @Watch('$route', { immediate: true, deep: true })
    onRouteChanged(val: any) { 
        document.title = val.meta.title || 'SimbirSoft TesApp';
    }
    
    get bg(){
        return this.$route.meta.breadcrumbs || []
    }
}