import store from '../store'

const authReject = async (to, from, next) => {
	const tutorId = store.getters['auth/tutorId']
	tutorId ? next('/') : next()
}

const authOnly = async (to, from, next) => {
	const tutorId = store.getters['auth/tutorId']
	if (!tutorId) {
		const goTo = { name: to.name, query: to.query, params: to.params }
		next({ name: 'SignIn', query: { redir: JSON.stringify(goTo) } })
		return
	} else {
		next()
	}
}

export default {
	authReject,
	authOnly,
}
