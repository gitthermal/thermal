<template>
	<t-flexbox flex-direction="row" :flex-grow="1">
		<div class="workspace__files">
			<t-flexbox flex-direction="column" style="overflow: hidden;">
				<t-flexbox align-items="center" class="workspace__branch">
					<branchIcon />
					<p>{{ branchName }}</p>
				</t-flexbox>
				<t-scrollbar
					style="height: calc(100vh - (106px + 41px + 65px + 34px))"
					width="100%"
				>
					<status-list :status-list="status" />
				</t-scrollbar>
			</t-flexbox>
			<commit-message
				v-if="repositoryData.commitFeature"
				:branch-name="branchName"
			/>
		</div>
		<diff-preview v-if="filePreview" />
		<blank-slate />
	</t-flexbox>
</template>

<script>
import TFlexbox from "../../components/TLayouts/TFlexbox";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import StatusList from "../../components/status/StatusList";
import commitMessage from "../../components/commit/commitMessage";
import branchIcon from "../../components/icon/branch";
import BlankSlate from "../../components/BlankSlate";
import diffPreview from "../../components/diff/diffPreview";

// mixins
import repositoryData from "../../mixins/repositoryData";
import { getStatus } from "../../git/status";
import { getBranchName } from "../../git/branch";

export default {
	name: "Workspace",
	components: {
		TFlexbox,
		branchIcon,
		TScrollbar,
		StatusList,
		commitMessage,
		BlankSlate,
		diffPreview
	},
	mixins: [repositoryData],
	data() {
		return {
			branchName: "",
			status: [],
			filePreview: false,
			commitMessageTitle: ""
		};
	},
	computed: {
		stagedFile: {
			get() {
				return this.$store.getters["commit/allStagedFiles"];
			},
			set(value) {
				this.$store.dispatch({
					type: "commit/updateStagedFiles",
					staged: value
				});
			}
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.currentBranchName();
			vm.gitStatus();
		});
	},
	beforeRouteUpdate(to, from, next) {
		this.currentBranchName();
		this.gitStatus();
		next();
	},
	methods: {
		currentBranchName() {
			getBranchName(this.repositoryData.directoryPath)
				.then(res => {
					this.branchName = res;
				})
				.catch(err => {
					console.log(err);
					this.branchName = "master";
				});
		},
		gitStatus() {
			getStatus(this.repositoryData.directoryPath).then(result => {
				this.status = result;
			});
		}
	}
};
</script>

<style lang="sass">
.workspace
	&__files
		border-right: 1px solid #DEE0E3
		max-width: 300px
		width: 100%

	&__branch
		background-color: #EFEFEF
		padding: 10px 20px
		border-bottom: 1px solid #DEE0E3

		svg
			width: 20px
			height: 20px
			stroke: #6C6F75

		p
			margin-left: 10px
			font-size: 14px
			font-weight: 600

	&__changes
		&__item
			border-bottom: 1px solid #DEE0E3
			font-size: 12px
			color: #2E3034
			padding: 6px 10px
			cursor: pointer

			&__checkbox
				margin-right: 5px

			&__path
				&__name
					color: #BEBEBE

			&__type
				padding: 3px 5px
				color: white
				border-radius: 3px

			&:hover
				background-color: rgba(#EFEFEF, .4)
</style>
