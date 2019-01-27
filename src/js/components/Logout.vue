<template>
    <el-button class="logout" @click="logout" type="primary" plain="">
        Logout
    </el-button>
</template>

<script>
    export default {
        name: "Logout",
        methods: {
            logout(){
                this.$store.dispatch('logout');
            }
        }
    }
</script>

<style scoped>

</style>