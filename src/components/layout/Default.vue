<template>
	<div>
		<v-app-bar
			absolute
			dense
			color="white"
			elevation="0"
			style="border-bottom: 1px solid #dadada !important"
		>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title>Title</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn
				v-if="tutorId === null"
				text
				@click="$router.push({ name: 'SignIn' }).catch(() => {})"
				>LOG IN</v-btn
			>
			<SignOutButton v-else />
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</div>
</template>

<script>
import SignOutButton from './SignOutButton'

export default {
	name: 'DefaultLayout',
	components: {
		SignOutButton,
	},
	computed: {
		tutorId() {
			return this.$store.getters['auth/tutorId']
		},
	},
}
</script>

<style scoped></style>
