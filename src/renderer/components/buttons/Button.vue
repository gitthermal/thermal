<template>
	<a
		class="button"
		:style="{
			...spacingProps,
		}"
	>{{ text }}</a>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";

export default {
	name: "Button",
	mixins: [spacingProps],
	props: {
		appearance: {
			type: String,
			required: true,
			validator: function(value) {
				const appearance = ["primary", "outline", "link"];
				return appearance.filter(type => type === value);
			}
		},
		text: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: "none"
		},
		color: {
			type: String,
			default: "ffffff",
		},
		backgroundColor: {
			type: String,
			default: "00adb5",
		},
		disable: {
			type: Boolean,
			default: false
		},
		fontSize: {
			type: Number,
			default: 0.875
		},
		fontWeight: {
			type: Number,
			default: 400
		},
		borderRadius: {
			type: Number,
			default: 5
		},
		borderWidth: {
			type: Number,
			default: 1
		},
		borderStyle: {
			type: String,
			default: "solid"
		},
		borderColor: {
			type: String,
			default: null
		},
		paddingTop: {
			type: String,
			default: "0.5rem"
		},
		paddingBottom: {
			type: String,
			default: "0.5rem"
		},
		paddingLeft: {
			type: String,
			default: "1rem"
		},
		paddingRight: {
			type: String,
			default: "1rem"
		}
	}
};
</script>

<style lang="sass">
.button
	cursor: pointer
	opacity: 1
	font-size: 0.875rem
	user-select: none
	text-align: center
	display: inline-block

	&__primary
		color: #ffffff
		border-color: #00adb5

		&-default
			background-color: #00adb5

		&-success
			background-color: #43b581

		&-warning
			background-color: #faa61a

		&-danger
			background-color: #f04747

	&__outline

		&-default
			border-color: #00adb5
			color: #00adb5

		&-success
			border-color: #43b581
			color: #43b581

		&-warning
			border-color: #faa61a
			color: #faa61a

		&-danger
			border-color: #f04747
			color: #f04747

	&-disable
		opacity: .6
		cursor: not-allowed
</style>
