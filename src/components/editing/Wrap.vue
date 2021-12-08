<template>
	<v-container fluid class="pb-12">
		<v-row>
			<v-col cols="3">
				<v-menu
					v-model="dateMenu"
					:close-on-content-click="false"
					:nudge-right="40"
					transition="scale-transition"
					offset-y
					min-width="auto"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							outlined
							dense
							v-model="date"
							label="Picker without buttons"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
							append-icon="mdi-window-close"
							@click:append="date = null"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="date"
						@input="dateMenu = false"
					></v-date-picker>
				</v-menu>
			</v-col>
			<v-col cols="3"> <TutorPicker @selectTutor="selectTutor" /></v-col>
			<v-col cols="3">
				<v-text-field
					outlined
					dense
					v-model="lessonId"
					label="Lesson Id"
					type="number"
				></v-text-field>
			</v-col>
			<v-col cols="3">
				<v-select
					dense
					outlined
					:items="['edited', 'created', 'cancelled', 'matching']"
					v-model="status"
					append-icon="mdi-window-close"
					@click:append="status = null"
				></v-select>
			</v-col>
		</v-row>
		<div class="text-right">
			<v-btn
				@click="searchEditings"
				:disabled="isValid === false"
				depressed
				:loading="isLoading"
				color="primary"
			>
				Search
			</v-btn>
			<div class="mt-1 text-body-2 grey--text text--darken-1 font-italic">
				💡 Select a lesson id or select a date and tutor.
			</div>
		</div>
		<Table
			:editings="editings"
			@selectEditings="selectEditings"
			v-if="editings.length > 0"
		/>
		<v-scroll-y-reverse-transition>
			<Selected
				style="
					position: fixed;
					bottom: 0;
					left: 0;
					width: 100%;
					background-color: #fff;
				"
				class="elevation-3"
				:selected="selected"
				v-if="selected.length > 0"
			/>
		</v-scroll-y-reverse-transition>
	</v-container>
</template>

<script>
import Selected from './Selected'
import Table from './Table'
import TutorPicker from '@/components/common/TutorPicker'
import Api from '@/services/index'

export default {
	components: {
		TutorPicker,
		Table,
		Selected,
	},
	data() {
		return {
			selected: [],
			isLoading: false,
			dateMenu: false,
			date: null,
			tutor: null,
			lessonId: null,
			status: null,
			editings: [],
		}
	},
	computed: {
		isValid() {
			let isValid = false
			if (this.date !== null && this.tutor !== null) isValid = true
			if (this.lessonId !== null) isValid = true
			return isValid
		},
		searchQuery() {
			let query = ''
			const gteDate = `${this.date} 00:00:00`
			const lteDate = `${this.date} 23:59:59`
			if (this.lessonId) query += `&lesson-id=${this.lessonId}`
			if (this.date)
				query += `&gte-created-at=${gteDate}&lte-created-at=${lteDate}`
			if (this.tutor) query += `&editing-tutor-id=${this.tutor.id}`
			if (this.status) query += `&status=${this.status}`
			query = '?' + query.substr(1)
			return query
		},
	},
	methods: {
		selectTutor(tutorObj) {
			this.tutor = tutorObj
		},
		async searchEditings() {
			try {
				this.isLoading = true
				this.selected = []
				this.editings = []
				const res = await Api.get(`/editings${this.searchQuery}`)
				this.editings = res.data
			} catch (err) {
				alert(err.response.status)
			} finally {
				this.isLoading = false
			}
		},
		selectEditings(val) {
			this.selected = val
		},
	},
}
</script>

<style lang="scss" scoped></style>
