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
							hint="프로그램 레벨을 '3' 혹은 '3|4' 형태로 입력해주세요."
							label="Program Level(*)"
							outlined
							required
						></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-select
							v-model="lessonType"
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
							:items="groups"
							v-model="groupId"
							required
						></v-select>
					</v-col>
					<v-col cols="6">
						<v-select
							v-model="topic"
							:items="['비즈니스', '시사토픽', '시험대비', '일상생활']"
							label="Tag(Topic)"
							outlined
							clearable
						></v-select>
					</v-col>
					<v-col cols="6">
						<v-select
							v-model="structure"
							:items="['대화토론', '롤플레이', '패턴연습', '표현작문']"
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
					<v-btn @click="goBack()" depressed class="mr-3" large>Cancel</v-btn>
					<v-btn
						@click="save()"
						:disabled="!valid"
						depressed
						color="primary"
						large
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
				value => (value || '').length <= 20 || 'Max 20 characters',
			],
			nameEnRules: [
				value => !!value || 'Required.',
				value => (value || '').length <= 20 || 'Max 20 characters',
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
		}
	},
	computed: {
		params() {
			return {
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
		this.getGroup()
	},
	methods: {
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
		goBack() {
			this.$router.push(-1).catch(() => {
				this.$router.push({ name: 'Program' })
			})
		},
		async save() {
			await this.$refs.form.validate()
			if (this.valid === false) return
			else {
				try {
					const res = await Api.post('/programs', this.params)
					const programId = res.data
					this.$router.push({
						name: 'ProgramDetail',
						params: { id: programId },
					})
				} catch (err) {
					alert('Error')
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
