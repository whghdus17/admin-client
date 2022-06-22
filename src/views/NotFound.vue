<template>
	<v-container>
		<v-row
			style="height: 100vh; max-height: 500px"
			class="d-flex align-center justify-center"
		>
			<v-card flat class="py-8 text-center" width="350">
				<h1 class="text-h2 font-weight-black">404</h1>
				<h2 class="text-body-1 mb-5">NOT FOUND</h2>
				<v-btn depressed @click="$router.push({ name: 'Home' })">Home</v-btn>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
