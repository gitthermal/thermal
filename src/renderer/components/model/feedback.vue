<template>
	<div v-show="this.$store.state.model.model.feedback" class="model--small">
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Share feedback
			</h6>
			<div class="model__header__close" @click="closeModel">
				<close-icon />
			</div>
		</div>
		<div class="model__section model__body">
		</div>
		<div class="model__section model__footer"></div>
	</div>
</template>

<script>
import closeIcon from "../icon/close";

export default {
	name: "FeedbackForm",
	components: {
		closeIcon,
	},
	methods: {
		closeModel() {
			this.$store.dispatch("model/showFeedback");
		}
	}
};
</script>

<style lang="sass">

</style>

