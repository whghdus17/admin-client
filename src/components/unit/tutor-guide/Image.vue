<template>
	<img :src="script.content" class="image" />
</template>

<script>
export default {
	name: 'GuideImage',
	props: {
		script: {
			required: true,
			type: Object,
		},
	},
}
</script>

<style lang="scss" scoped>
.image {
	max-width: 100%;
}
</style>
