<template>
	<img
		style="position: fixed; right: 5px; top: 230px; z-index: 3"
		class="word-card"
		:src="expressCardUrl"
		alt
	/>
</template>

<script>
export default {
	name: 'GuideWordCard',
	props: {
		programId: {
			require: true,
			type: Number,
		},
		originTalkProgramId: {
			type: Number,
		},
		unit: {
			require: true,
			type: Number,
		},
		unitId: {
			type: Number,
		},
		language: {
			required: true,
			type: String,
			default: 'ko',
		},
	},
	data() {
		return {
			wordCard: null,
		}
	},
	computed: {
		expressCardUrl() {
			const programId = this.originTalkProgramId
				? this.originTalkProgramId
				: this.programId
			return this.language === 'ja'
				? `https://image.tella.co.kr/v1/express-card/${this.unitId}.jpg`
				: `https://image.tella.co.kr/v2/word-card/${programId}_${this.unit}.jpg`
		},
	},
}
</script>

<style scoped>
.word-card {
	width: 56px;
	transition: width 150ms ease-in-out;
}
.word-card:hover {
	width: 400px;
}
</style>
