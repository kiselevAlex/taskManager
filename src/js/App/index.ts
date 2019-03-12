import { Component, Watch } from 'vue-property-decorator'
import BaseComponents from '@/BaseComponents'

@Component
export default class App extends BaseComponents {
    
    @Watch('$route', { immediate: true, deep: true })
    onRouteChanged(val: any) { 
        document.title = val.meta.title || 'SimbirSoft TesApp';
    }
    
    get bg(){
        return this.$route.meta.breadcrumbs || []
    }
}