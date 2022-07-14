<template>
	<div class="d-flex justify-end">
		<div flat class="pa-3 tutor-hidden-question">
			<strong class="font-weight-bold">* Tutor Hidden Question</strong>
			<CopyText :val="script.content" :id="`${script.id}`" />
		</div>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideTutorHiddenQuestion',
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
.tutor-hidden-question {
	max-width: 300px;
	background-color: #c7d7eb;
	border: 1px solid #000000;
	border-radius: 15px;
}
</style>
