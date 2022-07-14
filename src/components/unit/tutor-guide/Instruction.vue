<template>
	<v-card flat class="pa-3 mx-1">
		<CopyText :val="script.content" :id="`${script.id}`" />
	</v-card>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideInstruction',
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

<style lang="scss" scoped></style>
