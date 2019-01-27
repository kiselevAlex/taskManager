<template>
    <el-form @submit="submitForm" class="el-form-login" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top" label-width="120px">
        <el-form-item label="Login" prop="login">
            <el-input type="text" v-model="ruleForm.login" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input @keyup.enter.native="submitForm" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button :loading="submiting" class="f-right" type="primary" @click="submitForm">Sing in</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    login: '',
                    password: ''
                },
                rules: {
                    login: [
                        { required: true, message: 'Please input login'}
                    ],
                    password: [
                        { required: true,  message: 'Please input password' }
                    ]
                }
            }
        },
        beforeRouteLeave (to, from, next){
            next()
            this.ruleForm.password = ''
        },
        methods: {
            async submitForm(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch("login", this.ruleForm)
                    } else {
                        return false;
                    }
                });
            }
        },
        computed: {
            submiting(){
                return this.$store.getters['preloaders']("login");
            }
        }
    }
</script>