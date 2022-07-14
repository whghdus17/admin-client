<template>
	<div>
		<v-img max-width="350" :src="content"></v-img>
	</div>
</template>

<script>
export default {
	props: {
		content: {
			required: true,
			type: String,
		},
	},
	computed: {
		language() {
			return this.$store.getters['member/language']
		},
	},
}
</script>

<style lang="scss" scoped></style>
