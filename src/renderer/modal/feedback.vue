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
				<div>
					<h6>How was your experience?</h6>
					<div class="feedback__icons-container">
						<div
							class="feedback__icons"
							:class="{
								'feedback__icons-focus': selectEmoji === 'smile'
							}"
							@click="selectEmoji = 'smile'"
						>
							<SmileIcon />
						</div>
						<div
							class="feedback__icons"
							:class="{
								'feedback__icons-focus': selectEmoji === 'frown'
							}"
							@click="selectEmoji = 'frown'"
						>
							<FrownIcon />
						</div>
					</div>
				</div>
				<text-area-label
					v-model.trim="feedbackForm.message"
					:rows="8"
					name="feedback message"
					placeholder="Enter your message"
					label="Tell us why?"
					resize="vertical"
				/>
				<div style="font-size: 0.625rem; color: #c5c5c5;">
					{{ wordCount }} characters left
				</div>
			</div>
			<div v-show="!feedbackForm.toggle" class="model__body-thankyou">
				Thank you for sharing the feedback :)
			</div>
		</div>
		<div class="model__section model__footer">
			<Button
				text="Cancel"
				margin-left="auto"
				appearance="outline"
				@click.native="closeModel"
			/>
			<Button
				v-if="feedbackForm.toggle"
				margin-left=".5rem"
				appearance="primary"
				text="Tweet"
				:disabled="!disableTweet"
				@click.native="submitFeedback"
			/>
			<Button
				v-if="!feedbackForm.toggle"
				margin-left=".5rem"
				appearance="primary"
				text="Close"
				@click.native="submitFeedback"
			/>
		</div>
	</div>
</template>

<script>
// components
import TextAreaLabel from "../components/input/textareaLabel";
import closeIcon from "../components/icon/close";
import Button from "../components/TButton/TButton";

// icons
import SmileIcon from "../components/icon/smile";
import FrownIcon from "../components/icon/frown";

// pachakes
const { shell } = require("electron");

export default {
	name: "FeedbackForm",
	components: {
		closeIcon,
		TextAreaLabel,
		Button,
		SmileIcon,
		FrownIcon
	},
	data() {
		return {
			selectEmoji: "",
			feedbackForm: {
				message: "",
				toggle: true
			}
		};
	},
	computed: {
		selectedEmoji() {
			if (this.selectEmoji === "smile") {
				return " (😃)";
			} else if (this.selectEmoji === "frown") {
				return " (🙁)";
			} else {
				return "";
			}
		},
		wordCount() {
			return 280 - this.feedbackForm.message.length - 16;
		},
		disableTweet() {
			return !!this.feedbackForm.message && !!this.selectEmoji;
		}
	},
	methods: {
		closeModel() {
			this.$store.dispatch("model/showFeedback");
		},
		submitFeedback(event) {
			if (this.disableTweet) {
				let tweetUrl = new URL("https://twitter.com/intent/tweet");
				tweetUrl.searchParams.append(
					"text",
					this.feedbackForm.message.slice(0, 264) +
						" via @gitthermal" +
						this.selectedEmoji
				);
				shell.openExternal(tweetUrl.href);
				this.feedbackForm.toggle = !this.feedbackForm.toggle;
				setTimeout(() => {
					this.closeModel();
				}, 2500);
			} else {
				event.preventDefault();
			}
		}
	}
};
</script>

<style lang="sass">
.model__body-content
	display: flex
	flex-direction: column
	width: 100%

.feedback__icons-container
	display: flex
	margin-bottom: 1.5rem

.feedback__icons
	display: flex
	padding: 0.15rem
	cursor: pointer
	border: 1px solid #eeeeee
	border-radius: 0.3rem

	svg
		width: 1.875rem
		height: 1.875rem
		stroke: #222831

	&:first-child
		margin-right: 0.5rem

.feedback__icons-focus
	border-color: #00adb5
</style>
