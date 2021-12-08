<template>
	<div>
		<v-main :class="background">
			<slot />
		</v-main>
	</div>
</template>

<script>
/**
 * memberId가 null이거나 loading이면
 */
export default {
	computed: {
		userDevice() {
			return this.$store.getters['device/userDevice']
		},
		background() {
			return this.$store.getters['device/background']
		},
	},
}
</script>

<style></style>
