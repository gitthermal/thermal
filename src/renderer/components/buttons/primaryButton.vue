<template>
  <a class="button button--primary">{{ text }}</a>
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
	.button--primary
		color: white
		background-color: #00adb5
</style>
