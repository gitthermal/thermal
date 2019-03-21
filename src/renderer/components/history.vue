<template>
  <div class="history">
			<commitHistoryItem @click.native="gitShow(log.hash)" :data="log" v-for="log in repositoryLogs" :key="log.hash" />
    <div v-if="!this.$store.state.history.commitInformation.isActive">
    </div>
    <div v-else class="commit__detail">
      <div class="commit__detail__buttons">
        <div @click="toggleCommitDetail()" class="commit__detail__buttons__back">Back</div>
      </div>
			<commitInformation />
    </div>
  </div>
</template>

<script>
import git from "simple-git/promise"
import commitHistoryItem from './molecules/commitHistoryItem'
import commitInformation from "./organisms/commitInformation"

export default {
	name: "history",
	components: {
		commitHistoryItem,
		commitInformation
	},
	computed: {
		repositoryLogs() {
			return this.$store.getters["history/allLogs"]
		}
	},
	methods: {
		async getLogs() {
			const gitLog = await git(this.$store.state.workspace.repository.path).log()
			try {
				this.$store.dispatch("history/getRepositoryLogs", {
					logs: gitLog.all
				})
			} catch (error) {
				console.log(error)
			}
		},
		toggleCommitDetail() {
			this.$store.dispatch("history/showCommitInformation")
		},
		gitShow(hash) {
			this.toggleCommitDetail()
			this.$store.dispatch("history/updateCommitInformationCommitHash", {
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
		border-right: 1px solid #DEE0E3
		width: 300px
		overflow: hidden
		overflow-y: scroll
</style>
