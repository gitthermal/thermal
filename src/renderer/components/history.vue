<template>
  <div class="commit--history">
    <div class="commit--history-list">
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
</style>
