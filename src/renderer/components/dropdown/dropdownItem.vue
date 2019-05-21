<template>
	<div class="dropdown__list-item">
		<slot />
	</div>
</template>

<script>
export default {
	name: "DropdownItem"
};
</script>

<style lang="sass">
.dropdown__list-item
	cursor: pointer
	padding: 8px 15px
	user-select: none

	&:hover
		background-color: rgba(139, 151, 152, .1)
</style>
