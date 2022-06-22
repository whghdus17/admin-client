export const AUTH_CHECKED = 'AUTH_CHECKED'
export const INITIALIZE = 'INITIALIZE'
export const STORE_ID = 'STORE_ID'

export default {
	[AUTH_CHECKED](state) {
		state.isAuthChecked = true
	},
	[STORE_ID](state, payload) {
		state.tutorId = payload
	},
	[INITIALIZE](state) {
		state.tutorId = null
	},
}
