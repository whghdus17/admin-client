// import { createNamespacedHelpers } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
	isLoading: false,
	tutors: [],
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
