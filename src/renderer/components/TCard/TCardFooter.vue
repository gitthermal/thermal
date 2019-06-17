<template>
	<div class="t-card__footer">
		<slot />
	</div>
</template>

<script>
export default {
	name: "TCardFooter"
};
</script>

<style lang="sass">
.t-card__footer
	display: flex
	padding: .8rem 1rem
</style>
