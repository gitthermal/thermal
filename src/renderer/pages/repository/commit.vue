<template>
	<t-flexbox flex-direction="row" :flex-grow="1">
		<div ref="historyLogs" class="history__logs">
			<t-flexbox flex-direction="row" class="history__logs__detail__buttons">
				<div
					class="history__logs__detail__buttons__back"
					@click="openCommitsPage()"
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
			<t-scrollbar style="height: calc(100vh - (65px + 34px + 40px))">
				<commit-information :commit-id="$route.params.commitId" />
			</t-scrollbar>
		</div>
		<diffPreview v-if="filePreview.isActive" :preview="filePreview.preview" />
		<blank-slate v-else />
	</t-flexbox>
</template>

<script>
import commitInformation from "../../components/commit/commitInformation";
import diffPreview from "../../components/diff/diffPreview";
import fileIcon from "../../components/icon/file";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import BlankSlate from "../../components/BlankSlate";
import TFlexbox from "../../components/TLayouts/TFlexbox";

export default {
	name: "Commits",
	components: {
		commitInformation,
		diffPreview,
		TScrollbar,
		fileIcon,
		BlankSlate,
		TFlexbox
	},
	data() {
		return {
			filePreview: {
				isActive: false,
				preview: []
			}
		};
	},
	methods: {
		openCommitsPage() {
			this.$router.go(-1);
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
					user-select: none

				&__export
					cursor: pointer

					svg
						stroke: #6C6F75
						width: 18px
						height: 18px
</style>
