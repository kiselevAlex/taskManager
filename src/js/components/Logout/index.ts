import { Component } from 'vue-property-decorator'
import BaseComponents from '@/BaseComponents'

@Component
export default class Logout extends BaseComponents {

    logout(){
        this.$store.dispatch('logout');
    }

}
