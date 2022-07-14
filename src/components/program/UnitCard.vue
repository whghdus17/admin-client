<template>
	<v-card
		class="pa-3 mb-5"
		outlined
		@click="$router.push({ name: 'UnitGuide', params: { id: unit.id } })"
		style="overflow: visible"
	>
		<h2 class="text-body-1 font-weight-bold">
			Unit {{ unit.unit }}(#{{ unit.id }})
		</h2>
		<v-row no-gutters align="center">
			<v-col cols="10">
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
			</v-col>
			<v-col cols="2">
				<div class="d-flex align-center justify-end">
					<ExpressCard
						class="mr-3"
						style="width: 50px; height: 50px"
						:language="language"
						:unitId="unit.id"
						@expressCardUploadCompleted="$emit('expressCardUploadCompleted')"
					/>
					<v-btn
						@click.stop="
							$router.push({
								name: 'UnitEdit',
								params: { id: unit.id },
							})
						"
						icon
						fab
						><v-icon>mdi-pencil</v-icon></v-btn
					>
				</div>
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
