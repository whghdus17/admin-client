// import { createNamespacedHelpers } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
	isLoading: false,
	email: null,
	name: null,
	regDate: null,
	phone: null,
	countryCode: null,
	level: null,
	nation: null,
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
