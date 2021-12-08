import Api from '@/services/index'
import { STORE, LOAD } from './mutations'

export default {
	get: async ({ commit }) => {
		commit(LOAD, true)
		const res = await Api.get('/tutors')
		console.log(res.data)
		commit(STORE, res.data)
		commit(LOAD, false)
	},
}
