<template>
	<button class="button button--outline">{{ text }}</button>
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

<style lang='sass'>
	.button--outline
		border: 1px solid #00adb5
		color: #00adb5
		background: none
</style>
