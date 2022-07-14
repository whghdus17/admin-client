<template>
	<v-card flat class="pa-3 mx-1 hidden-instruction">
		<CopyText :val="script.content" :id="`${script.id}`" />
	</v-card>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideHiddenInstruction',
	components: {
		CopyText,
	},
	props: {
		script: {
			required: true,
			type: Object,
		},
	},
}
</script>

<style lang="scss" scoped>
.hidden-instruction {
	border: 1px solid #000;
	background-color: #c7d7eb;
}
</style>
