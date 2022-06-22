import Api from '@/services/index'
import { STORE, INITIALIZE } from './mutations'

export default {
	get: async ({ commit, rootGetters }) => {
		commit(INITIALIZE)
		// dispatch('stopTime')
		const tutorId = rootGetters['auth/tutorId']
		const res = await Api.get(`/tutors/${tutorId}`)
		commit(STORE, res.data)
	},
}
