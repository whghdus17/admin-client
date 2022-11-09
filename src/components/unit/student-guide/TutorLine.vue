<template>
	<div>
		<div
			ref="tutorLine"
			class="rounded-b-xl rounded-tr-xl tutor-line"
			style="border: 1px solid #dadada; width: 274px"
		>
			<p>
				<span v-html="content"></span>
				<AudioPlayer
					class="d-inline-block mr-1"
					:script="content"
					:small="true"
					:color="'primary--text'"
					:text="true"
				/>
			</p>
		</div>
		<div
			v-if="width > 0 && translate === true && translationComponentId === 7"
			:style="`width: ${width}px`"
			style="
				border-left: 1.5px solid #808080;
				box-sizing: border-box;
				margin-top: 6px;
			"
			class="pl-2 ml-3"
		>
			<p class="grey--text small-text">
				{{ tutorTranslation.content }}
			</p>
		</div>
	</div>
</template>

<script>
import AudioPlayer from './AudioPlayer'

export default {
	components: {
		AudioPlayer,
	},
	props: {
		content: {
			required: true,
			type: String,
		},
		tutorTranslation: {
			required: true,
		},
		translate: {
			required: true,
			type: Boolean,
		},
	},
	data: () => ({
		width: 0,
	}),
	computed: {
		translationComponentId() {
			return this.tutorTranslation
				? this.tutorTranslation.program_guide_component_id
				: null
		},
	},
	mounted() {
		this.calculateWidth()
	},
	methods: {
		calculateWidth() {
			this.width = this.$refs.tutorLine.clientWidth - 11
		},
	},
}
</script>

<style scoped>
.tutor-line {
	padding: 17px 21px;
}
</style>
