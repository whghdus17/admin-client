<template>
	<div class="setting">
		<div v-html="content"></div>
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
}
</script>

<style lang="scss">
.setting h3 {
	color: #1e78ff !important;
	font-size: 16px !important;
	font-weight: bold !important;
}
</style>
