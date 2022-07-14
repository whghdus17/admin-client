<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text v-bind="attrs" v-on="on">
				<v-icon>mdi-code-json</v-icon>
			</v-btn>
		</template>

		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> Paste Guide </v-card-title>

			<v-card-text class="py-5">
				<v-textarea outlined hide-details v-model="guideString"></v-textarea>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="cancel"> Cancel </v-btn>
				<v-btn color="primary" text @click="paste"> Paste </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			guideString: null,
		}
	},
	methods: {
		cancel() {
			this.dialog = false
			this.guideString = null
		},
		IsJsonString(str) {
			try {
				var json = JSON.parse(str)
				return typeof json === 'object'
			} catch (e) {
				return false
			}
		},
		paste() {
			if (this.IsJsonString(this.guideString) === false) {
				alert('정확한 형식이 아닙니다.')
				return
			}
			const guideArray = JSON.parse(this.guideString)
			if (guideArray.length >= 100) {
				alert('100개 이상의 스크립트는 붙여넣을 수 없습니다.')
				return
			}

			guideArray.forEach(s => {
				if (
					!s.content ||
					!s.program_guide_component_id ||
					s.sequence === undefined
				)
					alert('스크립트 구조가 일치하지 않습니다.')
				return
			})

			this.$emit('paste', this.guideString)
			this.dialog = false
			this.guideString = null
		},
	},
}
</script>

<style lang="scss" scoped></style>
