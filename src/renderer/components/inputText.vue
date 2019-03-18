<template>
  <input
    type="text"
    :name="name"
    class="input__text"
    :placeholder="placeholder"
		@input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
	name: "inputText",
	props: {
		name: {
			type: String
		},
		placeholder: {
			type: String
		}
	}
}
</script>

<style lang='sass'>
	.input

		&__text
			border-radius: 3px
			padding: .5rem .8rem
			border: 1px solid #eeeeee
			font-family: inherit
			outline: none
			width: 100%
</style>
