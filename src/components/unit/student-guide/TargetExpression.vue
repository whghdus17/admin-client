<template>
	<div class="target-expression black-text">
		{{ content }}
	</div>
</template>

<script>
export default {
	props: {
		content: {
			required: true,
			type: String,
		},
	},
	computed: {
		filteredScript() {
			// eslint-disable-next-line no-useless-escape
			var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
			//특수문자 검증
			if (reg.test(this.content)) {
				//특수문자 제거후 리턴
				return this.content.replace(reg, '')
			} else {
				//특수문자가 없으므로 본래 문자 리턴
				return this.content
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.target-expression {
	box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
	border-radius: 20px;
	padding: 22px 16px;
	font-size: 14px;
	font-weight: normal;
	line-height: 22px;
}
</style>
