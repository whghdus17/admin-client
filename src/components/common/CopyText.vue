<template>
	<div>
		<div style="position: relative; overflow: hidden">
			<!-- The text field -->
			<textarea
				:value="tagRemovedVal"
				:id="id"
				style="opacity: 0; position: absolute; top: -2000px"
			></textarea>
		</div>

		<!-- The button used to copy the text -->
		<span v-if="subject" class="mr-1 grey--text">[{{ subject }}]</span>
		<span
			class="text strong"
			@click="myFunction"
			v-html="val"
			style="z-index: 100"
		></span>
		<v-snackbar v-model="snackbar" bottom right :timeout="1000">
			<h3>Text is Copied!</h3>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	props: {
		val: { require: true },
		id: { require: true },
		subject: { require: false, default: null },
	},
	data() {
		return {
			snackbar: false,
		}
	},
	computed: {
		tagRemovedVal() {
			let text = this.val
			if (typeof this.val === 'string') {
				text = text.replace(/<br>/gi, '\n')
				text = text.replace(/<br>/gi, '\n')
				text = text.replace(/<\/h1>/gi, '\n')
				text = text.replace(/<\/h2>/gi, '\n')
				text = text.replace(/<\/h3>/gi, '\n')
				text = text.replace(/<\/h4>/gi, '\n')
				text = text.replace(/<\/h5>/gi, '\n')
				text = text.replace(/<\/h6>/gi, '\n')
				text = text.replace(/<\/p>/gi, '\n')
				text = text.replace(
					/<(\/)?([a-zA-Z0-9]*)(\s[a-zA-Z0-9]*=[^>]*)?(\s)*(\/)?>/gi,
					'',
				)

				const regex = /\n$/
				while (regex.test(text)) {
					text = text.replace(/\n$/, '')
				}
			}

			return text
		},
	},
	methods: {
		myFunction() {
			/* Get the text field */
			var copyText = document.getElementById(this.id)

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
