<template>
	<div class="t-card__body">
		<slot />
	</div>
</template>

<script>
export default {
	name: "TCardBody"
};
</script>

<style lang="sass">
.t-card__body
	display: flex
	border-bottom: 1px solid #eee
	padding: 1rem
</style>
