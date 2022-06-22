export const LOAD = 'LOAD'
export const INITIALIZE = 'INITIALIZE'
export const STORE = 'STORE'

export default {
	[LOAD](state, payload) {
		state.isLoading = payload
	},
	[INITIALIZE](state) {
		state.email = null
		state.name = null
		state.regDate = null
		state.phone = null
		state.countryCode = null
		state.level = null
		state.nation = null
	},
	[STORE](state, payload) {
		state.email = payload.email
		state.name = payload.name
		state.regDate = payload.regDate
		state.phone = payload.phone
		state.countryCode = payload.countryCode
		state.level = payload.level
		state.nation = payload.nation
	},
}
