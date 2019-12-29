<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Share feedback" />
			<t-card-header-close modal-name="Feedback" />
		</t-card-header>
		<t-card-body>
			<div v-show="feedbackForm.toggle" style="width: 100%;">
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
		</t-card-body>
		<t-card-footer>
			<t-button
				v-if="feedbackForm.toggle"
				margin-left="auto"
				appearance="primary"
				:disabled="!disableTweet"
				@click.native="submitFeedback"
			>
				Tweet
			</t-button>
			<t-button
				v-if="!feedbackForm.toggle"
				margin-left="auto"
				appearance="primary"
				@click.native="submitFeedback"
			>
				Close
			</t-button>
		</t-card-footer>
	</t-card>
</template>

<script>
// components
import TCard from "../components/TCard/TCard";
import TCardHeader from "../components/TCard/TCardHeader";
import TCardHeaderHeading from "../components/TCard/TCardHeaderHeading";
import TCardHeaderClose from "../components/TCard/TCardHeaderClose";
import TCardBody from "../components/TCard/TCardBody";
import TCardFooter from "../components/TCard/TCardFooter";
import TextAreaLabel from "../components/input/textareaLabel";
import TButton from "../components/TButton/TButton";

// icons
import SmileIcon from "../components/icon/smile";
import FrownIcon from "../components/icon/frown";

// pachakes
const { shell } = require("electron");

export default {
	name: "FeedbackForm",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardHeaderClose,
		TCardBody,
		TCardFooter,
		TextAreaLabel,
		TButton,
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
