<template>
	<t-flexbox flex-direction="row" :flex-grow="1">
		<div ref="historyLogs" class="history__logs">
			<logSkeleton v-if="repositoryLogs.length < 1" />
			<div v-show="!commitDetail">
				<t-scrollbar style="height: calc(100vh - (65px + 34px))">
					<div>
						<commitHistoryItem
							v-for="log in repositoryLogs"
							:key="log.hash"
							:data="log"
							@click.native="gitShow(log.hash)"
						/>
					</div>
				</t-scrollbar>
			</div>
			<div v-if="commitDetail">
				<t-flexbox flex-direction="row" class="history__logs__detail__buttons">
					<div
						class="history__logs__detail__buttons__back"
						@click="toggleCommitDetail()"
					>
						Back
					</div>
					<div
						class="history__logs__detail__buttons__export d-flex ml-auto"
						@click="exportCommitDetail()"
					>
						<fileIcon />
					</div>
				</t-flexbox>
				<vue-scrollbar style="height: calc(100vh - (65px + 34px + 40px))">
					<commitInformation />
				</vue-scrollbar>
			</div>
		</div>
		<diffPreview
			v-if="this.$store.state.history.filePreview.isActive"
			:preview="commitFileDiffPreview"
		/>
		<blank-slate v-else />
	</t-flexbox>
</template>

<script>
import commitHistoryItem from "../../components/commit/commitHistoryItem";
import commitInformation from "../../components/commit/commitInformation";
import diffPreview from "../../components/diff/diffPreview";
import fileIcon from "../../components/icon/file";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import VueScrollbar from "vue2-scrollbar";
import gitLog from "../../git/log";
import logSkeleton from "../../components/skeleton/logs";
import BlankSlate from "../../components/BlankSlate";
import TFlexbox from "../../components/TLayouts/TFlexbox";

export default {
	name: "History",
	components: {
		commitHistoryItem,
		commitInformation,
		diffPreview,
		TScrollbar,
		VueScrollbar,
		fileIcon,
		logSkeleton,
		BlankSlate,
		TFlexbox
	},
	data() {
		return {
			commitDetail: false
		};
	},
	computed: {
		repositoryLogs() {
			return this.$store.getters["history/allLogs"];
		},
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		},
		commitFileDiffPreview() {
			return this.$store.getters["history/getFilePreview"];
		}
	},
	async mounted() {
		await this.gitLog();
	},
	methods: {
		async gitLog() {
			const logs = await gitLog(this.currentRepository.path);
			this.$store.commit("history/updateLogs", {
				logs: logs
			});
		},
		toggleCommitDetail() {
			this.commitDetail = !this.commitDetail;
			this.$store.commit({
				type: "history/toggleFilePreview",
				isActive: false
			});
		},
		gitShow(hash) {
			this.toggleCommitDetail();
			this.$store.dispatch({
				type: "history/updateCommitInformationMeta",
				commit_hash: hash
			});
		},
		exportCommitDetail() {
			this.$store.commit("modal/toggleExportCommitDataModal", true);
		}
	}
};
</script>

<style lang="sass">
.history
	&__logs
		border-right: 1px solid #DEE0E3
		width: 300px

		&__detail
			&__buttons
				padding: 10px
				border-bottom: 1px solid #DEE0E3

				&__back
					font-size: 10px
					cursor: pointer
					color: #6C6F75
					padding: 2px 6px
					background-color: #DEE0E3
					border-radius: 10px

				&__export
					cursor: pointer

					svg
						stroke: #6C6F75
						width: 18px
						height: 18px
</style>
