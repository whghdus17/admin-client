import Api from '@/services/index'
import { AUTH_CHECKED, STORE_ID } from './mutations'

export default {
	get: async ({ commit }) => {
		try {
			commit(STORE_ID, null)
			commit(AUTH_CHECKED)
			const res = await Api.get(`/auth`)
			if (res) commit(STORE_ID, res.data)
		} catch (err) {
			throw new Error(err)
		}
	},
	signOut: async ({ commit }) => {
		await Api.delete('/auth')
		commit(STORE_ID, null)
		commit('user/INITIALIZE', null, { root: true })
		commit('tutor/STORE', [], { root: true })
	},
}
