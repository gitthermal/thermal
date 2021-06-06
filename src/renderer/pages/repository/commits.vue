<template>
	<t-flexbox flex-direction="row" :flex-grow="1">
		<div ref="historyLogs" class="history__logs">
			<logSkeleton v-if="logs.length < 1" />
			<t-scrollbar style="height: calc(100vh - (65px + 34px))">
				<div>
					<commitHistoryItem
						v-for="log in logs"
						:key="log.hash"
						:data="log"
						@click.native="gitShow(log.hash)"
					/>
				</div>
			</t-scrollbar>
		</div>
		<blank-slate />
	</t-flexbox>
</template>

<script>
// components
import commitHistoryItem from "../../components/commit/commitHistoryItem";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import gitLog from "../../git/log";
import logSkeleton from "../../components/skeleton/logs";
import BlankSlate from "../../components/BlankSlate";
import TFlexbox from "../../components/TLayouts/TFlexbox";

// mixins
import repositoryData from "../../mixins/repositoryData";

export default {
	name: "Commits",
	components: {
		commitHistoryItem,
		TScrollbar,
		logSkeleton,
		BlankSlate,
		TFlexbox
	},
	mixins: [repositoryData],
	data() {
		return {
			logs: []
		};
	},
	mounted() {
		this.gitLog();
	},
	methods: {
		gitLog() {
			gitLog(this.repositoryData.directoryPath).then(result => {
				this.logs = result;
			});
		},
		gitShow(hash) {
			this.$router.push({
				name: "projectCommitDetail",
				params: {
					commitId: hash
				}
			});
		}
	}
};
</script>

<style lang="sass">
.history
	&__logs
		border-right: 1px solid #DEE0E3
		width: 300px
</style>
