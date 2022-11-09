<template>
	<div class="pa-3 example-answer">
		<strong class="font-weight-bold">* example answer</strong>
		<CopyText
			style="border-left: 2px solid #ffc700"
			class="pl-1"
			:val="script.content"
			:id="`${script.sequence}`"
		/>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideExampleAnswer',
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
	background-color: #c2c2c2;
	font-size: 14px;
	border-radius: 15px;
	max-width: 300px;
}
</style>
