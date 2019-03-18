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
      <div class="commit--author">
        <img class="author--image" src="../../../static/image/user_avatar.png">
        <div class="author--detai">
          <h6 class="author--name">{{ this.commitDetail.author.name }}</h6>
          <p class="author--email">{{ this.commitDetail.author.email }}</p>
        </div>
      </div>
      <div class="commit--meta">
        <div class="commit--metaItem">Date: {{ }}</div>
        <div class="commit--metaItem">Commit:
          <p>{{ this.commitDetail.hash }}</p>
        </div>
      </div>
      <div class="commit--detail-files">
        <div
          class="commit--files-summary"
        >Showing {{ this.commitDetail.fileList.length }} changed files with {{ this.commitDetail.meta.additions ? this.commitDetail.meta.additions : '0' }} additions and {{ this.commitDetail.meta.deletion ? this.commitDetail.meta.additions : '0' }} deletion</div>
        <div
          class="commit--fileList"
          v-for="file in this.commitDetail.fileList"
          :key="file"
        >{{ file.replace(/\|.*/, '').trim() }}</div>
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
				author: {
					name: "",
					email: ""
				},
				hash: "",
				date: "",
				fileList: [],
				meta: {
					changes: "",
					additions: "",
					deletion: ""
				}
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
		getCommitDetail(hash) {
			this.commitDetail.hash = hash
			this.commitDetail.isActive = true

			this.getAuthorDetail(hash)
			this.getFilesDetail(hash)
		},
		async getAuthorDetail(hash) {
			const author = await git(this.repo).show([hash, "--format=%an %n %ae"])
			try {
				const output = author.split("\n")
				this.commitDetail.author.name = output[0].trim()
				this.commitDetail.author.email = output[1].trim()
			} catch (error) {
				console.log(error)
			}
		},
		async getFilesDetail(hash) {
			const gitShowFiles = await git(this.repo).show([
				hash,
				"--oneline",
				"--stat"
			])
			try {
				let output = gitShowFiles.trim().split("\n")
				this.getCommitFiles(output)
				// list of file changes
				this.commitDetail.fileList = output.slice(1, output.length - 1)
				// number of file changes
				this.commitDetail.meta.changes = this.commitDetail.fileList.length
			} catch (error) {
				console.log(error)
			}
		},
		getCommitFiles(summary) {
			const filesSummary = summary[summary.length - 1].split(", ")
			filesSummary.shift()
			for (let i = 0; i < filesSummary.length; i++) {
				const commitMetaType = filesSummary[i].slice(
					filesSummary[i].length - 2,
					filesSummary[i].length - 1
				)
				const commitMetaNumber = filesSummary[i].split(" ")
				if (commitMetaType === "+") {
					this.commitDetail.meta.additions = commitMetaNumber[0]
				}
				if (commitMetaType === "-") {
					this.commitDetail.meta.deletion = commitMetaNumber[0]
				}
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
		width: 300px
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

	.commit--author
		padding: 10px
		border-bottom: 1px solid #DEE0E3
		display: flex
		flex-direction: row

		.author--image
			width: 50px
			height: 50px
			margin-right: 10px

		.author--name
			margin-bottom: 0

		.author--email
			font-size: 12px
			color: #6C6F75

	.commit--meta
		padding: 10px
		border-bottom: 1px solid #DEE0E3

	.commit--metaItem
		font-size: 12px
		&:not(:last-child)
			margin-bottom: 4px
		color: #DEE0E3

		p
			color: #2E3034

	.commit--files-summary
		padding: 10px
		color: #DEE0E3
		font-size: 10px
		border-bottom: 1px solid #DEE0E3

	.commit--fileList
		border-bottom: 1px solid #DEE0E3
		font-size: 12px
		font-family: 'Space Mono', monospace
		color: #2E3034
		padding: 4px 10px
		cursor: pointer

		&:hover
			color: white
			background-color: #0366D6
</style>
