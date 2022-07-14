<template>
	<div class="pa-5" v-if="isLoading === false">
		<v-breadcrumbs
			class="mb-5"
			:items="[
				{
					text: 'Home',
					disabled: false,
					href: '/',
				},
				{
					text: 'Programs',
					disabled: false,
					href: '/program',
				},
				{
					text: 'Program Detail',
					disabled: false,
					href: `/program/${unit.programId}`,
				},
				{
					text: 'Unit Edit',
					disabled: true,
					href: '/program',
				},
			]"
			large
		></v-breadcrumbs>
		<v-container v-if="isLoading === false">
			<v-text-field
				label="Title Ko"
				v-model="titleKo"
				outlined
				dense
				:disabled="isSaving"
			></v-text-field>
			<v-text-field
				label="Title En"
				v-model="titleEn"
				outlined
				dense
				:disabled="isSaving"
			></v-text-field>
			<v-text-field
				label="Title Ja"
				v-model="titleJa"
				outlined
				dense
				:disabled="isSaving"
			></v-text-field>
			<v-row>
				<v-col cols="6">
					<v-text-field
						label="Unit No"
						v-model="unitNo"
						outlined
						dense
						:disabled="isSaving"
					></v-text-field>
				</v-col>
				<v-col cols="6"
					><v-text-field
						label="Number Of Target Expressions"
						v-model="numberOfTargetExpressions"
						outlined
						dense
						:disabled="isSaving"
					></v-text-field
				></v-col>
			</v-row>

			<v-text-field
				label="Objective Ko"
				v-model="objectiveKo"
				outlined
				dense
				:disabled="isSaving"
			></v-text-field>
			<v-text-field
				label="Objective En"
				v-model="objectiveEn"
				outlined
				dense
				:disabled="isSaving"
			></v-text-field>
			<v-text-field
				label="Objective Ja"
				v-model="objectiveJa"
				outlined
				dense
				:disabled="isSaving"
			></v-text-field>
			<div class="text-right">
				<v-btn depressed class="mr-3" :href="`/program/${unit.programId}`"
					>Cancel</v-btn
				>
				<v-btn color="primary" depressed @click="save">Save</v-btn>
			</div>
		</v-container>
	</div>
</template>

<script>
import Api from '@/services/index'

export default {
	data() {
		return {
			isLoading: false,
			isSaving: false,
			unit: null,
			// ======
			titleKo: null,
			titleEn: null,
			titleJa: null,
			unitNo: null,
			numberOfTargetExpressions: null,
			objectiveKo: null,
			objectiveEn: null,
			objectiveJa: null,
		}
	},
	computed: {
		unitId() {
			return Number(this.$route.params.id)
		},
		params() {
			return {
				unitTitle: {
					ko: this.titleKo,
					en: this.titleEn,
					ja: this.titleJa,
				},
				numberOfTargetExpressions: this.numberOfTargetExpressions,
				learningObjective: {
					ko: this.objectiveKo,
					en: this.objectiveEn,
					ja: this.objectiveJa,
				},
			}
		},
	},
	created() {
		this.get()
	},
	methods: {
		async get() {
			this.isLoading = true
			const res = await Api.get(`/programs/units/${this.unitId}`)
			this.unit = res.data
			const title = JSON.parse(this.unit.unitTitle)
			this.titleKo = title['ko']
			this.titleJa = title['ja']
			this.titleEn = title['en']

			const objective = JSON.parse(this.unit.learningObjective)
			this.objectiveKo = objective['ko']
			this.objectiveEn = objective['ja']
			this.objectiveJa = objective['en']

			this.unitNo = this.unit.unit
			this.numberOfTargetExpressions = this.unit.numberOfTargetExpressions

			this.isLoading = false
		},
		async save() {
			this.isSaving = true
			await Api.patch(`/programs/units/${this.unit.id}`, this.params)

			this.isSaving = false

			alert('저장되었습니다.')
			this.$router.push(`/program/${this.unit.programId}`)
		},
	},
}
</script>

<style lang="scss" scoped></style>
