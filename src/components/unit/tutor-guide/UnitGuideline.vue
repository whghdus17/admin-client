<template>
	<v-card flat v-html="script.content"> </v-card>
</template>

<script>
export default {
	name: 'GuideTutorUnitGuideline',
	props: {
		script: {
			required: true,
			type: Object,
		},
	},
}
</script>

<style lang="scss" scoped></style>
