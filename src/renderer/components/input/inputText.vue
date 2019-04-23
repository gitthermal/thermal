<template>
	<input
		type="text"
		:name="name"
		class="input__text"
		:class="disabled"
		:placeholder="placeholder"
		:disabled="disabled"
		:style="{
			...spacingProps,
			...borderProps
		}"
		@input="$emit('input', $event.target.value)"
	>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";
import borderProps from "../../mixins/borderProps";

export default {
	name: "InputText",
	mixins: [
		spacingProps,
		borderProps
	],
	props: {
		name: {
			type: String,
			default: "inputField",
			required: true
		},
		placeholder: {
			type: String,
			default: "Enter the value",
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		isInvalid: {
			type: Boolean,
			default: false
		},
		borderRadius: {
			type: String,
			default: ".3"
		},
		paddingTop: {
			type: String,
			default: ".5rem"
		},
		paddingBottom: {
			type: String,
			default: ".5rem"
		},
		paddingLeft: {
			type: String,
			default: ".8rem"
		},
		paddingRight: {
			type: String,
			default: ".8rem"
		},
		width: {
			type: String,
			default: "100%"
		}
	}
};
</script>

<style lang="sass">
.input

	&__text
		border-radius: .3rem
		padding: .5rem .8rem
		border: 1px solid #eeeeee
		font-family: inherit
		outline: none
		width: 100%

		&:focus
			border: 1px solid #00adb5
			box-shadow: rgba(#00adb5, .2) 0 0 0 3px

		&__disable
			background-color: #eee
			color: #222831
			cursor: not-allowed
			user-select: none
</style>
