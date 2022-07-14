<template>
	<div class="d-flex justify-end">
		<div flat class="pa-3 setting">
			<strong class="font-weight-bold">
				<CopyText :val="`[ ${script.content} ]`" :id="`${script.id}`" />
			</strong>
		</div>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideTargetExpression',
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
.setting {
	max-width: 250px;
	background-color: #fff;
	border: 1px solid #0074ff;
	border-radius: 15px;
	font-size: 16px;
}
</style>
