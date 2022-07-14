<template>
	<div class="talk-bubble pa-3 tri-left round left-top">
		<CopyText :val="script.content" :id="`${script.id}`" />
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideStudentLine',
	components: {
		CopyText,
	},
	props: {
		script: {
			required: true,
			type: Object,
		},
	},
}
</script>

<style lang="scss" scoped>
/* CSS talk bubble */
.talk-bubble {
	font-family: NotoSansKR;
	font-size: 16px;
	display: inline-block;
	position: relative;
	height: auto;
	background-color: #ffc700;
}
.round {
	border-radius: 15px;
	-webkit-border-radius: 15px;
	-moz-border-radius: 15px;
}

.tri-left.left-top:before {
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	right: auto;
	left: -7px;
	top: 0px;
	bottom: auto;
	border: 9px solid;
	border-color: #ffc700 transparent transparent transparent;
}
</style>
