<template>
  <div>
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
      :disable="disable"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import inputText from "./inputText"

export default {
	name: "InputTextLabel",
	components: {
		inputText
	},
	props: {
		name: {
			type: String
		},
		placeholder: {
			type: String
		},
		value: {
			type: String
		},
		disable: {
			type: Boolean,
			default: false
		},
		label: {
			type: String
		}
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
