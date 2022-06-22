import axios from 'axios'
import router from '../router'
import store from '../store/index'

// const acTk = () => {
// 	return localStorage.getItem('_acTk')
// }

// const reTk = () => {
// 	return localStorage.getItem('_reTk')
// }

const instance = axios.create({
	baseURL: '/api',
	// headers: {
	//   'Access-Control-Allow-Origin': '*'
	// }
})

instance.interceptors.request.use(config => {
	// config.headers["x-access-token"] = acTk();
	// config.headers["x-refresh-token"] = reTk();
	config.withCredentials = true
	return config
})

instance.interceptors.response.use(
	response => {
		// if (response.headers["x-access-token"]) {
		//   localStorage.setItem("_acTk", response.headers["x-access-token"]);
		// }
		// if (response.headers["x-refresh-token"]) {
		//   localStorage.setItem("_reTk", response.headers["x-refresh-token"]);
		// }
		return response
	},
	err => {
		if (process.env.NODE_ENV === 'development') {
			console.error(err)
		}
		if (
			store.getters['auth/isAuthcheced'] === true &&
			store.getters['auth/tutorId'] !== null &&
			err.response.status === 401
		) {
			store.dispatch('auth/signOut')
			router.push({ name: 'SignIn' }).catch(() => {})
			return
		}

		return Promise.reject(err)
	},
)

export default instance
