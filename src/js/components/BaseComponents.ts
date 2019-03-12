import { Vue } from 'vue-property-decorator'
import { Route, Location } from 'vue-router'
import { Store } from 'vuex'
import { AppState } from './../store/index'

export default class BaseComponents extends Vue {
	$refs: any
}
