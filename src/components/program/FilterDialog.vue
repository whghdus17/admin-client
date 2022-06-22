<template>
	<v-dialog persistent v-model="dialog" width="470">
		<template v-slot:activator="{ on, attrs }">
			<v-btn class="ml-1" icon text v-bind="attrs" v-on="on"
				><v-icon> mdi-tune </v-icon>
			</v-btn>
		</template>

		<v-card class="pa-5">
			<div class="text-h6 font-wieght-bold">Filter</div>
			<v-divider class="my-3"></v-divider>

			<div>
				<div class="mb-7">
					<h1 class="mb-1 text-body-1">Status</h1>
					<div class="">
						<div
							@click="active = 1"
							:class="{ 'primary white--text': active === 1 }"
							class="option mr-2"
						>
							active
						</div>
						<div
							@click="active = 0"
							:class="{ 'primary white--text': active === 0 }"
							class="option"
						>
							inactive
						</div>
					</div>
				</div>
				<div class="mb-7">
					<h1 class="mb-1 text-body-1">Type</h1>
					<div class="">
						<div
							@click="lessonType === 0 ? (lessonType = null) : (lessonType = 0)"
							:class="{ 'primary white--text': lessonType === 0 }"
							class="option mr-2"
						>
							talk
						</div>
						<div
							@click="lessonType === 1 ? (lessonType = null) : (lessonType = 1)"
							:class="{ 'primary white--text': lessonType === 1 }"
							class="option"
						>
							call
						</div>
					</div>
				</div>
				<div class="mb-7">
					<h1 class="mb-1 text-body-1">Level</h1>
					<div class="">
						<div
							v-for="level in ['3', '4', '5', '6', '7']"
							:key="level"
							class="option mr-2"
							:class="{ 'primary white--text': listOfLevel.includes(level) }"
							@click="
								listOfLevel.includes(level) === true
									? (listOfLevel = listOfLevel.filter(l => l !== level))
									: listOfLevel.push(level)
							"
						>
							level {{ level }}
						</div>
					</div>
				</div>
				<div class="mb-7">
					<h1 class="mb-1 text-body-1">Tag</h1>
					<div class="">
						<div
							class="option mr-2"
							v-for="topic in ['일상생활', '비즈니스', '시험대비', '시사토픽']"
							:key="topic"
							:class="{ 'primary white--text': listOfTopic.includes(topic) }"
							@click="
								listOfTopic.includes(topic) === true
									? (listOfTopic = listOfTopic.filter(t => t !== topic))
									: listOfTopic.push(topic)
							"
						>
							{{ topic }}
						</div>
						<div
							class="option mr-2"
							v-for="structure in [
								'패턴연습',
								'롤플레이',
								'표현작문',
								'대화토론',
							]"
							:key="structure"
							:class="{
								'primary white--text': listOfStructure.includes(structure),
							}"
							@click="
								listOfStructure.includes(structure) === true
									? (listOfStructure = listOfStructure.filter(
											s => s !== structure,
									  ))
									: listOfStructure.push(structure)
							"
						>
							{{ structure }}
						</div>
					</div>
				</div>
				<v-divider></v-divider>
			</div>

			<v-divider class="mb-3"></v-divider>

			<v-card-actions>
				<v-btn color="black" dark depressed @click="reset">reset</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="grey lighten-3" depressed @click="cancel">cancel</v-btn>
				<v-btn color="primary" depressed @click="save">save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		condition: {
			required: true,
			type: Object,
		},
	},
	data() {
		return {
			dialog: false,
			active: null,
			lessonType: null,
			listOfLevel: [],
			listOfTopic: [],
			listOfStructure: [],
		}
	},
	created() {
		this.setFromOrigin()
	},
	methods: {
		cancel() {
			this.setFromOrigin()
			this.dialog = false
		},
		setFromOrigin() {
			this.active = this.condition.active
			this.lessonType = this.condition.lessonType
			this.listOfLevel = this.condition.listOfLevel.slice()
			this.listOfTopic = this.condition.listOfTopic.slice()
			this.listOfStructure = this.condition.listOfStructure.slice()
		},
		reset() {
			this.active = 1
			this.lessonType = null
			this.listOfLevel = []
			this.listOfTopic = []
			this.listOfStructure = []
		},
		save() {
			this.$emit('setCondition', {
				active: this.active,
				lessonType: this.lessonType,
				listOfLevel: this.listOfLevel,
				listOfTopic: this.listOfTopic,
				listOfStructure: this.listOfStructure,
			})
			this.dialog = false
		},
	},
}
</script>

<style lang="scss" scoped>
.option {
	margin: 5px;
	display: inline-block;
	padding: 5px 18px;
	border-radius: 17px;
	background-color: #ececec;
}
.option:hover {
	cursor: pointer;
}
</style>
