<template>
	<v-container v-if="isLoading === false">
		<v-card class="pa-3 mb-5">
			<h1 class="text-body-1">
				<span style="display: inline-block; width: 60px"
					>#{{ program.id }}</span
				>
				{{ program.name }} ({{ program.nameEn }})
			</h1>
		</v-card>
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
					type="number"
				></v-text-field>
			</v-col>
			<v-col cols="6"
				><v-text-field
					label="Number Of Target Expressions"
					v-model="numberOfTargetExpressions"
					outlined
					dense
					:disabled="isSaving"
					type="number"
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
			<v-btn depressed class="mr-3" :href="`/program/${programId}`"
				>Cancel</v-btn
			>
			<v-btn color="primary" depressed @click="add">ADD</v-btn>
		</div>
	</v-container>
</template>

<script>
import Api from '@/services/index'

export default {
	data() {
		return {
			isLoading: false,
			isSaving: false,
			program: null,
			units: [],
			titleKo: null,
			titleJa: null,
			titleEn: null,
			unitNo: null,
			numberOfTargetExpressions: null,
			objectiveKo: null,
			objectiveJa: null,
			objectiveEn: null,
		}
	},
	computed: {
		programId() {
			return Number(this.$route.query['program-id'])
		},
		params() {
			return {
				programId: this.programId,
				unitTitle: {
					ko: this.titleKo,
					en: this.titleEn,
					ja: this.titleJa,
				},
				unit: this.unitNo,
				numberOfTargetExpressions: this.numberOfTargetExpressions,
				learningObjective: {
					ko: this.objectiveKo,
					en: this.objectiveEn,
					ja: this.objectiveJa,
				},
			}
		},
	},
	beforeRouteEnter(to, from, next) {
		if (isNaN(Number(to.query['program-id'])) === true) {
			alert('접근 경로가 잘못되었습니다.')
			next('/program')
		} else next()
	},
	created() {
		this.getProgram()
	},
	methods: {
		async getProgram() {
			try {
				this.isLoading = true
				const res = await Api.get(`/programs/${this.programId}?language=ko`)
				if (!res.data.program) throw new Error('no program')
				this.program = res.data.program
				this.units = res.data.units.slice().sort((a, b) => a.unit - b.unit)

				this.isLoading = false
			} catch (err) {
				let msg = 'Error'
				if (err.message && err.message === 'no program') msg = 'No Program'

				alert(msg)
				this.$router.push({ name: 'Program' })
			}
		},
		async add() {
			this.isLoading = true
			await Api.post(`/programs/units`, this.params)
			alert('유닛이 생성되었습니다.')
			this.isLoading = false
			this.$router.push(`/program/${this.programId}`)
		},
	},
}
</script>

<style lang="scss" scoped></style>
