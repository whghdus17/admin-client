<template>
	<v-app>
		<component :is="layout">
			<router-view></router-view>
		</component>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		//
	}),
	computed: {
		isAuthChecked() {
			return this.$store.getters['auth/isAuthChecked']
		},
		tutorId() {
			return this.$store.getters['auth/tutorId']
		},
		userDevice() {
			return this.$store.getters['device/userDevice']
		},
		layout() {
			return this.$route.meta.layout
		},
	},

	created() {
		this.setScreenSize()
		window.addEventListener('resize', () => this.setScreenSize())

		this.$store.commit('device/DETECT')
	},
	methods: {
		setScreenSize() {
			let vh = window.innerHeight * 0.01
			// Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		},
	},
}
</script>
