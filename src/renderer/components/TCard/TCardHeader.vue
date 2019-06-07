<template>
	<div class="t-card__header">
		<div class="t-card__header-heading">
			{{ heading }}
		</div>
		<div class="t-card__header__close" @click="closeModel()">
			<close-icon />
		</div>
	</div>
</template>

<script>
import closeIcon from "../icon/close";

export default {
	name: "TCardHeader",
	components: {
		closeIcon
	},
	props: {
		heading: {
			type: String,
			default: null
		},
		close: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="sass">
.t-card__header
	display: flex
	border-bottom: 1px solid #eee
	padding: 0.8rem 1rem

	&__close
		cursor: pointer
		display: flex
		margin-left: auto

		svg
			width: 20px
			height: 20px
			stroke: #7f8186
</style>
