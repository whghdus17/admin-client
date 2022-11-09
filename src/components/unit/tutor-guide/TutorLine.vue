<template>
	<div class="d-flex justify-end">
		<div class="talk-bubble pa-3 tri-right round border right-top">
			<CopyText :val="script.content" :id="`${script.sequence}`" />
		</div>
	</div>
</template>

<script>
import CopyText from '@/components/common/CopyText'

export default {
	name: 'GuideTutorLine',
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
	font-family: Roboto;
	font-size: 16px;
	display: inline-block;
	position: relative;
	height: auto;
	background-color: #fff;
}
.border {
	border: 1px solid #0074ff;
}
.round {
	border-radius: 15px;
	-webkit-border-radius: 15px;
	-moz-border-radius: 15px;
}

/* Right triangle placed top right flush. */
.tri-right.border.right-top:before {
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	left: auto;
	right: -8px;
	top: -1px;
	bottom: auto;
	border: 9px solid;
	border-color: #0074ff transparent transparent transparent;
}
.tri-right.right-top:after {
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	left: auto;
	right: -5px;
	top: 0px;
	bottom: auto;
	border: 9px solid;
	border-color: #fff transparent transparent transparent;
}

/*Right triangle, placed bottom right side slightly in*/
.tri-right.border.btm-right-in:before {
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	left: auto;
	right: 17px;
	bottom: -14px;
	border: 7px solid;
	border-color: #0074ff #0074ff transparent transparent;
}
.tri-right.btm-right-in:after {
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	left: auto;
	right: 18px;
	bottom: -12px;
	border: 6px solid;
	border-color: #fff #fff transparent transparent;
}
</style>
