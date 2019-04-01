<template>
  <div>
    <p class="input__label" :for="labelName">{{ label }}</p>
    <inputText
      :name="name"
      :placeholder="placeholder"
			@input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import inputText from "./inputText"

export default {
	name: "inputTextLabel",
	props: {
		name: {
			type: String
		},
		placeholder: {
			type: String
		},
		label: {
			type: String
		}
	},
	components: {
		inputText
	},
	computed: {
		labelName() {
			return this.label.toLowerCase().replace(" ", "_")
		}
	}
}
</script>

<style lang='sass'>
	.input__label
		font-size: 12px
		margin-bottom: .2rem
</style>
