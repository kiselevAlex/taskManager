<template>
    <el-card class="task-panel" v-loading="preloader">
        <div class="task-panel_title" slot="header">
            <span>{{item.title}}</span>
        </div>
        <div class="task-body">
            <div class="task-body__col">
                <div class="task-body__el">
                    <div class="task-body__el-title">Status:</div>
                    <div v-if="!isEdit" class="task-body__el-value">{{item.status}}</div>
                    <el-select v-else class="task-body__el-value task-body__el-select" v-model="d_item.status" placeholder="Select">
                        <el-option
                                v-for="opt in status"
                                :key="opt.value"
                                :label="opt.label"
                                :value="opt.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="task-body__el">
                    <div class="task-body__el-title">Date:</div>
                    <div class="task-body__el-value">{{item.date}}</div>
                </div>
            </div>
            <div class="task-body__col">
                <div class="task-body__el">
                    <div class="task-body__el-title">Time plan:</div>
                    <div v-if="!isEdit" class="task-body__el-value">{{item.time_plan}}</div>
                    <el-input-number v-else class="task-body__el-value task-body__el-number"
                                     v-model="d_item.time_plan" :min="0" :max="10000"></el-input-number>
                </div>
                <div class="task-body__el">
                    <div class="task-body__el-title">Time real:</div>
                    <div v-if="!isEdit" class="task-body__el-value">{{item.time_real}}</div>
                    <el-input-number v-else  class="task-body__el-value task-body__el-number"
                                     v-model="d_item.time_real" :min="0" :max="10000"></el-input-number>
                </div>
            </div>
            <div class="task-body__about">
                <div class="task-body__about-title">About:</div>
                <div class="task-body__about-value">
                    {{item.about}}
                </div>
            </div>
            <el-button class="task-body__action" v-if="!isEdit" @click="edit" type="primary">Edit</el-button>
            <template v-else>
                <el-button class="task-body__action" @click="save" type="primary">Save</el-button>
                <el-button class="task-body__action" plain @click="cancel" type="primary">Cancel</el-button>
            </template>
        </div>
    </el-card>
</template>

<script src="./index.ts" lang="ts"></script>