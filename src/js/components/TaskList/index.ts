import { Component } from 'vue-property-decorator'
import BaseComponents from '@/BaseComponents'

@Component
export default class TaskList extends BaseComponents {

    filters: any = [{
        text: 'in_progress',
        value: 'in_progress'
    }, {
        text: 'complite',
        value: 'complite'
    }]

    created(){
        if (this.$store.getters['tasks'].length == 0)
            this.update();
    }

    private update(){
        this.$store.dispatch('updateTasks');
    }

    type(status: string) {
        switch (status) {
            case 'in_progress':
                return 'primary'
            case 'complite':
                return 'success'
            default:
                return ''
        }
    }

    private link(row: any, event: any, column: any) {
        this.$router.push({
            name: 'Task',
            params:{
                id: row.id
            }
        })
    }

    private edit(id: any){
        this.$router.push({
            name: 'TaskEdit',
            params:{
                id: id
            }
        })
    }

    private filterStatus(value: any, row: any) {
        return row.status === value;
    }

    private sort(a: any, b: any){
        return Date.parse(a.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/,'$3-$2-$1'))
        > Date.parse(b.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/,'$3-$2-$1')) ? 1 : -1;
    }

    get list(){
        return this.$store.getters['tasks'];
    }

    get loading() {
        return this.$store.getters['preloaders']('tasks')
    }
        
}