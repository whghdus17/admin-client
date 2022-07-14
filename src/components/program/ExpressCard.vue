<template>
	<div style="position: relative" class="text-right">
		<img
			v-if="isError === false"
			:src="expressCardUrl"
			class="express-card"
			alt
			onerror="this.src='https://s.pstatic.net/static/www/img/uit/2019/sp_search.svg';"
		/>
		<S3ImageUplaodDialog
			v-else
			:path="`v1/express-card/${language}/`"
			:fileName="unitId.toString()"
			@uploadComplete="$emit('expressCardUploadCompleted')"
		/>
	</div>
</template>

<script>
import S3ImageUplaodDialog from '@/components/common/S3ImageUploadDialog'

export default {
	components: {
		S3ImageUplaodDialog,
	},
	props: {
		language: {
			required: true,
			type: String,
		},
		unitId: {
			required: true,
			type: Number,
		},
	},
	data() {
		return {
			isError: false,
		}
	},
	computed: {
		expressCardUrl() {
			return `https://tella-images.s3.ap-northeast-2.amazonaws.com/v1/express-card/${this.language}/${this.unitId}.jpg`
		},
	},
	created() {
		this.testImage()
	},
	methods: {
		testImage() {
			var tester = new Image()
			tester.onerror = this.imageNotFound
			tester.src = this.expressCardUrl
		},
		imageNotFound() {
			this.isError = true
		},
	},
}
</script>

<style lang="scss" scoped>
.express-card {
	vertical-align: middle;
	width: 50px;
	position: absolute;
	right: 0;
	top: 0;
	transition: width 0.2s ease-in-out, top 0.2s ease-in-out;
	z-index: 3;
}

.express-card:hover {
	width: 200px;
	top: -50px;
	z-index: 4;
}
</style>
