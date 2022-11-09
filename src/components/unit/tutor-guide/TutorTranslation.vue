<template>
	<div class="d-flex justify-end">
		<div class="tutor-translation pa-3">
			<CopyText :val="script.content" :id="`${script.sequence}`" />
		</div>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideTutorTranslation',
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
.tutor-translation {
	font-size: 14px;
	background-color: #c2c2c2;
	border-radius: 15px;
	max-width: 300px;
}
</style>
