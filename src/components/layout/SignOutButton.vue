<template>
	<v-dialog v-model="dialog" width="350">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text v-bind="attrs" v-on="on"> Log Out </v-btn>
		</template>

		<v-card class="pa-8 text-center">
			<p class="text-body-1 mb-5">Are you sure?</p>
			<v-btn color="primary" text @click="signOut">OK</v-btn>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
	}),
	methods: {
		async signOut() {
			await this.$store.dispatch('auth/signOut')
			this.$router.push({ name: 'SignIn' })
		},
	},
}
</script>

<style lang="scss" scoped></style>
