<template>
	<v-card outlined flat>
		<div class="grey lighten-3 px-3 py-1 d-flex align-center">
			<div class=""># {{ script.sequence }}</div>
			<v-spacer></v-spacer>
			<v-select
				style="max-width: 225px"
				:items="guideComponents"
				v-model="component"
				dense
				outlined
				hide-details
				@change="updateComponent"
				class="mr-2"
				background-color="white"
			>
			</v-select>
			<v-btn small icon @click="$emit('deleteScript', script.sequence)"
				><v-icon>mdi-trash-can</v-icon></v-btn
			>
		</div>
		<div v-show="isDragging === false">
			<!-- <div class="text-right">
				<v-btn icon v-if="type === 'code'" @click="type = 'editor'"
					><v-icon>mdi-pencil-outline</v-icon></v-btn
				>
				<v-btn @click="type = 'code'" v-if="type === 'editor'" icon
					><v-icon>mdi-xml</v-icon></v-btn
				>
			</div> -->
			<!-- v-if="type === 'code'" -->
			<Editor :value="script.content" @input="updateContent" />
		</div>
	</v-card>
</template>

<script>
import Editor from '@/components/common/Editor'

export default {
	components: {
		Editor,
	},
	props: {
		isDragging: {
			type: Boolean,
			default: false,
		},
		script: {
			required: true,
			type: Object,
		},
	},
	data() {
		return {
			type: 'editor',
			component: null,
			guideComponents: [
				{ value: 1, text: 'unit-guideline' },
				{ value: 2, text: 'instruction' },
				{ value: 3, text: 'target-expression' },
				{ value: 4, text: 'student-line' },
				{ value: 5, text: 'example-answer' },
				{ value: 6, text: 'tutor-line' },
				{ value: 7, text: 'tutor-translation' },
				{ value: 8, text: 'hint' },
				{ value: 9, text: 'hidden-instruction' },
				{ value: 10, text: 'tutor-hidden-question' },
				{ value: 11, text: 'setting' },
				{ value: 12, text: 'tutor-question' },
				{ value: 13, text: 'reference-answer' },
				{ value: 14, text: 'image' },
			],
		}
	},
	created() {
		this.component = this.script.program_guide_component_id
	},
	methods: {
		updateComponent() {
			this.$emit('updateComponent', this.script.sequence, this.component)
		},
		updateContent(value) {
			this.$emit('updateContent', this.script.sequence, value)
		},
	},
}
</script>

<style lang="scss" scoped></style>
