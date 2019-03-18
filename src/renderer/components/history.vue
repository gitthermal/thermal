<template>
  <div class="commit--history">
    <div v-show="!commitDetail.isActive" class="commit--history-list">
      <a
        @click="getCommitDetail(log.hash)"
        class="commit--history-item"
        v-for="log in this.logs"
        :key="log.hash"
      >
        <div class="commit--history-title">{{ log.message }}</div>
        <div class="commit--history-author">
          <img src="../../../static/image/user_avatar.png">
          {{ log.author_name }} committed {{ log.date | moment("from", "now") }}
        </div>
      </a>
    </div>
    <div v-show="commitDetail.isActive">
      <div class="commit--detail-buttons">
        <div @click="commitDetail.isActive = false" class="commit--detail-back">Back</div>
      </div>
    </div>
  </div>
</template>

<script>
import git from "simple-git/promise"

export default {
	name: "history",
	data() {
		return {
			repo: "C:/Users/YASHU/Desktop/thermal",
			logs: {},
			commitDetail: {
				isActive: false,
			}
		}
	},
	methods: {
		async getLogs() {
			const gitLog = await git(this.repo).log()
			try {
				this.logs = gitLog.all
			} catch (error) {
				console.log(error)
			}
		},
		async getCommitDetail(hash) {
			this.commitDetail.hash = hash
			this.commitDetail.isActive = true
		}
	},
	mounted() {
		this.getLogs()
	}
}
</script>

<style lang='sass'>
	.commit--history
		border-right: 1px solid #DEE0E3
		width: 250px
		overflow: hidden
		overflow-y: scroll
		display: flex
		flex-direction: row

	.commit--history-item
		padding: 10px
		font-size: 12px
		border-bottom: 1px solid #DEE0E3
		display: flex
		flex-direction: column

	.commit--history-title
		margin-bottom: 6px
		color: black

	.commit--history-author
		font-size: 10px
		color: #6C6F75
		display: flex
		flex-direction: row

		img
			width: 15px
			height: 15px
			margin-right: 6px

	.commit--detail-buttons
		display: flex
		padding: 10px
		flex-direction: row
		border-bottom: 1px solid #DEE0E3

	.commit--detail-back
		font-size: 10px
		cursor: pointer
		color: #6C6F75
		padding: 2px 6px
		background-color: #DEE0E3
		border-radius: 10px
</style>
