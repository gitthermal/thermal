<template>
	<div
		v-show="repositoryData.features.commit"
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
import commitMixin from "../../git/commit";
import spacingProps from "../../mixins/spacingProps";
import repositoryDataMixin from "../../mixins/repositoryData";

export default {
	name: "CommitMessageBox",
	components: {
		inputText,
		TButton
	},
	mixins: [repositoryDataMixin, spacingProps],
	data() {
		return {
			commitMessageTitle: ""
		};
	},
	computed: {
		stagedFileLength() {
			return this.$store.state.commit.staged.length;
		}
	},
	methods: {
		commitMessageButton() {
			commitMixin(
				this.repositoryData.path,
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
