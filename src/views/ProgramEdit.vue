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
					text: 'Program Add',
					disabled: true,
					href: '/program/add',
				},
			]"
			large
		></v-breadcrumbs>
		<v-container v-if="isLoading === false" style="min-width: 900px">
			<v-form ref="form" v-model="valid">
				<v-row class="py-5">
					<v-col cols="6">
						<v-text-field
							v-model="name"
							:rules="nameRules"
							hint="학생이 보는 프로그램명입니다. 한국어 또는 일본어로 입력해주세요."
							label="Program Name(*)"
							outlined
							required
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							v-model="nameEn"
							:rules="nameEnRules"
							:disabled="language === 'ja'"
							label="Program Name En(*)"
							outlined
							hint="튜터가 보는 프로그램명입니다. 영어로 입력해주세요."
							required
						></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-text-field
							v-model="programLevel"
							:rules="requiredRules"
							:disabled="language === 'ja'"
							hint="프로그램 레벨을 '3' 혹은 '3|4' 형태로 입력해주세요."
							label="Program Level(*)"
							outlined
							required
						></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-select
							v-model="lessonType"
							:disabled="language === 'ja'"
							outlined
							label="Lesson Type(*)"
							:items="[
								{ value: 0, text: '25Min Talk' },
								{ value: 1, text: '15Min Call' },
							]"
							required
						></v-select>
					</v-col>
					<v-col cols="3">
						<v-select
							outlined
							label="Status(*)"
							:disabled="language === 'ja'"
							v-model="active"
							:items="[
								{ value: 1, text: 'active' },
								{ value: 0, text: 'inactive' },
							]"
							required
						></v-select>
					</v-col>
					<v-col cols="3">
						<v-select
							outlined
							label="Group(*)"
							item-value="id"
							item-text="name"
							:disabled="language === 'ja'"
							:items="groups"
							v-model="groupId"
							required
						></v-select>
					</v-col>
					<v-col cols="6">
						<v-select
							v-model="topic"
							:items="topicList"
							label="Tag(Topic)"
							outlined
							clearable
						></v-select>
					</v-col>
					<v-col cols="6">
						<v-select
							v-model="structure"
							:items="structureList"
							label="Tag(Structure)"
							outlined
							clearable
						></v-select>
					</v-col>
					<v-col cols="12">
						<v-textarea
							v-model="description"
							label="Description(*)"
							:rules="requiredRules"
							outlined
							required
						></v-textarea>
					</v-col>
					<v-col cols="12">
						<v-textarea
							v-model="recommended"
							label="Recommended(*)"
							:rules="requiredRules"
							outlined
							required
						></v-textarea>
					</v-col>
				</v-row>
				<div class="text-right">
					<v-btn
						@click="getProgram()"
						depressed
						class="mr-3"
						large
						dark
						color="grey darken-3"
						:disabled="isUpdating"
						>Reset</v-btn
					>
					<v-btn
						@click="goBack()"
						depressed
						class="mr-3"
						large
						:disabled="isUpdating"
						>Cancel</v-btn
					>
					<v-btn
						@click="save()"
						:disabled="!valid"
						depressed
						color="primary"
						large
						:loading="isUpdating"
						>Save</v-btn
					>
				</div>
			</v-form>
		</v-container>
	</div>
</template>

<script>
import Api from '@/services/index'

export default {
	data() {
		return {
			valid: false,
			isLoading: false,
			groups: [],
			nameRules: [
				value => !!value || 'Required.',
				value => (value || '').length <= 30 || 'Max 30 characters',
			],
			nameEnRules: [
				value => !!value || 'Required.',
				value => (value || '').length <= 50 || 'Max 50 characters',
			],
			requiredRules: [value => !!value || 'Required.'],
			// =====
			name: null,
			nameEn: null,
			programLevel: null,
			lessonType: 0,
			groupId: 1,
			active: 0,
			topic: null,
			structure: null,
			description: null,
			recommended: null,
			isUpdating: false,
		}
	},
	computed: {
		id() {
			return Number(this.$route.params.id)
		},
		language() {
			return this.$route.params.language
		},
		topicList() {
			return this.language === 'ja'
				? ['ビジネス', '日常生活', '時事テーマ']
				: ['비즈니스', '시사토픽', '시험대비', '일상생활']
		},
		structureList() {
			return this.language === 'ja'
				? ['パターン練習', 'ロールプレイ', '会話討論', '表現作文']
				: ['대화토론', '롤플레이', '패턴연습', '표현작문']
		},
		params() {
			return this.language === 'ja'
				? {
						name: this.name,
						topic: this.topic,
						structure: this.structure,
						description: this.description,
						recommended: this.recommended,
				  }
				: {
						name: this.name,
						nameEn: this.nameEn,
						programLevel: this.programLevel,
						lessonType: this.lessonType,
						groupId: this.groupId,
						active: this.active,
						topic: this.topic,
						structure: this.structure,
						description: this.description,
						recommended: this.recommended,
				  }
		},
	},
	created() {
		this.get()
	},
	methods: {
		async get() {
			await this.getGroup()
			await this.getProgram()
		},
		async getGroup() {
			try {
				this.isLoading = true
				const res = await Api.get('/groups?active=1')
				this.groups = res.data
				this.isLoading = false
			} catch (err) {
				console.log(err)
			}
		},
		async getProgram() {
			try {
				this.isLoading = true
				const res = await Api.get(
					`/programs/${this.id}?language=${this.language}`,
				)
				if (!res.data.program) throw new Error('no program')
				this.name = res.data.program.name
				this.nameEn = res.data.program.nameEn
				this.programLevel = res.data.program.programLevel
				this.lessonType = res.data.program.lessonType
				this.groupId = res.data.program.groupId
				this.active = res.data.program.active
				this.topic = res.data.program.topic
				this.structure = res.data.program.structure
				this.description = res.data.program.description
				this.recommended = res.data.program.recommended

				this.units = res.data.units.slice()
				this.isLoading = false
			} catch (err) {
				let msg = 'Error'
				if (err.message && err.message === 'no program') msg = 'No Program'

				alert(msg)
				this.$router.push({ name: 'Program' })
			}
		},
		goBack() {
			this.$router.go(-1)
		},
		async save() {
			await this.$refs.form.validate()
			if (this.valid === false) return
			else {
				try {
					this.isUpdating = true
					await Api.patch(
						`/programs/${this.id}?language=${this.language}`,
						this.params,
					)
					alert('Updated')
					this.$router.push({
						name: 'ProgramDetail',
						params: { id: this.id },
						query: { language: this.language },
					})
					this.isUpdating = false
				} catch (err) {
					alert('Error')
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
