<template>
	<div class="t-card__header-close" @click="closeModal(modalName)">
		<close-icon />
	</div>
</template>

<script>
import CloseIcon from "../icon/close";
import closeModalMixin from "../../mixins/closeModal";

export default {
	name: "TCardHeaderClose",
	components: {
		CloseIcon
	},
	mixins: [closeModalMixin],
	props: {
		modalName: {
			type: String,
			default: null
		}
	}
};
</script>

<style lang="sass">
.t-card__header
	&-close
		cursor: pointer
		display: flex
		margin-left: auto

		svg
			width: 20px
			height: 20px
			stroke: #7f8186
</style>
