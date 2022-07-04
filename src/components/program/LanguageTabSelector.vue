<template>
	<div>
		<v-tabs v-model="tab">
			<v-tab>🇰🇷 한국어(KO)</v-tab>
			<v-tab>🇯🇵 일본어(JA)</v-tab>
		</v-tabs>
	</div>
</template>

<script>
export default {
	props: {
		originLanguage: {
			type: String,
			requierd: false,
		},
	},
	data() {
		return {
			tab: null,
		}
	},
	computed: {
		language() {
			return this.tab === 0 ? 'ko' : 'ja'
		},
	},
	watch: {
		tab() {
			this.$emit('selectLanguage', this.language)
		},
	},
	created() {
		if (this.originLanguage) {
			if (this.originLanguage === 'ko') this.tab = 0
			if (this.originLanguage === 'ja') this.tab = 1
		}
	},
}
</script>

<style lang="scss" scoped></style>
