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
		<div class="model__section model__body ">
			<div v-show="feedbackForm.toggle" class="model__body-content">
				<input-text-label
					v-model.trim="feedbackForm.name"
					label="Name"
					name="name"
					placeholder="Enter your name"
					margin-bottom=".8rem"
				/>
				<text-area-label
					v-model.trim="feedbackForm.message"
					:rows="8"
					name="feedback message"
					placeholder="Enter your message"
					label="Message"
				/>
			</div>
			<div v-show="!feedbackForm.toggle" class="model__body-thankyou">
				Thank you for sharing the feedback :)
			</div>
		</div>
		<div class="model__section model__footer">
			<Button
				margin-left="auto"
				appearance="primary"
				text="Submit"
				:disabled="emptyFeedbackForm"
				@click.native="submitFeedback"
			/>
		</div>
	</div>
</template>

<script>
import inputTextLabel from "../input/inputTextLabel";
import TextAreaLabel from "../input/textareaLabel";
import closeIcon from "../icon/close";
import Button from "../buttons/Button";

export default {
	name: "FeedbackForm",
	components: {
		closeIcon,
		inputTextLabel,
		TextAreaLabel,
		Button
	},
	data() {
		return {
			feedbackForm: {
				name: "",
				message: "",
				toggle: true
			}
		};
	},
	computed: {
		emptyFeedbackForm() {
			if (this.feedbackForm.message === "") {
				return true;
			}
			return false;
		}
	},
	methods: {
		closeModel() {
			this.$store.dispatch("model/showFeedback");
		},
		submitFeedback() {
		}
	}
};
</script>

<style lang="sass">
.model__body-content
	display: flex
	flex-direction: column
	width: 100%
</style>
