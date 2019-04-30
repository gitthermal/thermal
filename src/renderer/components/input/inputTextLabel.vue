<template>
	<div
		:style="{
			...spacingProps
		}"
	>
		<p
			class="input__label"
			:for="labelName"
		>
			{{ label }}
		</p>
		<inputText
			:name="name"
			:placeholder="placeholder"
			:value="value"
			:disabled="disabled"
			@input="$emit('input', $event)"
		/>
	</div>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";
import inputText from "./inputText";

export default {
	name: "InputTextLabel",
	components: {
		inputText
	},
	mixins: [spacingProps],
	props: {
		name: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
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
		label: {
			type: String,
			required: true
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
.input__label
	font-size: 12px
	margin-bottom: .2rem
</style>
