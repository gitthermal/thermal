<template>
	<input
		type="text"
		:name="name"
		class="text__input"
		:class="{
			'text__input-disable': disabled,
			'text__input-invalid': isInvalid
		}"
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
.text__input
	font-family: inherit
	outline: none
	border-color: #eeeeee

	&-disable
		background-color: #eeeeee
		color: #222831
		cursor: not-allowed
		user-select: none

	&-invalid
		border-color: #f04747

	&:focus
		box-shadow: rgba(#00adb5, .2) 0 0 0 3px
		border-color: #00adb5
</style>
