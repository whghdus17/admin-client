<template>
	<div>
		<v-app-bar
			absolute
			dense
			color="white"
			elevation="0"
			style="border-bottom: 1px solid #dadada !important"
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>TELLA ADMIN</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn
				v-if="tutorId === null"
				text
				@click="$router.push({ name: 'SignIn' }).catch(() => {})"
				>LOG IN</v-btn
			>
			<SignOutButton v-else />
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list nav dense>
				<v-list-item
					v-for="menu in list"
					:key="menu"
					@click="$router.push({ name: menu }).catch(() => {})"
				>
					<v-list-item-title>{{ menu }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main class="pt-12">
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
	data() {
		return {
			drawer: false,
			list: ['Editing', 'Program'],
		}
	},
	computed: {
		tutorId() {
			return this.$store.getters['auth/tutorId']
		},
	},
}
</script>

<style scoped></style>
