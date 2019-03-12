<template>
    <div>
        <h3 class="page-title">Task list</h3>
        <el-table :data="list" class="task-list" v-loading="loading"
                  :sort="sort"
                  @row-click="link"
                  :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Date"
                             sortable
                             width="90"
                             :sort-orders="['ascending', 'descending']"
                             :sort-method="sort"
                             prop="date"></el-table-column>
            <el-table-column label="Status" width="100" prop="status"
                 :filters="filters"
                 :filter-method="filterStatus"
                 filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag :type="type(scope.row.status)">
                        {{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    align="right"
                    label="Operations">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click.stop="edit(scope.row.id)">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script src="./index.ts" lang="ts"></script>