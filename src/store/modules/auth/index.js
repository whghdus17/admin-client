// import { createNamespacedHelpers } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
	isAuthChecked: false,
	tutorId: null,
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
	actions,
}
