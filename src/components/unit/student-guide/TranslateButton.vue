<template>
	<div>
		<v-fade-transition>
			<div v-show="show === true" class="text-caption text-right book-tooltip">
				<span>한국어 해석과 영작 예시 답안을<br />확인할 수 있어요!</span>
				<v-btn
					style="position: absolute; left: 4px; top: 4px"
					color="white"
					x-small
					icon
					text
					@click="close"
					><v-icon>mdi-window-close</v-icon></v-btn
				>
				<div class="chat-tail"></div>
			</div>
		</v-fade-transition>
		<v-btn
			@click="$emit('clickTranslateBtn')"
			color="primary"
			fab
			class="font-weight-bold text-body-2"
		>
			<span v-if="translate === false">ABC</span>
			<span v-else>A/한</span>
		</v-btn>
	</div>
</template>

<script>
export default {
	props: {
		translate: { required: true, type: Boolean },
	},
	data() {
		return {
			show: false,
		}
	},
	computed: {
		permanetlyNotShow() {
			return (
				localStorage.getItem('guide-translate-tooltip') === 'true' ||
				localStorage.getItem('guide-translate-tooltip') === true
			)
		},
	},
	created() {
		if (this.permanetlyNotShow !== true) this.show = true
	},
	methods: {
		close() {
			localStorage.setItem('guide-translate-tooltip', true)
			this.show = false
		},
	},
}
</script>

<style lang="scss" scoped>
.book-tooltip {
	z-index: 3;
	color: #fff;
	line-height: 1.1em;
	background: #353535;
	border-radius: 5px;
	width: 210px;
	position: absolute;
	padding-top: 18px;
	padding-bottom: 15px;
	padding-right: 20px;
	top: 50px;
	right: 5px;

	.chat-tail {
		width: 0;
		height: 0;
		position: absolute;
		top: -5px;
		right: 30px;
		margin-left: 2.5px;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;

		border-bottom: 5px solid #353535;
	}
}
</style>
