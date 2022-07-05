<template>
	<v-card
		class="pa-3 mb-5"
		outlined
		@click="$router.push({ name: 'UnitEdit', params: { id: unit.id } })"
		style="overflow: visible"
	>
		<h2 class="text-body-1 font-weight-bold">
			Unit {{ unit.unit }}(#{{ unit.id }})
		</h2>
		<v-row no-gutters>
			<v-col cols="9">
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
			</v-col>
			<v-col cols="3">
				<ExpressCard
					:language="language"
					:unitId="unit.id"
					@expressCardUploadCompleted="$emit('expressCardUploadCompleted')"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import ExpressCard from './ExpressCard.vue'
export default {
	components: {
		ExpressCard,
	},
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
}
</script>

<style lang="scss" scoped></style>
