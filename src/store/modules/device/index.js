// import { createNamespacedHelpers } from 'vuex'
import getters from './getters'
import mutations from './mutations'

const state = {
	pageYOffset: 0,
	originDrawer: false,
	background: 'white',
	noticeAlarm: false,
	bookActionSheet: false,
	userBrowser: null,
	userDevice: null,
	windowSize: {
		x: 0,
		y: 0,
	},
	fromRouter: null,
}

// const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(NAMESPACE)

// export {
//   mapGetters,
//   mapMutations,
//   mapActions
// }

export default {
	namespaced: true,
	state,
	getters,
	mutations,
}
