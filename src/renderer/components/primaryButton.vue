<template>
	<button class="button button--primary">{{ text }}</button>
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
		outline: none
		border: none
		cursor: pointer
		padding: .5rem 1rem
		border-radius: 1rem
		font-family: inherit

	.button--primary
		color: white
		background-color: #00adb5
</style>
