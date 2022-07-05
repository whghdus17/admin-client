<template>
	<div>
		<div class="grey lighten-3">
			<input
				id="file-selector"
				class="pt-2 pl-2"
				ref="file"
				type="file"
				:accept="acceptFileType"
				@change="handleFileUpload()"
			/>
			<v-btn style="float: right" small @click="uploadFile" outline
				>Upload</v-btn
			>
			<div style="clear: both"></div>
		</div>
		<div class="px-2" v-if="file">
			size: {{ fileSize }}KB, type: {{ fileType }}
		</div>
		<p v-if="errorMsg !== null" class="red--text">{{ errorMsg }}</p>
	</div>
</template>

<script>
import AWS from 'aws-sdk'

export default {
	props: ['path', 'acceptFileType'],
	data() {
		return {
			file: '',
			albumBucketName: 'tella-images',
			bucketRegion: 'ap-northeast-2',
			IdentityPoolId: 'ap-northeast-2:81b01fb1-7717-4604-a37e-fe57f9a5a435',
			errorMsg: null,
		}
	},
	computed: {
		fileName() {
			return this.file ? this.file.name : ''
		},
		fileSize() {
			return this.file ? this.file.size / 1000 : ''
		},
		fileType() {
			return this.file ? this.file.type : ''
		},
	},
	methods: {
		// 업로드 가능한 파일인지 검사
		// 파일 업로드
		// 업로드 완료시 디비 저장

		// 바깥에서는 image 선택시 취소와 저장 버튼 없애기
		// 각 role 선택시 값들 변화
		handleFileUpload() {
			this.file = this.$refs.file.files[0]
			this.errorMsg =
				this.fileSize > 1000 ? '용량은 1MB를 넘지 않도록 해주세요.' : null
			// if (!this.fileType.includes(this.fileType)) this.errorMsg = 'File Type is not matched. If you want to upload chat log, file must be a ".txt" file, Or If you want to upload image, file must be a ".png" or ".jpg" file'
		},
		uploadFile() {
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
			let fileName = file.name
			let basicPath = this.path
			let photoKey = basicPath + fileName
			s3.upload(
				{
					Key: photoKey,
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
					this.$emit('uploadedFile', data, photoKey)
				},
			)
		},
	},
}
</script>
