export const SET_SCROLL = 'SET_SCROLL'
export const SET_DRAWER = 'SET_DRAWER'
export const NOTICE = 'NOTICE'
export const SET_BACKGROUND = 'SET_BACKGROUND'
export const DETECT = 'DETECT'
export const SET_TIMEZONE = 'SET_TIMEZONE'
export const STORE_FROM_ROUTER = 'STORE_FROM_ROUTER'
export const BOOK_ACTION_SHEET_CONTROL = 'BOOK_ACTION_SHEET_CONTROL'

export default {
	[SET_SCROLL](state, payload) {
		state.pageYOffset = payload
	},
	[SET_DRAWER](state) {
		state.originDrawer = !state.originDrawer
	},
	[NOTICE](state, payload) {
		state.noticeAlarm = payload
	},
	[SET_BACKGROUND](state, payload) {
		state.background = payload
	},
	[SET_TIMEZONE](state, payload) {
		state.timezone = payload
	},
	[STORE_FROM_ROUTER](state, payload) {
		state.fromRouter = payload
	},
	[BOOK_ACTION_SHEET_CONTROL](state) {
		state.bookActionSheet = !state.bookActionSheet
	},
	[DETECT](state) {
		;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		)
			? (state.userDevice = 'mobile')
			: (state.userDevice = 'desktop')
	},
}
