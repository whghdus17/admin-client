import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'
import guard from './guard'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { layout: 'default' },
		beforeEnter: guard.authOnly,
		component: Home,
	},
	{
		path: '/sign-in',
		name: 'SignIn',
		meta: { layout: 'empty' },
		beforeEnter: guard.authReject,
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/SignIn.vue'),
	},
	{
		path: '/editing',
		name: 'Editing',
		meta: { layout: 'default' },
		beforeEnter: guard.authOnly,
		component: () =>
			import(/* webpackChunkName: "editing" */ '../views/Editing.vue'),
	},
	{
		path: '/program',
		name: 'Program',
		meta: { layout: 'default' },
		beforeEnter: guard.authOnly,
		component: () =>
			import(/* webpackChunkName: "program" */ '../views/Program.vue'),
	},
	{
		path: '/program/add',
		name: 'ProgramAdd',
		meta: { layout: 'default' },
		beforeEnter: guard.authOnly,
		component: () =>
			import(/* webpackChunkName: "program" */ '../views/ProgramAdd.vue'),
	},
	{
		path: '/program/:id',
		name: 'ProgramDetail',
		meta: { layout: 'default' },
		beforeEnter: guard.authOnly,
		component: () =>
			import(/* webpackChunkName: "program" */ '../views/ProgramDetail.vue'),
	},
	{
		path: '/program/:id/edit/:language',
		name: 'ProgramEdit',
		meta: { layout: 'default' },
		beforeEnter: guard.authOnly,
		component: () =>
			import(/* webpackChunkName: "program" */ '../views/ProgramEdit.vue'),
	},
	{
		path: '/404',
		meta: { layout: 'empty' },
		beforeEnter: guard.authOnly,
		name: 'NotFound',
		component: () =>
			import(/* webpackChunkName: "home" */ '../views/NotFound.vue'),
	},
	{
		path: '*',
		redirect: '/404',
		// 아래처럼 바로 NotFound 경로를 매칭해도 됨
		// component: NotFound
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach(async (to, from, next) => {
	try {
		const isAuthChecked = store.getters['auth/isAuthChecked']
		if (!isAuthChecked) {
			await store.dispatch('auth/get')
			await store.dispatch('user/get')
		}
	} catch (err) {
		await store.dispatch('auth/signOut')
	} finally {
		store.commit('device/STORE_FROM_ROUTER', from)
		next()
	}
})

export default router
