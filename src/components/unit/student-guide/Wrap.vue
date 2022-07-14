<template>
	<div id="guide-wrap" style="position: relative">
		<TranslateButton
			style="position: fixed; bottom: 50px; right: 10px; z-index: 5"
			@clickTranslateBtn="translate = !translate"
			:translate="translate"
		/>
		<v-card flat outlined v-for="(script, i) in guide" :key="i" class="mb-3">
			<div class="grey lighten-3 px-3 py-1">
				<div class=""># {{ script.sequence }}</div>
			</div>
			<div class="pa-3">
				<ImageContent
					:content="script.content"
					v-if="script.program_guide_component_id === 14"
				/>
				<Instruction
					:content="script.content"
					v-else-if="script.program_guide_component_id === 2"
				/>
				<Setting
					:content="script.content"
					v-else-if="script.program_guide_component_id === 11"
				/>
				<TutorLine
					:translate="translate"
					:content="script.content"
					:tutorTranslation="guide[i + 1] || null"
					v-else-if="script.program_guide_component_id === 6"
				/>
				<TutorQuestion
					:translate="translate"
					:content="script.content"
					:tutorTranslation="guide[i + 1] || null"
					v-else-if="script.program_guide_component_id === 12"
				/>
				<!-- <TutorTranslation
				:content="script.content"
				v-else-if="script.program_guide_component_id === 7"
			/> -->
				<TargetExpression
					:content="script.content"
					v-else-if="script.program_guide_component_id === 3"
				/>
				<StudentLine
					:translate="translate"
					:content="script.content"
					:exampleAnswer="guide[i + 1] || null"
					v-else-if="script.program_guide_component_id === 4"
				/>
				<!-- <ExampleAnswer
				:content="script.content"
				v-else-if="script.program_guide_component_id === 5"
			/> -->
				<ReferenceAnswer
					:content="script.content"
					v-else-if="script.program_guide_component_id === 13"
				/>
			</div>
		</v-card>
	</div>
</template>

<script>
/**
 * image 14
 * instruction 2
 * setting 11
 * tutor-line 17
 * tutor-question 12
 * tutor-translation 7
 * target-expression 3
 * student-line 4
 * example-answer 5
 * reference-answer 15
 * 14, 2, 11, 17, 12, 7, 3, 4, 5, 15
 */

import TranslateButton from './TranslateButton'
import ImageContent from './Image'
import Instruction from './Instruction'
import Setting from './Setting'
import TutorLine from './TutorLine'
import TutorQuestion from './TutorQuestion'
// import TutorTranslation from './TutorTranslation'
import TargetExpression from './TargetExpression'
import StudentLine from './StudentLine'
// import ExampleAnswer from './ExampleAnswer'
import ReferenceAnswer from './ReferenceAnswer'

export default {
	components: {
		TranslateButton,
		ImageContent,
		Instruction,
		Setting,
		TutorLine,
		TutorQuestion,
		// TutorTranslation,
		TargetExpression,
		StudentLine,
		// ExampleAnswer,
		ReferenceAnswer,
	},
	props: {
		guide: {
			required: true,
			type: Array,
		},
	},
	data() {
		return {
			translate: false,
		}
	},
}
</script>

<style>
#guide-wrap p {
	font-size: 14px !important;
	line-height: 22px !important;
}

#guide-wrap .black-text {
	color: #1a1a1a !important;
}
#guide-wrap .grey-text {
	color: #808080 !important;
}
#guide-wrap .small-text,
#guide-wrap p.small-text {
	font-size: 12px !important;
	line-height: 18px !important;
}
</style>
