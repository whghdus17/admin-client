<template>
	<div>
		<v-breadcrumbs
			:items="[
				{
					text: 'Home',
					disabled: false,
					href: '/',
				},
				{
					text: 'Programs',
					disabled: false,
					href: '/program',
				},
				{
					text: 'Program Detail',
					disabled: true,
					href: '/program',
				},
			]"
			large
		></v-breadcrumbs>
		<section class="px-5" style="min-width: 900px">
			<LanguageTabSelector
				@selectLanguage="selectLanguage"
				:originLanguage="$route.query.language"
			/>
			<v-row v-if="isLoading === false">
				<v-col cols="12" sm="5" md="4">
					<div v-if="language === 'ja' && !program.name" class="pt-5">
						<v-alert prominent type="error">
							일본어 프로그램이 생성되지 않은 것 같습니다. 아래의 Edit 버튼으로
							일본어 프로그램을 생성하실 수 있습니다.
						</v-alert>
					</div>
					<div class="pa-5 grey lighten-4" v-if="program">
						<ProgramInfo :program="program" />
						<div class="text-right">
							<v-btn
								@click="
									$router.push({
										name: 'ProgramEdit',
										params: { id: program.id, language },
									})
								"
								large
								depressed
								color="primary"
								>Edit</v-btn
							>
						</div>
					</div>
				</v-col>
				<v-col cols="12" sm="7" md="8">
					<div
						class="py-5 px-3 grey lighten-4"
						style="max-height: 900px; overflow-y: auto"
					>
						<div v-if="units.length > 0">
							<div class="mb-5 d-flex align-center">
								<h1 class="text-body-1 font-weight-bold">
									TOTAL : {{ units.length }} UNITS
								</h1>
								<v-spacer></v-spacer>
								<v-btn depressed large color="white">Add</v-btn>
							</div>
							<UnitList :units="units" />
						</div>
						<div v-else>생성된 유닛이 없습니다.</div>
					</div>
				</v-col>
			</v-row>
		</section>
	</div>
</template>

<script>
import Api from '@/services/index'
import LanguageTabSelector from '@/components/program/LanguageTabSelector'
import ProgramInfo from '@/components/program/ProgramInfo'
import UnitList from '@/components/program/UnitList'

export default {
	components: {
		LanguageTabSelector,
		ProgramInfo,
		UnitList,
	},
	data() {
		return {
			isLoading: true,
			language: null,
			program: null,
			units: [],
		}
	},
	computed: {
		id() {
			return Number(this.$route.params.id)
		},
	},
	beforeRouteEnter(to, from, next) {
		if (isNaN(Number(to.params.id)) === true) {
			alert('접근 경로가 잘못되었습니다.')
			next('/program')
		} else next()
	},
	methods: {
		selectLanguage(lang) {
			this.language = lang
			this.$router
				.replace({ query: { ...this.$route.query, language: lang } })
				.catch(() => {})
			this.getProgram()
		},
		async getProgram() {
			try {
				this.isLoading = true
				const res = await Api.get(
					`/programs/${this.id}?language=${this.language}`,
				)
				if (!res.data.program) throw new Error('no program')
				this.program = res.data.program
				this.units = res.data.units.slice()
				this.isLoading = false
			} catch (err) {
				let msg = 'Error'
				if (err.message && err.message === 'no program') msg = 'No Program'

				alert(msg)
				this.$router.push({ name: 'Program' })
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
