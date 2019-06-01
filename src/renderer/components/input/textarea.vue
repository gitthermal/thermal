<template>
	<textarea
		:name="name"
		class="textarea"
		:class="{
			'textarea-disable': disabled,
			'textarea-invalid': isInvalid
		}"
		:placeholder="placeholder"
		:disabled="disabled"
		:style="{
			...spacingProps,
			...borderProps,
			...fontProps
		}"
		:rows="rows"
		:cols="cols"
		@input="$emit('input', $event.target.value)"
	></textarea>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";
import borderProps from "../../mixins/borderProps";
import fontProps from "../../mixins/fontProps";

export default {
	name: "TextArea",
	mixins: [spacingProps, borderProps, fontProps],
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
		cols: {
			type: Number,
			default: 5
		},
		rows: {
			type: Number,
			default: 5
		},
		borderRadius: {
			type: String,
			default: ".3"
		},
		fontSize: {
			type: Number,
			default: 0.833
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
.textarea
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
