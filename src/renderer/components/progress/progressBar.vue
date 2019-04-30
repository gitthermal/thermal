<template>
	<div
		class="progress__bar"
		:style="{
			height: height + 'rem',
			...spacingProps
		}"
	>
		<div
			:style="{
				backgroundColor: '#' + color,
				height: height + 'rem',
				width: value + '%'
			}"
			class="progress__bar-progress"
		/>
	</div>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";

export default {
	name: "ProgressBar",
	mixins: [spacingProps],
	props: {
		color: {
			type: String,
			default: "00adb5"
		},
		height: {
			type: Number,
			default: 1
		},
		value: {
			type: Number,
			default: 0,
			required: true
		}
	}
};
</script>

<style lang="sass">
.progress__bar
	background-color: #eeeeee
	border-radius: .3rem
	overflow: hidden
	width: 100%

	&-progress
		transition: width .6s ease
</style>
