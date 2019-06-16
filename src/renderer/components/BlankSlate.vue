<template>
	<t-flexbox
		flex-direction="column"
		justify-content="center"
		align-items="center"
		class="blankslate"
	>
		No content to show
	</t-flexbox>
</template>

<script>
import TFlexbox from "./TLayouts/TFlexbox";

export default {
	name: "BlankSlate",
	components: {
		TFlexbox
	}
};
</script>

<style lang="sass">
.blankslate
	width: 100%
	font-size: 12px
	color: #7A7D84
</style>
