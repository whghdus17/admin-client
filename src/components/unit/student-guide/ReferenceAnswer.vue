<template>
	<div class="d-flex justify-end">
		<div
			ref="studentLine"
			class="rounded-tl-xl rounded-b-xl grey lighten-3 px-4 py-5"
		>
			<p
				class="small-text primary--text font-weight-bold"
				style="margin-bottom: 2px"
			>
				예시 답변
			</p>
			<p class="grey-text">
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
	},
}
</script>

<style lang="scss">
.reference-answer-wrap {
	.dark-yellow {
		background-color: #e4a01b !important;
	}
	.reference-answer {
		font-family: Roboto;
		max-width: 350px;
		font-size: 14px;
	}
	.v-expansion-panels {
		border-radius: 15px;
	}
	.v-expansion-panel-header {
		font-size: 14px;
		border-radius: 15px;
	}

	.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile)
		> .v-expansion-panel--active {
		border-radius: 15px;
	}
	.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile)
		> .v-expansion-panel--active {
		min-height: unset;
		padding: 0px;
		border-radius: 15px;
	}
	.v-expansion-panel--active > .v-expansion-panel-header {
		min-height: unset;
	}
	// .v-expansion-panel-content__wrap {
	// 	padding: 0px;
	// }
}
</style>
