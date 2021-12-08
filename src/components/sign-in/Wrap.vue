<template>
	<div>
		<v-row align="center" justify="center">
			<v-card width="500" class="pa-5">
				<p class="text-h2 font-weight-bold mb-8">Log In</p>
				<v-form
					@submit.prevent="login"
					ref="form"
					v-model="valid"
					lazy-validation
				>
					<v-text-field
						outlined
						v-model="email"
						:rules="emailRules"
						label="Email"
						required
					></v-text-field>
					<v-text-field
						outlined
						v-model="password"
						:rules="passwordRules"
						label="Password"
						required
						type="password"
						autocomplete="off"
					></v-text-field>
					<v-btn
						type="submit"
						:disabled="valid === false"
						:loading="isLoading"
						block
						depressed
						large
						color="primary"
					>
						Log In
					</v-btn>
				</v-form>
			</v-card>
		</v-row>
	</div>
</template>

<script>
import Api from '@/services/index'
const crypto = require('crypto')

export default {
	data() {
		return {
			valid: true,
			isLoading: false,
			publicKey: null,
			email: null,
			emailRules: [v => !!v || 'ID is required'],
			password: null,
			passwordRules: [v => !!v || 'Password is required'],
		}
	},
	computed: {
		encryptedPW() {
			let encryptedPW = null
			if (this.password) {
				const hashPassword = crypto
					.createHash('md5')
					.update(this.password)
					.digest('hex')
				encryptedPW = crypto
					.publicEncrypt(this.publicKey, Buffer.from(hashPassword, 'utf8'))
					.toString('base64')
			}
			return encryptedPW
		},
	},
	created() {
		this.getPublicKey()
	},
	methods: {
		async getPublicKey() {
			try {
				this.isLoading = true
				const res = await Api.get('/auth/pulic-key')
				this.publicKey = res.data
				this.isLoading = false
			} catch (err) {
				alert(
					this.$t(
						'서버에서 암호키를 불러오는 데에 실패하였습니다. 고객센터로 문의주세요.',
					),
				)
			}
		},
		async login() {
			try {
				await Api.post('/auth', {
					email: this.email,
					encryptedPassword: this.encryptedPW,
				})

				await this.$store.dispatch('auth/get')
				await this.$store.dispatch('user/get')

				this.$router.push({ name: 'Home' })
			} catch (err) {
				console.error(err)
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
