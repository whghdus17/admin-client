<template>
	<!-- <v-card
		class="pa-3 mb-5"
		outlined
		@click="$router.push({ name: 'UnitGuide', params: { id: unit.id } })"
		style="overflow: visible"
	>
		<h2 class="text-body-1 font-weight-bold">
			Unit {{ unit.unit }}(#{{ unit.id }})
		</h2>
		<v-row class="text-body-1" no-gutters>
			<v-col cols="3"> Title </v-col>
			<v-col cols="9"> {{ unitTitle[language] }} </v-col>
			<v-col cols="3"> Expression </v-col>
			<v-col cols="9"> {{ unit.numberOfTargetExpressions }} </v-col>
			<v-col cols="3"> Objective </v-col>
			<v-col cols="9"> {{ learningObjective[language] }} </v-col>
			<v-col cols="3"> Objective En </v-col>
			<v-col cols="9"> {{ learningObjective['en'] }} </v-col>
		</v-row>
	</v-card> -->
	<v-card class="pa-3 ma-3" width="100%">
		<h2 class="text-body-1">
			<span style="display: inline-block; width: 60px"
				>#{{ unit.programId }}</span
			>
			{{ unit.programName }} ({{ unit.programNameEn }})
		</h2>
		<h1 class="text-body-1 font-weight-bold">
			<span style="display: inline-block; width: 60px">#{{ unit.id }}</span>
			UNIT {{ unit.unit }} : {{ unitTitle[language] }}
		</h1>
	</v-card>
</template>

<script>
export default {
	props: {
		language: {
			required: true,
			type: String,
		},
		unit: {
			required: true,
			type: Object,
		},
	},
	computed: {
		unitTitle() {
			return JSON.parse(this.unit.unitTitle)
		},
		learningObjective() {
			return JSON.parse(this.unit.learningObjective)
		},
	},
}
</script>

<style lang="scss" scoped></style>
