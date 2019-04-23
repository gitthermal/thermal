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
		<Button
			:text="'Commit to ' + this.$store.state.commit.activeBranch"
			width="100%"
			appearance="primary"
			:disable="!stagedFileLength > 0"
			@click.native="commitMessageButton()"
		/>
	</div>
</template>

<script>
import inputText from '../input/inputText';
import Button from '../buttons/Button';
import commitMixin from "../../mixins/git/commit";
import spacingProps from "../../mixins/spacingProps";

export default {
	name: "CommitMessage",
	components: {
		inputText,
		Button
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
			commitMixin(this.currentRepository, this.$store.getters["commit/allStagedFiles"], this.commitMessageTitle).then(result => {
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
