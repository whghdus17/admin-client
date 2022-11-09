<template>
	<div class="d-flex justify-end">
		<div class="tutor-question pa-3">
			<CopyText :val="script.content" :id="`${script.sequence}`" />
		</div>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideTutorQuestion',
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
.tutor-question {
	font-size: 16px;
	font-family: Roboto;
	background-color: #fff;
	border: 1px solid #0074ff;
	border-radius: 15px;
	max-width: 300px;
}
</style>
