<template>
	<div
		v-if="repositoryData.commitFeature"
		class="commit__message"
	>
		<inputText
			v-model="commitMessageTitle"
			name="commitMessageTitle"
			placeholder="Summary (required)"
			margin-bottom="15px"
		/>
		<t-button
			:disabled="!stagedFileLength > 0"
			@click.native="commitMessageButton()"
		>
			Commit to <strong>{{ branchName }}</strong>
		</t-button>
	</div>
</template>

<script>
import inputText from "../input/inputText";
import TButton from "../TButton/TButton";
import commitMixin from "../../git/commit";

// mixins
import repositoryData from "../../mixins/repositoryData"

export default {
	name: "CommitMessageBox",
	components: {
		inputText,
		TButton
	},
	mixins: [repositoryData],
	props: {
		branchName: {
			type: String,
			default: ""
		}
	},
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

<style lang="sass">
.commit__message
	display: flex
	flex-direction: column
	padding: 10px
	border-top: 1px solid #DEE0E3
</style>
