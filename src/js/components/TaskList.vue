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

<script>
    export default {
        name: "TaskList",
        data() {
            return {
                filters: [{
                    text: 'in_progress',
                    value: 'in_progress'
                }, {
                    text: 'complite',
                    value: 'complite'
                }]
            }
        },
        created(){
            if (this.$store.getters['tasks'].length == 0)
                this.update();
        },
        methods: {
            update(){
                this.$store.dispatch('updateTasks');
            },
            type(status){
                switch (status) {
                    case 'in_progress':
                        return 'primary'
                    case 'complite':
                        return 'success'
                    default:
                        return ''
                }
            },
            link(row, event, column){
                this.$router.push({
                    name: 'Task',
                    params:{
                        id: row.id
                    }
                })
            },
            edit(id){
                this.$router.push({
                    name: 'TaskEdit',
                    params:{
                        id: id
                    }
                })
            },
            filterStatus(value, row) {
                return row.status === value;
            },
            sort(a, b){
                return Date.parse(a.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/,'$3-$2-$1'))
                > Date.parse(b.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/,'$3-$2-$1')) ? 1 : -1;
            }
        },
        computed: {
            list(){
                return this.$store.getters['tasks'];
            },
            loading() {
                return this.$store.getters['preloaders']('tasks')
            }
        }
    }
</script>