<template>
	<v-data-table
		v-model="selected"
		show-select
		hide-default-footer
		:headers="headers"
		:items="items"
		:items-per-page="-1"
		class="elevation-1 corrected"
	>
		<template v-slot:item.before="{ item }">
			<div v-html="item.before"></div>
		</template>
		<template v-slot:item.after="{ item }">
			<div v-html="item.after"></div
		></template>
	</v-data-table>
</template>

<script>
const jsdiff = require('diff')

const R = require('ramda')

export default {
	props: {
		editings: {
			required: true,
			type: Array,
		},
	},
	data() {
		return {
			selected: [],
			headers: [
				{
					text: 'Created Date',
					align: 'start',
					sortable: false,
					value: 'created_date',
				},
				{ text: 'Lesson Id', value: 'regular_lesson_id' },
				{ text: 'Tutor', value: 'tutor' },
				{ text: 'Sentence Correction Id', value: 'id' },
				{ text: 'Tutee Content', value: 'before' },
				{ text: 'Tutor Content', value: 'after' },
				{ text: 'status', value: 'status' },
			],
		}
	},
	watch: {
		selected(val) {
			this.$emit('selectEditings', val)
		},
	},
	computed: {
		items() {
			const tutors = this.$store.getters['tutor/tutors']
			return this.editings.map(item => {
				const tutorName = R.find(R.propEq('id', item.editing_tutor_id))(
					tutors,
				).name

				item.created_date = item.created_at.substr(0, 10)
				item.tutor = `${tutorName}(#${item.editing_tutor_id})`
				item.before = this.beforeDiff(
					item.tutee_chat_log_content,
					item.tutor_chat_log_content,
				)
				item.after = this.afterDiff(
					item.tutee_chat_log_content,
					item.tutor_chat_log_content,
				)
				return item
			})
		},
		tutor() {
			return R.find(R.propEq('id', this.item.editing_tutor_id))(
				this.$store.getters['tutor/tutors'],
			)
		},
	},
	methods: {
		beforeDiff(a, b) {
			let diff = jsdiff.diffWords(a, b)
			let span = null

			diff.forEach(function (part) {
				if (part.removed) {
					span === null
						? (span = `<span class='font-weight-bold before before-highlight'>${part.value}</span>`)
						: (span += `<span class='font-weight-bold before before-highlight'>${part.value}</span>`)
				} else if (!part.added) {
					span === null
						? (span = '<span>' + part.value + '</span>')
						: (span = span + '<span>' + part.value + '</span>')
				}
			})
			return span
		},
		afterDiff(a, b) {
			let diff = jsdiff.diffWords(a, b)
			let span = null

			diff.forEach(function (part) {
				if (part.added) {
					span === null
						? (span = `<span class='font-weight-bold after after-highlight'>${part.value}</span>`)
						: (span += `<span class='font-weight-bold after after-highlight'>${part.value}</span>`)
				} else if (!part.removed) {
					span === null
						? (span = '<span>' + part.value + '</span>')
						: (span = span + '<span>' + part.value + '</span>')
				}
			})
			return span
		},
	},
}
</script>

<style lang="scss">
.corrected {
	.higilight {
		border-radius: 5px !important;
		padding: 2px 5px 1px 6px;
	}
	.before-highlight {
		background-color: #feeeed;
	}
	.before {
		color: #b0433e;
	}
	.after-highlight {
		background: rgba(193, 233, 206, 0.3);
	}
	.after {
		color: #019b5b;
	}
}
</style>
