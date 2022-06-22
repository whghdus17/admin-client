<template>
	<div>
		<v-row no-gutters class="pa-3">
			<v-col cols="10" sm="6">
				<v-text-field
					v-model="condition.name"
					append-icon="mdi-magnify"
					@click:append="getCounts"
					@keydown.enter="getCounts"
					outlined
					dense
					hide-details
				></v-text-field>
			</v-col>
			<v-col cols="2" sm="2">
				<FilterDialog :condition="condition" @setCondition="setCondition" />
			</v-col>
			<v-col cols="12" sm="4">
				<v-btn color="primary" depressed large block>New Program</v-btn>
			</v-col>
		</v-row>
		<div v-if="isCountLoading === false">
			<v-data-table
				class="mb-5"
				:headers="headers"
				:items="programs"
				hide-default-footer
			>
				<template v-slot:body="{ items }">
					<tbody>
						<tr class="text-center" v-for="item in items" :key="item.id">
							<td>{{ item.id }}</td>
							<td class="text-left">
								<p class="text-body-2 mb-0">{{ item.name }}</p>
								<p class="text-caption mb-0">{{ item.name_en }}</p>
							</td>
							<td>
								{{ item.program_level }}
							</td>
							<td class="font-weight-bold">
								{{ item.program_ja_id ? 'KO|JA' : 'KO' }}
							</td>
							<td>
								<span
									class="font-weight-bold"
									:class="{
										'talk--text': item.lesson_type === 0,
										'call--text': item.lesson_type === 1,
									}"
								>
									{{ item.lesson_type === 0 ? '톡' : '콜' }}
								</span>
							</td>
							<td>
								{{ item.active === 0 ? 'inactive' : 'active' }}
							</td>
						</tr>
					</tbody>
				</template>
			</v-data-table>
			<div class="text-center pt-2">
				<v-pagination
					v-model="page"
					@input="getPrograms"
					:length="pageCount"
				></v-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Api from '@/services/index'
import FilterDialog from '@/components/program/FilterDialog'

export default {
	components: {
		FilterDialog,
	},
	data() {
		return {
			isCountLoading: false,
			isLoading: false,
			pageCount: 0,
			itemsPerPage: 10,
			page: 1,
			condition: {
				active: 1,
				name: null,
				lessonType: null,
				listOfLevel: [],
				listOfTopic: [],
				listOfStructure: [],
			},
			headers: [
				{
					text: 'Id',
					align: 'center',
					sortable: false,
					value: 'id',
					class: 'text-body-2 font-weight-bold black--text',
				},
				{
					text: 'name',
					align: 'left',
					sortable: false,
					value: 'name',
					class: 'text-body-2 font-weight-bold black--text',
				},
				{
					text: 'level',
					align: 'center',
					sortable: false,
					value: 'program_level',
					class: 'text-body-2 font-weight-bold black--text',
				},
				{
					text: 'language',
					align: 'center',
					sortable: false,
					value: 'language',
					class: 'text-body-2 font-weight-bold black--text',
				},
				{
					text: 'type',
					align: 'center',
					sortable: false,
					value: 'lesson_type',
					class: 'text-body-2 font-weight-bold black--text',
				},
				{
					text: 'status',
					align: 'center',
					sortable: false,
					value: 'active',
					class: 'text-body-2 font-weight-bold black--text',
				},
			],
			programs: [],
		}
	},
	computed: {
		getQuery() {
			const condition = this.condition
			let query = `active=${condition.active}`
			if (condition.name) query += `&name-like=${condition.name}`
			if (condition.listOfLevel && condition.listOfLevel.length > 0) {
				condition.listOfLevel.forEach(level => {
					query += `&program-level[]=${level}`
				})
			}
			if (condition.listOfTopic && condition.listOfTopic.length > 0) {
				condition.listOfTopic.forEach(topic => {
					query += `&topic[]=${topic}`
				})
			}
			if (condition.listOfStructure && condition.listOfStructure.length > 0) {
				condition.listOfStructure.forEach(structure => {
					query += `&structure[]=${structure}`
				})
			}

			return query
		},
	},
	created() {
		this.getCounts()
	},
	methods: {
		async getCounts() {
			try {
				this.isCountLoading = true
				this.page = 1
				this.pageCount = 0
				const res = await Api.get(`/programs/count?${this.getQuery}`)
				const totalCount = res.data
				this.pageCount = Math.ceil(totalCount / this.itemsPerPage)
				this.isCountLoading = false
				this.getPrograms()
			} catch (err) {
				console.log(err)
			}
		},
		async getPrograms() {
			try {
				this.isLoading = true
				const res = await Api.get(
					`/programs/${this.page}?limit=${this.itemsPerPage}&${this.getQuery}`,
				)
				this.programs = res.data
				this.isLoading = false
			} catch (err) {
				console.log(err)
			}
		},
		setCondition(condition) {
			this.condition = { ...condition, name: this.condition.name }
			this.page = 1
			this.getCounts()
		},
	},
}
</script>

<style lang="scss" scoped></style>
