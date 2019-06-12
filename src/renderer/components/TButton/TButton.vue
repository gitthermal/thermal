<template>
	<button
		class="t-button t-button__primary"
		:class="{
			't-button__disabled': disabled,
			't-button__outline': outline
		}"
		:disabled="disabled"
		:style="{
			...spacingProps
		}"
	>
		<slot />
	</button>
</template>

<script>
import spacingProps from "../../mixins/spacingProps";

export default {
	name: "TButton",
	mixins: [spacingProps],
	props: {
		color: {
			type: String,
			default: undefined
		},
		outline: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="sass">
.t-button
	cursor: pointer
	opacity: 1
	font-size: 0.875rem
	outline: none
	user-select: none
	text-align: center
	display: inline-block
	padding: .5rem 1rem
	line-height: 1.2
	border:
		width: 1px
		style: solid
		radius: 2rem

	&__primary
		color: #ffffff
		border-color: #00adb5
		background-color: #00adb5

	&__outline
		border-color: #00adb5
		color: #00adb5
		background-color: #ffffff

	&__disabled
		opacity: .6
		cursor: not-allowed
</style>
