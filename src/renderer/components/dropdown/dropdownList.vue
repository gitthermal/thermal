<template>
	<div :style="{ zIndex: zIndex }" class="dropdown__list">
		<slot />
	</div>
</template>

<script>
export default {
	name: "DropdownList",
	props: {
		zIndex: {
			type: Number,
			default: 10
		}
	}
};
</script>

<style lang="sass">
.dropdown__list
	position: absolute
	background-color: white
	border-radius: 3px
	box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px
	display: flex
	font-size: .8rem
	flex-direction: column
	padding-top: 6px
	padding-bottom: 6px
</style>
