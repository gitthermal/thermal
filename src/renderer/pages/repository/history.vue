<template>
	<div class="history">
		<div ref="historyLogs" class="history__logs">
			<div v-if="!this.$store.state.history.commitInformation.isActive">
				<logSkeleton v-if="repositoryLogs.length < 1" />
				<t-scrollbar v-else :height="historyLogListSize">
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
			<div v-else class="history__logs__detail">
				<div class="history__logs__detail__buttons">
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
				</div>
				<t-scrollbar height-type="max" :height="commitInformationPanelSize">
					<commitInformation />
				</t-scrollbar>
			</div>
		</div>
		<div class="history__preview">
			<diffPreview
				v-if="this.$store.state.history.filePreview.isActive"
				:preview="commitFileDiffPreview"
			/>
			<div v-else>
				No content to show
			</div>
		</div>
	</div>
</template>

<script>
import commitHistoryItem from "../../components/commit/commitHistoryItem";
import commitInformation from "../../components/commit/commitInformation";
import diffPreview from "../../components/diff/diffPreview";
import fileIcon from "../../components/icon/file";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import gitLog from "../../git/log";
import logSkeleton from "../../components/skeleton/logs";

export default {
	name: "History",
	components: {
		commitHistoryItem,
		commitInformation,
		diffPreview,
		TScrollbar,
		fileIcon,
		logSkeleton
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
		},
		historyLogListSize() {
			return this.$refs.historyLogs.getBoundingClientRect().height + "px";
		},
		commitInformationPanelSize() {
			return this.$refs.historyLogs.getBoundingClientRect().height - 39 + "px";
		}
	},
	mounted() {
		this.gitLog();
	},
	methods: {
		gitLog() {
			gitLog(this.currentRepository).then(result => {
				this.$store.commit("history/updateLogs", {
					logs: result
				});
			});
		},
		toggleCommitDetail() {
			this.$store.commit("history/toggleCommitInformation");
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
			this.$store.dispatch("model/showExportCommitData");
		}
	}
};
</script>

<style lang="sass">
.history
	display: flex
	flex-direction: row

	&__logs
		border-right: 1px solid #DEE0E3
		width: 300px

		&__detail

			&__buttons
				display: flex
				padding: 10px
				flex-direction: row
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

	&__preview
		padding: 10px
</style>
