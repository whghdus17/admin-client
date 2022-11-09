<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn text v-bind="attrs" v-on="on"
				><span class="green--text">
					<v-icon>mdi-plus</v-icon>
				</span></v-btn
			>
		</template>

		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> Add Script </v-card-title>

			<v-card-text class="py-5">
				<v-select
					class="mb-5"
					style="max-width: 225px"
					:items="guideComponents"
					v-model="component"
					dense
					outlined
					hide-details
					background-color="white"
				>
				</v-select>

				<v-tabs v-model="tab">
					<v-tab> Text </v-tab>
					<v-tab> Editor </v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab" class="mb-3">
					<v-tab-item>
						<v-card flat>
							<v-textarea outlined hide-details v-model="content"></v-textarea>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<v-card flat min-height="150">
							<Editor
								:value="content"
								@input="input"
								style="border: 1px solid #dadada"
							/>
						</v-card>
					</v-tab-item>
				</v-tabs-items>

				<div class="pa-3 blue-grey darken-3 white--text">
					<span class="grey--text">[실제 데이터]</span><br />
					{{ content }}
				</div>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="cancel"> Cancel </v-btn>
				<v-btn color="primary" text @click="add"> Add </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import Editor from '@/components/common/Editor'

export default {
	components: {
		Editor,
	},
	data() {
		return {
			dialog: false,
			component: 1,
			content: null,
			tab: null,
			guideComponents: [
				{ value: 1, text: 'unit-guideline' },
				{ value: 2, text: 'instruction' },
				{ value: 3, text: 'target-expression' },
				{ value: 4, text: 'student-line' },
				{ value: 5, text: 'example-answer' },
				{ value: 6, text: 'tutor-line' },
				{ value: 7, text: 'tutor-translation' },
				{ value: 8, text: 'hint' },
				{ value: 9, text: 'hidden-instruction' },
				{ value: 10, text: 'tutor-hidden-question' },
				{ value: 11, text: 'setting' },
				{ value: 12, text: 'tutor-question' },
				{ value: 13, text: 'reference-answer' },
				{ value: 14, text: 'image' },
			],
		}
	},
	methods: {
		input(val) {
			this.content = val
		},
		cancel() {
			this.dialog = false
			this.component = 1
			this.content = null
		},
		add() {
			this.$emit('addScript', {
				component: this.component,
				content: this.content,
				scriptType: this.tab === 0 ? 'text' : 'html',
			})
			this.dialog = false
			this.component = 1
			this.content = null
		},
	},
}
</script>

<style lang="scss" scoped></style>
