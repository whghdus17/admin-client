<template>
	<div class="introduction py-3" v-html="content"></div>
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
.introduction {
	h3 {
		font-size: 20px !important;
		font-weight: bold !important;
		color: #1a1a1a;
		line-height: 29px !important;
	}
	p {
		font-weight: normal !important;
		font-size: 16px !important;
		color: #1a1a1a;
		line-height: 28px !important;
	}
}
</style>
