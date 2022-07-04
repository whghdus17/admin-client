<template>
	<v-container>
		<v-row no-gutters class="pa-3">
			<v-col cols="10" sm="6">
				<v-text-field
					v-model="nameLike"
					@click:append="setNameLike"
					@keydown.enter="setNameLike"
					append-icon="mdi-magnify"
					outlined
					dense
					hide-details
				></v-text-field>
			</v-col>
			<v-col cols="2" sm="2">
				<FilterDialog @setFilter="setFilter" />
			</v-col>
			<v-col cols="12" sm="4">
				<v-btn
					color="primary"
					depressed
					large
					block
					@click="$router.push({ name: 'ProgramAdd' })"
					>New Program</v-btn
				>
			</v-col>
		</v-row>
		<div v-if="isCountLoading === false">
			<v-data-table
				class="mb-5"
				:headers="headers"
				:items="programs"
				hide-default-footer
				style="min-height: 528px"
			>
				<template v-slot:body="{ items }">
					<tbody>
						<tr
							class="text-center"
							v-for="item in items"
							:key="item.id"
							@click="
								$router.push({ name: 'ProgramDetail', params: { id: item.id } })
							"
						>
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
					@input="
						$router
							.push({
								query: { ...$route.query, page },
							})
							.catch(() => {})
					"
					v-model="page"
					:length="pageCount"
				></v-pagination>
			</div>
		</div>
	</v-container>
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
			nameLike: null,
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
		pageInRoute() {
			return this.$route.query.page
		},
		filterInRoute() {
			return this.$route.query.filter
				? JSON.parse(this.$route.query.filter)
				: {}
		},
		query() {
			const filter = this.filterInRoute
			let query = `active=${filter.active}`
			if (filter.nameLike) query += `&name-like=${filter.nameLike}`
			if (filter.lessonType !== undefined)
				query += `&lesson-type=${filter.lessonType}`
			if (filter.listOfLevel && filter.listOfLevel.length > 0) {
				filter.listOfLevel.forEach(level => {
					query += `&program-level[]=${level}`
				})
			}
			if (filter.listOfTopic && filter.listOfTopic.length > 0) {
				filter.listOfTopic.forEach(topic => {
					query += `&topic[]=${topic}`
				})
			}
			if (filter.listOfStructure && filter.listOfStructure.length > 0) {
				filter.listOfStructure.forEach(structure => {
					query += `&structure[]=${structure}`
				})
			}
			return query
		},
	},
	watch: {
		filterInRoute(newVal, old) {
			let oldString = JSON.stringify(old)
			let newString = JSON.stringify(newVal)
			if (oldString !== newString) {
				this.getCounts()
			}
		},
		pageInRoute(newVal, old) {
			if (old !== newVal) {
				this.getPrograms()
			}
			if (newVal !== this.page.toString()) this.setPageFromQuery(newVal)
		},
	},
	created() {
		// 페이지를 누르면 쿼리에 반영된다.
		// 처음 열었을 때 필터나 페이지 조건이 없으면 필터와 페이지 조건을 쿼리에 넣는다.
		if (
			this.filterInRoute.active !== '0' &&
			this.filterInRoute.active !== '1'
		) {
			this.$router
				.replace({ query: { filter: JSON.stringify({ active: 1 }) } })
				.catch(() => {})
		}
		this.getCounts()
	},
	methods: {
		setPageFromQuery(newVal) {
			if (newVal === undefined) this.page = 1
			else this.page = Number(newVal)
		},
		async getCounts() {
			try {
				this.isCountLoading = true
				this.page = 1
				this.pageCount = 0
				const res = await Api.get(`/programs/count?${this.query}`)
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
				this.programs = []
				this.isLoading = true
				const res = await Api.get(
					`/programs/page/${this.page}?limit=${this.itemsPerPage}&${this.query}`,
				)

				this.programs = res.data
				this.isLoading = false
			} catch (err) {
				console.log(err)
			}
		},
		setNameLike() {
			const filter = { ...this.filterInRoute, nameLike: this.nameLike }
			this.$router
				.push({
					query: { filter: JSON.stringify(filter) },
				})
				.catch(() => {})
		},
		setFilter(filter) {
			filter = { ...filter, nameLike: this.nameLike }
			this.$router
				.push({
					query: { filter: JSON.stringify(filter) },
				})
				.catch(() => {})
		},
	},
}
</script>

<style lang="scss" scoped></style>
