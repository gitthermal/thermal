<template>
	<div class="t-card__header">
		<slot />
	</div>
</template>

<script>
export default {
	name: "TCardHeader"
};
</script>

<style lang="sass">
.t-card__header
	display: flex
	border-bottom: 1px solid #eee
	padding: 0.8rem 1rem
</style>
