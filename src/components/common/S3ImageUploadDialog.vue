<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn @click.stop="" fab icon v-bind="attrs" v-on="on"
				><v-icon>mdi-cloud-upload</v-icon></v-btn
			>
		</template>

		<v-card>
			<v-card-title class="text-h5 grey lighten-2">
				Privacy Policy
			</v-card-title>

			<div class="pa-5">
				<div
					v-if="previewSrc"
					class="mb-5"
					style="max-height: 350px; overflow-y: auto"
				>
					<img :src="previewSrc" style="width: 350px" alt="" />
				</div>
				<div class="mb-3">
					<input
						id="file-selector"
						ref="file"
						type="file"
						:accept="acceptFileType"
						@change="handleFileUpload()"
					/>
				</div>
				<div class="text-body-1 font-weight-medium" v-if="file">
					upload path:
					<span class="pl-2 primary--text">{{ photoKey }}</span
					><br />
					size:<span class="pl-2 primary--text">{{ fileSize }}KB</span> <br />
					type:<span class="pl-2 primary--text">{{ fileType }}</span>
				</div>
				<p v-if="errorMsg !== null" class="red--text">{{ errorMsg }}</p>
			</div>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					:disabled="errorMsg !== null || !file"
					:loading="isUploading"
					text
					@click="uploadFile"
				>
					Upload
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import AWS from 'aws-sdk'

export default {
	props: {
		path: {
			required: true,
			type: String,
		},
		fileName: {
			required: true,
			type: String,
		},
	},
	data() {
		return {
			isUploading: false,
			dialog: false,
			acceptFileType: 'image/*',
			albumBucketName: 'tella-images',
			bucketRegion: 'ap-northeast-2',
			IdentityPoolId: 'ap-northeast-2:81b01fb1-7717-4604-a37e-fe57f9a5a435',
			file: '',
			errorMsg: null,
			previewSrc: null,
			photoKey: null,
		}
	},
	computed: {
		fileSize() {
			return this.file ? this.file.size / 1000 : ''
		},
		fileType() {
			return this.file ? this.file.type : ''
		},
	},
	watch: {
		dialog(val) {
			if (val === false) {
				this.file = ''
				this.errorMsg = null
				this.previewSrc = null
				this.photoKey = null
			}
		},
	},
	methods: {
		// 업로드 가능한 파일인지 검사
		// 파일 업로드
		// 업로드 완료시 디비 저장

		// 바깥에서는 image 선택시 취소와 저장 버튼 없애기
		// 각 role 선택시 값들 변화
		handleFileUpload() {
			this.errorMsg = null
			this.file = this.$refs.file.files[0]

			// FileReader 인스턴스 생성
			const reader = new FileReader()
			// 이미지가 로드가 된 경우
			reader.onload = e => {
				this.previewSrc = e.target.result
			}
			// reader가 이미지 읽도록 하기
			reader.readAsDataURL(this.file)

			const splitedFileName = this.file.name.split('.')
			let fileName = this.fileName || splitedFileName[0]
			let fileExtension = splitedFileName[splitedFileName.length - 1]

			let basicPath = this.path
			this.photoKey = basicPath + fileName + '.' + fileExtension

			if (fileExtension !== 'jpg') {
				this.errorMsg = '확장자는 jpg여야 합니다.'
				return
			}
			if (this.fileSize > 100) {
				this.errorMsg = '용량은 100kb를 넘지 않도록 해주세요.'
				return
			}
		},
		uploadFile() {
			this.isUploading = true
			AWS.config.update({
				region: this.bucketRegion,
				credentials: new AWS.CognitoIdentityCredentials({
					IdentityPoolId: this.IdentityPoolId,
				}),
			})

			const s3 = new AWS.S3({
				apiVersion: '2006-03-01',
				params: {
					Bucket: this.albumBucketName,
				},
			})

			let files = document.getElementById('file-selector').files

			if (!files.length) {
				return alert('Please choose a file to upload first.')
			}
			let file = files[0]
			s3.upload(
				{
					Key: this.photoKey,
					Body: file,
					ACL: 'public-read',
				},
				(err, data) => {
					if (err) {
						return alert(
							'There was an error uploading your photo: ',
							err.message,
						)
					}
					console.log(data)
					this.isUploading = false
					this.dialog = false
					this.$emit('uploadComplete')
				},
			)
		},
	},
}
</script>

<style lang="scss" scoped></style>
