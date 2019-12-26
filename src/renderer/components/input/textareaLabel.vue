<template>
	<div :style="{ ...spacingProps }">
		<p class="textarea__label" :for="labelName">
			{{ label }}
		</p>
		<text-area
			name="Feedback message"
			placeholder="Enter your message"
			label="Message"
			:cols="cols"
			:value="value"
			:disabled="disabled"
			:is-invalid="isInvalid"
			:resize="resize"
			@input="$emit('input', $event)"
		/>
	</div>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";
import TextArea from "./textarea";

export default {
	name: "TextAreaLabel",
	components: {
		TextArea
	},
	mixins: [spacingProps],
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
		value: {
			type: String,
			default: ""
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
		label: {
			type: String,
			required: true
		},
		resize: {
			type: String,
			default: "both"
		}
	},
	computed: {
		labelName() {
			return this.label.toLowerCase().replace(" ", "_");
		}
	}
};
</script>

<style lang="sass">
.textarea__label
	font-size: 12px
	margin-bottom: .2rem
</style>
