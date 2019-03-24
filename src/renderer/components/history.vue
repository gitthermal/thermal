<template>
  <div class="history">
		<div class="history__logs">
			<div v-if="!this.$store.state.history.commitInformation.isActive">
				<commitHistoryItem
					@click.native="gitShow(log.hash)"
					:data="log"
					v-for="log in repositoryLogs"
					:key="log.hash"
				/>
			</div>
			<div v-else class="commit__detail">
				<div class="commit__detail__buttons">
					<div @click="toggleCommitDetail()" class="commit__detail__buttons__back">Back</div>
				</div>
				<commitInformation />
			</div>
		</div>
		<div class="history__preview">
			<div v-if="this.$store.state.history.filePreview.isActive">
				<commitHistoryPreview/>
			</div>
			<div v-else>
				No content to show
			</div>
		</div>
  </div>
</template>

<script>
import git from "simple-git/promise"
import commitHistoryItem from "./molecules/commitHistoryItem"
import commitInformation from "./organisms/commitInformation"
import commitHistoryPreview from "./organisms/commitHistoryPreview"
import * as Sentry from '@sentry/electron'

export default {
	name: "history",
	components: {
		commitHistoryItem,
		commitInformation,
		commitHistoryPreview
	},
	computed: {
		repositoryLogs() {
			return this.$store.getters["history/allLogs"]
		}
	},
	methods: {
		async getLogs() {
			const gitLog = await git(
				this.$store.state.workspace.currentRepository.path
			).log()
			try {
				this.$store.dispatch("history/getRepositoryLogs", {
					logs: gitLog.all
				})
			} catch (error) {
				Sentry.captureException(error)
				let errorMessage = "Unable to fetch logs."
				console.log(errorMessage)
				Sentry.captureMessage(errorMessage, gitLog)
			}
		},
		toggleCommitDetail() {
			this.$store.dispatch("history/showCommitInformation")
			this.$store.dispatch("history/showFilePreview")
		},
		gitShow(hash) {
			this.$store.dispatch("history/showCommitInformation")
			this.$store.dispatch({
				type: "history/updateCommitInformationMeta",
				commit_hash: hash
			})
		}
	},
	mounted() {
		this.getLogs()
	}
}
</script>

<style lang='sass'>
	.history
		display: flex
		flex-direction: row

		&__logs
			border-right: 1px solid #DEE0E3
			width: 300px
			overflow: hidden
			overflow-y: scroll

		&__preview
			padding: 10px
</style>
