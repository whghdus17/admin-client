<template>
	<div>
		<div class="d-flex justify-end">
			<div
				ref="studentLine"
				class="rounded-tl-xl rounded-b-xl grey lighten-3 px-4 py-5"
				style="width: 274px"
			>
				<p
					class="small-text primary--text font-weight-bold"
					style="font-size: 12px"
				>
					✏️&nbsp; 영어로 써보세요
				</p>
				<p class="black-text">
					{{ content }}
				</p>
			</div>
		</div>
		<div
			v-if="translate === true && exampleAnswerComponentId === 5"
			class="d-flex justify-end"
			style="margin-top: 6px"
		>
			<div
				v-if="width > 0"
				:style="`width: ${width}px`"
				style="border-left: 1.5px solid #808080; box-sizing: border-box"
				class="pl-2 ml-3"
			>
				<p class="grey--text small-text">
					{{ exampleAnswer.content }}
					<AudioPlayer
						class="d-inline-block mr-1"
						:script="exampleAnswer.content"
						:small="true"
						:color="'primary--text'"
						:text="true"
					/>
				</p>
			</div>
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
		exampleAnswer: {
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
		exampleAnswerComponentId() {
			return this.exampleAnswer
				? this.exampleAnswer.program_guide_component_id
				: null
		},
	},
	mounted() {
		this.calculateWidth()
	},
	methods: {
		calculateWidth() {
			this.width = this.$refs.studentLine.clientWidth - 11
		},
	},
}
</script>
