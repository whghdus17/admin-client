<template>
	<v-btn @click="copy">
		<v-icon>mdi-content-copy</v-icon>

		<div style="position: relative; overflow: hidden">
			<!-- The text field -->
			<textarea
				:value="JSON.stringify(guide)"
				id="guide-textarea"
				style="opacity: 0; position: absolute; top: -2000px"
			></textarea>

			<v-snackbar v-model="snackbar" bottom right :timeout="1000">
				<h3>Guide is Copied!</h3>
			</v-snackbar>
		</div>
	</v-btn>
</template>

<script>
export default {
	props: {
		guide: { require: true, type: Array },
	},
	data() {
		return {
			snackbar: false,
		}
	},

	methods: {
		copy() {
			/* Get the text field */
			var copyText = document.getElementById('guide-textarea')

			/* Select the text field */
			copyText.select()

			/* Copy the text inside the text field */
			document.execCommand('copy')

			this.snackbar = true
		},
	},
}
</script>

<style scoped>
.text {
	text-decoration: underline;
}
.text:hover {
	cursor: pointer;
}
</style>
