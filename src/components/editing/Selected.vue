<template>
	<div>
		<v-container>
			<div class="pa-5 d-flex aling-center">
				<p class="mb-0 text-body-1">총 {{ selected.length }}행 선택</p>
				<v-spacer></v-spacer>
				<v-btn @click="cancel" depressed color="primary">cancel</v-btn>
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	props: {
		selected: {
			required: true,
			type: Array,
		},
	},
	methods: {
		cancel() {
			console.log('cance')
		},
	},
}
</script>

<style lang="scss" scoped></style>
