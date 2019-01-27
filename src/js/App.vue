<template>
    <el-container>
        <el-header>
            <router-view name="header"></router-view>
        </el-header>
        <el-main>
            <ul class="breadcrumbs">
                <template v-for="link in bg">
                    <template v-if="link.name">
                        <li class="breadcrumbs-el">
                            <router-link :to="{name:link.name}">{{link.title}}</router-link>
                        </li>
                        <li class="breadcrumbs-el">
                            <span> >> </span>
                        </li>
                    </template>
                    <span v-else class="breadcrumbs-el">{{link.title}}</span>
                </template>
            </ul>
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
        },
        computed: {
            bg(){
                return this.$route.meta.breadcrumbs || []
            }
        }
    }
</script>