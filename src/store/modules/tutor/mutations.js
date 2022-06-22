export const LOAD = 'LOAD'
export const STORE = 'STORE'

export default {
	[LOAD](state, payload) {
		state.isLoading = payload
	},
	[STORE](state, payload) {
		state.tutors = payload
	},
}
