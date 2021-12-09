<template>
	<div>
		<v-container class="px-5 d-flex align-center">
			<p class="mb-0 text-body-1">총 {{ selected.length }}행 선택</p>
			<v-spacer></v-spacer>
			<v-btn class="ma-0" @click="cancel" depressed color="primary"
				>cancel</v-btn
			>
		</v-container>
	</div>
</template>

<script>
import Api from '@/services/index'
const R = require('ramda')

export default {
	props: {
		selected: {
			required: true,
			type: Array,
		},
	},
	computed: {
		ids() {
			return R.map(item => item.id, this.selected)
		},
	},
	methods: {
		async cancel() {
			try {
				this.isLoading = true
				await Api.patch(`/editings/cancel?id-in=${this.ids}`)
				this.isLoading = false
				this.$emit('cancel')
			} catch (err) {
				console.log(err.response)
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
