<template>
	<div
		v-show="getFeatureValue.commit"
		:style="{
			...spacingProps,
			borderTop: '1px solid #DEE0E3'
		}"
	>
		<inputText
			v-model="commitMessageTitle"
			name="commitMessageTitle"
			placeholder="Summary (required)"
			margin-bottom="15px"
		/>
		<t-button
			width="100%"
			:disabled="!stagedFileLength > 0"
			@click.native="commitMessageButton()"
		>
			Commit to <strong>{{ $store.state.commit.activeBranch }}</strong>
		</t-button>
	</div>
</template>

<script>
import inputText from "../input/inputText";
import TButton from "../TButton/TButton";
import commitMixin from "../../mixins/git/commit";
import spacingProps from "../../mixins/spacingProps";

export default {
	name: "CommitMessage",
	components: {
		inputText,
		TButton
	},
	mixins: [spacingProps],
	data() {
		return {
			commitMessageTitle: ""
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		},
		getFeatureValue() {
			return this.currentRepository.features;
		},
		stagedFileLength() {
			return this.$store.state.commit.staged.length;
		}
	},
	methods: {
		commitMessageButton() {
			commitMixin(
				this.currentRepository,
				this.$store.getters["commit/allStagedFiles"],
				this.commitMessageTitle
			).then(result => {
				console.log(result);
				this.gitStatus();
			});
			this.$store.commit({
				type: "workspace/toggleFilePreview",
				isActive: false
			});
		}
	}
};
</script>
