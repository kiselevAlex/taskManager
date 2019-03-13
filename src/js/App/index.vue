<template>
    <el-container>
        <el-header>
            <span class="header-brand">TaskTracker</span>
            <router-view name="header"></router-view>
        </el-header>
        <el-main>
            <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="link in bg" :to="{name:link.name}">{{link.title}}</el-breadcrumb-item>
            </el-breadcrumb>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>
    </el-container>
</template>

<script src="./index.ts" lang="ts"></script>