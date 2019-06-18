<template>
	<div
		class="container"
		:class="{
			container__fluid: fluid
		}"
	>
		<slot />
	</div>
</template>

<script>
export default {
	name: "TContainer",
	props: {
		fluid: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="sass">
.container
	width: 100%
	padding-right: 15px
	padding-left: 15px
	margin-right: auto
	margin-left: auto

.container__fluid
	min-width: 100%

@media (min-width: 576px)
	.container
		max-width: 540px

@media (min-width: 768px)
	.container
		max-width: 720px

@media (min-width: 992px)
	.container
		max-width: 960px
</style>
