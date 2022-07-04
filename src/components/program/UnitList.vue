<template>
	<div>
		<div v-for="unit in units" :key="unit.id">
			<v-card class="pa-3 mb-5" outlined>
				<h2 class="text-body-1 font-weight-bold">
					Unit {{ unit.unit }}(#{{ unit.id }})
				</h2>
				<v-row class="text-body-1" no-gutters>
					<v-col cols="3"> Title </v-col>
					<v-col cols="9"> {{ unit.title }} </v-col>
					<v-col cols="3"> Expression </v-col>
					<v-col cols="9"> {{ unit.numberOfTargetExpressions }} </v-col>
					<v-col cols="3"> Objective </v-col>
					<v-col cols="9"> {{ unit.learningObjectiveKr }} </v-col>
					<v-col cols="3"> Objective En </v-col>
					<v-col cols="9"> {{ unit.learningObjectiveEn }} </v-col>
				</v-row>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		units: {
			required: true,
			type: Array,
		},
	},
}
</script>

<style lang="scss" scoped></style>
