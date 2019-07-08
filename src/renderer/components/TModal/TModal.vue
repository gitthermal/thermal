<template>
	<div class="t-modal">
		<slot />
	</div>
</template>

<script>
export default {
	name: "Modal"
};
</script>

<style lang="sass">
.t-modal
	display: flex
	align-items: center
	justify-content: center
	width: 100%
	height: 100%
	position: fixed
	top: 0
	left: 0
	z-index: 5
</style>
