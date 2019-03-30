<template>
	<div class="menubar d-flex">
		<div class="menubar__logo d-flex">
			<thermalLogo/>
		</div>
		<div class="menubar__list d-flex align-items-center">
			<div class="menubar__list__item">File</div>
			<div class="menubar__list__item">Edit</div>
			<div class="menubar__list__item">View</div>
			<div class="menubar__list__item">Repository</div>
			<div class="menubar__list__item">Branch</div>
			<div class="menubar__list__item">Help</div>
		</div>
		<div class="menubar__drag"></div>
		<div class="menubar__controles">
			<windowsButton/>
		</div>
	</div>
</template>

<script>
import thermalLogo from "./icon/logo"
import windowsButton from "./windowsButton"

export default {
	name: "menubar",
	components: {
		thermalLogo,
		windowsButton
	}
}
</script>

<style lang='sass'>
.menubar
	width: 100%
	width: 100%

	&__drag
		width: 100%
		-webkit-app-region: drag

	&__logo
		padding: 8px 10px
		svg
			width: 20px
			height: 20px

	&__list
		padding: 8px 10px

		&__item
			color: #8B9798
			cursor: pointer
			font-size: .8rem
			
			&:not(:last-child)
				margin-right: 1rem

			&:hover
				color: #222831

	&__controles
		margin-left: auto
</style>
