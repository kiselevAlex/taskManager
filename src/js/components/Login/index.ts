import { Component } from 'vue-property-decorator'
import BaseComponents from '@/BaseComponents'

Component.registerHooks([
    'beforeRouteLeave',
])

@Component
export default class Login extends BaseComponents {

    ruleForm: any = {
        login: '',
        password: ''
    }

    rules: any = {
        login: [
            { required: true, message: 'Please input login'}
        ],
        password: [
            { required: true,  message: 'Please input password' }
        ]
    }


    beforeRouteLeave (to: any, from: any, next: any){
        next()
        this.ruleForm.password = ''
    }
    
    get submiting(){
        return this.$store.getters['preloaders']("login");
    }

    async submitForm(){
        this.$refs['ruleForm'].validate((valid: boolean) => {
            if (valid) {
                this.$store.dispatch("login", this.ruleForm)
            } else {
                return false;
            }
        });
    }
}
