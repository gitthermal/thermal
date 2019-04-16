<template>
	<a
		:style="{
			marginTop: marginTop + 'rem',
			marginBottom: marginBottom + 'rem',
			marginLeft: marginLeft + 'rem',
			marginRight: marginRight + 'rem',
			paddingTop: paddingTop + 'rem',
			paddingBottom: paddingBottom + 'rem',
			paddingLeft: paddingLeft + 'rem',
			paddingRight: paddingRight + 'rem'
		}"
		class="button button--primary"
	>
		{{ text }}
	</a>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true
		},
		marginTop: {
			type: Number,
			default: null
		},
		marginBottom: {
			type: Number,
			default: null
		},
		marginLeft: {
			type: Number,
			default: null
		},
		marginRight: {
			type: Number,
			default: null
		},
		paddingTop: {
			type: Number,
			default: null
		},
		paddingBottom: {
			type: Number,
			default: null
		},
		paddingLeft: {
			type: Number,
			default: null
		},
		paddingRight: {
			type: Number,
			default: null
		}
	}
};
</script>

<style lang="sass">
.button--primary
	color: white
	background-color: #00adb5
</style>
