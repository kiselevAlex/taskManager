<template>
    <el-container>
        <el-header>

        </el-header>
        <el-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>    
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "App",
        watch: {
            '$route': (val) => {
                document.title = val.meta.title || 'SimbirSoft TesApp';
            }
        }
    }
</script>