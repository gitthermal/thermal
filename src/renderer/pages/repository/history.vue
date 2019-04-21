<template>
	<div class="history">
		<div class="history__logs">
			<div v-if="!this.$store.state.history.commitInformation.isActive">
				<VueScrollbar class="history__logs__scrollbar">
					<div>
						<commitHistoryItem
							v-for="log in repositoryLogs"
							:key="log.hash"
							:data="log"
							@click.native="gitShow(log.hash)"
						/>
					</div>
				</VueScrollbar>
			</div>
			<div
				v-else
				class="history__logs__detail"
			>
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
				<VueScrollbar class="history__logs__detail__scrollbar">
					<commitInformation />
				</VueScrollbar>
			</div>
		</div>
		<div class="history__preview">
			<diffPreview
				v-if="this.$store.state.history.filePreview.isActive"
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
import VueScrollbar from "vue2-scrollbar";
import logMixin from "../../mixins/git/log";

export default {
	name: "History",
	components: {
		commitHistoryItem,
		commitInformation,
		diffPreview,
		VueScrollbar,
		fileIcon
	},
	computed: {
		repositoryLogs() {
			return this.$store.getters["history/allLogs"];
		},
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	mounted() {
		this.gitLog();
	},
	methods: {
		gitLog() {
			logMixin(this.currentRepository)
			.then(result => {
				this.$store.dispatch("history/getRepositoryLogs", {
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

			&__scrollbar
				max-height: 80.6vh

		&__scrollbar
			max-height: 90vh

	&__preview
		padding: 10px
</style>
