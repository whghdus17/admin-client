<template>
	<div v-if="isLoading === false">
		<div class="d-flex align-center px-3">
			<v-btn
				icon
				fab
				class="mr-3"
				:disabled="!unit.beforeUnitId"
				@click="$router.push(`/unit/${unit.beforeUnitId}/guide`)"
			>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<UnitCard :language="language" :unit="unit" />
			<v-btn
				class="mr-3"
				large
				height="50"
				@click="language = language === 'ko' ? 'ja' : 'ko'"
				outlined
				><v-icon class="pr-1">mdi-swap-horizontal</v-icon
				>{{ language === 'ko' ? 'JA' : 'KO' }}</v-btn
			>
			<ExpressCard
				style="width: 65px; height: 50px"
				:language="language"
				:unitId="unit.id"
				@expressCardUploadCompleted="get"
			/>
			<v-btn
				icon
				fab
				class="ml-3"
				:disabled="!unit.afterUnitId"
				@click="$router.push(`/unit/${unit.afterUnitId}/guide`)"
			>
				<v-icon>mdi-chevron-right</v-icon>
			</v-btn>
		</div>
		<v-row class="px-3 pt-3 pb-15">
			<v-col cols="6" sm="7">
				<draggable
					v-model="guide[language]"
					v-bind="dragOptions"
					@start="isDragging = true"
					@end="endDrag"
				>
					<transition-group type="transition" name="flip-list">
						<ScriptCard
							v-for="(script, index) in guide[language]"
							:key="index"
							class="mb-3"
							:script="script"
							:isDragging="isDragging"
							@updateContent="updateContent"
							@updateComponent="updateComponent"
							@deleteScript="deleteScript"
						>
						</ScriptCard>
					</transition-group>
				</draggable>
			</v-col>
			<v-col cols="6" sm="5">
				<v-tabs-items v-model="tab">
					<v-tab-item>
						<TutorGuide :guide="guide[language]" />
					</v-tab-item>
					<v-tab-item>
						<StudentGuide :guide="guide[language]" />
					</v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>
		<v-bottom-navigation fixed>
			<v-btn text icon fab @click="get" :disabled="isSaving"
				><v-icon>mdi-refresh</v-icon></v-btn
			>
			<CopyGuide v-if="guide[language].length > 0" :guide="guide[language]" />
			<PasteGuide v-if="guide[language].length === 0" @paste="paste" />
			<AddScript @addScript="addScript" />
			<v-btn text @click="allDelete" :loading="isSaving"
				><span class="red--text">
					<v-icon>mdi-trash-can-outline</v-icon>
				</span></v-btn
			>
			<v-btn text @click="save" :loading="isSaving"
				><span class="primary--text">
					<v-icon>mdi-content-save</v-icon>
				</span></v-btn
			>
			<v-spacer></v-spacer>

			<v-radio-group v-model="tab" row>
				<v-radio label="Tutor" :value="0"></v-radio>
				<v-radio label="Student" :value="1"></v-radio>
			</v-radio-group>
		</v-bottom-navigation>
	</div>
</template>

<script>
import Api from '@/services/index'
import draggable from 'vuedraggable'
import UnitCard from '@/components/unit/UnitCard'
import TutorGuide from '@/components/unit/tutor-guide/Wrap'
import StudentGuide from '@/components/unit/student-guide/Wrap'
import ScriptCard from '@/components/unit/ScriptCard'
import AddScript from '@/components/unit/AddScript'
import ExpressCard from '@/components/program/ExpressCard'
import CopyGuide from '@/components/unit/CopyGuide'
import PasteGuide from '@/components/unit/PasteGuide'

export default {
	components: {
		UnitCard,
		TutorGuide,
		StudentGuide,
		ScriptCard,
		draggable,
		AddScript,
		ExpressCard,
		CopyGuide,
		PasteGuide,
	},
	data() {
		return {
			isLoading: false,
			isSaving: false,
			isDragging: false,
			unit: null,
			guide: {},
			tab: 0,
			language: 'ko',
		}
	},
	computed: {
		unitId() {
			return Number(this.$route.params.id)
		},
		dragOptions() {
			return {
				animation: 0,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			}
		},
		lastSequence() {
			return this.guide[this.language]
				.map(s => Number(s.sequence))
				.sort((a, b) => a - b)
				.slice(-1)[0]
		},
	},
	watch: {
		unitId() {
			this.get()
		},
		language() {
			this.get()
		},
	},
	beforeRouteEnter(to, from, next) {
		if (isNaN(Number(to.params.id)) === true) {
			alert('접근 경로가 잘못되었습니다.')
			next('/program')
		} else next()
	},
	created() {
		this.get()
	},
	methods: {
		async get() {
			this.isLoading = true
			const res = await Api.get(`/programs/units/${this.unitId}`)
			this.guide = JSON.parse(res.data.guide)
			this.unit = res.data
			this.sortGuide()

			this.isLoading = false
		},
		sortGuide() {
			this.guide[this.language] = this.guide[this.language].sort(
				(a, b) => a.sequence - b.sequence,
			)
		},
		endDrag() {
			this.isDragging = false
			this.renumberSequence()
		},
		renumberSequence() {
			let i = 1
			this.guide[this.language].forEach(s => {
				s.sequence = i
				i++
			})
		},
		updateContent(sequence, value) {
			this.guide[this.language].forEach(script => {
				if (script.sequence === sequence) script.content = value
			})
		},
		updateComponent(sequence, value) {
			this.guide[this.language].forEach(script => {
				if (script.sequence === sequence)
					script.program_guide_component_id = value
			})
		},
		deleteScript(sequence) {
			this.guide[this.language] = this.guide[this.language].filter(
				script => script.sequence !== sequence,
			)
			this.renumberSequence()
		},
		addScript(script) {
			const sequence = this.lastSequence ? this.lastSequence + 1 : 1
			this.guide[this.language].push({
				content: script.content,
				program_guide_component_id: script.component,
				sequence: sequence,
			})
			this.renumberSequence()
		},
		async save() {
			this.isSaving = true
			await Api.patch(`/programs/units/${this.unit.id}/guide`, {
				guide: this.guide,
			})

			this.isSaving = false
			this.get()
		},
		paste(guideString) {
			const guideFromJson = JSON.parse(guideString)
			let i = 1
			guideFromJson.forEach(s => {
				s.sequence = i
				i++
			})
			this.guide[this.language] = guideFromJson.slice()
		},
		allDelete() {
			let confirmDelete = confirm('정말로 모든 스크립트를 삭제하시겠습니까?')
			if (confirmDelete === false) return
			this.guide[this.language] = []
		},
	},
}
</script>

<style lang="scss" scoped></style>
