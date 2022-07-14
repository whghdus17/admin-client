<template>
	<div class="pa-3 example-answer">
		<strong class="font-weight-bold">* reference answer</strong>
		<CopyText
			style="border-left: 2px solid #ffc700"
			class="pl-1"
			:val="script.content"
			:id="`${script.id}`"
		/>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideReferenceAnswer',
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
.example-answer {
	background-color: #e4a01b;
	font-size: 14px;
	border-radius: 15px;
	max-width: 300px;
}
</style>
