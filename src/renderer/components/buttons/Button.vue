<template>
	<a
		class="button"
		:style="{
			...borderProps,
			...spacingProps,
			...fontProps
		}"
	>{{ text }}</a>
</template>

<script>
import borderProps from "../../mixins/borderProps";
import spacingProps from "../../mixins/spacingProps";
import fontProps from "../../mixins/fontProps";

export default {
	name: "Button",
	mixins: [
		spacingProps,
		borderProps,
		fontProps
	],
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
		disabled: {
			type: Boolean,
			default: false
		},
		borderRadius: {
			type: Number,
			default: 5
		},
		borderColor: {
			type: String,
			default: null
		},
		fontSize: {
			type: Number,
			default: .875
		},
		lineHeight: {
			type: Number,
			default: 1.2
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
