<template>
	<button class="button">{{ text }}</button>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang='sass' scoped>
	.button
		background-color: #00adb5
		outline: none
		border: none
		color: white
		cursor: pointer
		padding: .5rem 1rem
		border-radius: 3px
		font-family: inherit
</style>
