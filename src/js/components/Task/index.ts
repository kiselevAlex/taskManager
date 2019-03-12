import { Component } from 'vue-property-decorator'
import BaseComponents from '@/BaseComponents'

@Component
export default class Task extends BaseComponents {

    status: any = [{
        value: 'complite',
        label: 'complite',
    }, {
        value: 'in_progress',
        label: 'in_progress',
    }]

    d_item: any = {}
    
    created(){
        if (this.$store.getters['tasks'].length == 0)
            this.$store.dispatch('updateTasks');
    }

    edit(){
        this.$router.push({name: 'TaskEdit', params: this.$route.params})
    }

    save(){
        this.$store.dispatch('editTask', this.d_item);
    }

    cancel(){
        this.$router.push({name: 'Task', params: this.$route.params})
    }

    get id() {
        return this.$route.params.id;
    }

    get item(){
        let item = this.$store.getters['task'](this.id)
        if (this.isEdit) {
            this.d_item = { ...item }
        }
        return item
    }

    get preloader(){
        return this.$store.getters['preloaders']('tasks');
    }

    get isEdit(){
        return this.$route.meta.edit || false
    }

}