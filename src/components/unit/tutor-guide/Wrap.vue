<template>
	<!-- <draggable
		v-model="guide"
		group="people"
		@start="drag = true"
		@end="drag = false"
	>
		<transition-group type="transition" name="flip-list"> -->
	<div>
		<v-card
			v-for="(script, index) in guide"
			:key="index"
			class="mb-3"
			flat
			outlined
		>
			<div class="grey lighten-3 px-3 py-1">
				<div class=""># {{ script.sequence }}</div>
			</div>
			<div class="pa-3">
				<UnitGuideline
					v-if="script.program_guide_component_id === 1"
					:script="script"
				/>
				<Instruction
					v-if="script.program_guide_component_id === 2"
					:script="script"
				/>
				<TargetExpression
					v-if="script.program_guide_component_id === 3"
					:script="script"
				/>
				<StudentLine
					v-if="script.program_guide_component_id === 4"
					:script="script"
				/>
				<ExampleAnswer
					v-if="script.program_guide_component_id === 5"
					:script="script"
				/>
				<TutorLine
					v-if="script.program_guide_component_id === 6"
					:script="script"
				/>
				<Hint v-if="script.program_guide_component_id === 8" :script="script" />
				<HiddenInstruction
					v-if="script.program_guide_component_id === 9"
					:script="script"
				/>
				<TutorHiddenQuestion
					v-if="script.program_guide_component_id === 10"
					:script="script"
				/>
				<Setting
					v-if="script.program_guide_component_id === 11"
					:script="script"
				/>
				<TutorQuestion
					v-if="script.program_guide_component_id === 12"
					:script="script"
				/>
				<ReferenceAnswer
					v-if="script.program_guide_component_id === 13"
					:script="script"
				/>
				<ImageComponent
					v-if="script.program_guide_component_id === 14"
					:script="script"
				/>
			</div>
		</v-card>
	</div>
	<!-- </transition-group>
	</draggable> -->
</template>

<script>
import UnitGuideline from './UnitGuideline'
import Instruction from './Instruction'
import TargetExpression from './TargetExpression'
import Setting from './Setting'
import StudentLine from './StudentLine'
import ExampleAnswer from './ExampleAnswer'
import TutorLine from './TutorLine'
import Hint from './Hint'
import HiddenInstruction from './HiddenInstruction'
import TutorQuestion from './TutorQuestion'
import TutorHiddenQuestion from './TutorHiddenQuestion'
import ReferenceAnswer from './ReferenceAnswer'
import ImageComponent from './Image'

export default {
	name: 'GuideEditWrap',
	components: {
		UnitGuideline,
		Instruction,
		Setting,
		TargetExpression,
		StudentLine,
		ExampleAnswer,
		TutorLine,
		HiddenInstruction,
		Hint,
		TutorHiddenQuestion,
		TutorQuestion,
		ReferenceAnswer,
		ImageComponent,
	},
	props: {
		guide: {
			required: true,
			type: Array,
		},
	},
	data() {
		return {
			drag: false,
		}
	},
}
</script>

<style lang="scss" scoped></style>
