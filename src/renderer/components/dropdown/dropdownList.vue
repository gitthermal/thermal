<template>
	<t-flexbox
		flex-direction="column"
		:style="{ zIndex: zIndex }"
		class="dropdown__list"
	>
		<slot />
	</t-flexbox>
</template>

<script>
import TFlexbox from "../TLayouts/TFlexbox";

export default {
	name: "DropdownList",
	components: {
		TFlexbox
	},
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
	font-size: .8rem
	padding-top: 6px
	padding-bottom: 6px
</style>
