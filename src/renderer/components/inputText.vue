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
			border-radius: .3rem
			padding: .5rem .8rem
			border: 1px solid #eeeeee
			font-family: inherit
			outline: none
			width: 100%

			&:focus
				border: 1px solid #00adb5
				box-shadow: rgba(#00adb5, .2) 0 0 0 3px
</style>
