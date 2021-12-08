import Vue from 'vue'
import Vuex from 'vuex'

import device from './modules/device/index'
import auth from './modules/auth/index'
import user from './modules/user/index'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		device,
		auth,
		user,
	},
})
