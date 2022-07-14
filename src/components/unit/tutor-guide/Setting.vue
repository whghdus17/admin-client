<template>
	<div class="d-flex justify-center">
		<v-card flat class="pa-3 mx-1 setting">
			<CopyText :val="script.content" :id="`${script.id}`" />
		</v-card>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideSetting',
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
}
</style>
