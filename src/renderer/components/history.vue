<template>
  <div class="history">
    <div v-show="!commitDetail.isActive">
      <a
        @click="gitShow(log.hash)"
        class="history__item d-flex flex-column"
        v-for="log in repositoryLogs"
        :key="log.hash"
      >
        <div :title="log.message" class="history__item__title">{{ log.message }}</div>
        <div class="history__item__author d-flex flex-row align-items-center">
          <img class="history__item__author__image" src="../../../static/image/user_avatar.png">
          {{ log.author_name }} committed {{ log.date | moment("from", "now") }}
        </div>
      </a>
    </div>
    <div v-show="commitDetail.isActive" class="commit__detail">
      <div class="commit__detail__buttons">
        <div @click="commitDetail.isActive = false" class="commit__detail__buttons__back">Back</div>
      </div>
      <div class="commit__detail__author">
        <img class="commit__detail__author__image" src="../../../static/image/user_avatar.png">
        <div>
          <h6 class="commit__detail__author__name">{{ this.commitDetail.author.name }}</h6>
          <p class="commit__detail__author__email">{{ this.commitDetail.author.email }}</p>
        </div>
      </div>
      <div class="commit__detail__summary">
        <div class="commit__detail__summary__title">{{ this.commitDetail.title }}</div>
        <div class="commit__detail__summary__description">{{ this.commitDetail.description }}</div>
      </div>
      <div class="commit__detail__meta">
        <div class="commit__detail__meta__item">Author:
          <p>{{ this.commitDetail.author.name }} <{{ this.commitDetail.author.email }}></p>
        </div>
        <div class="commit__detail__meta__item">Author Date:
          <p>{{ this.commitDetail.author.date }}</p>
        </div>
        <div class="commit__detail__meta__item">Committer:
          <p>{{ this.commitDetail.committer.name }} <{{ this.commitDetail.committer.email}}></p>
        </div>
        <div class="commit__detail__meta__item">Committer Date:
          <p>{{ this.commitDetail.committer.date }}</p>
        </div>
        <div class="commit__detail__meta__item">Refs:
          <p>{{ this.commitDetail.refs }}</p>
        </div>
        <div class="commit__detail__meta__item">Commit Hash:
          <p>{{ this.commitDetail.hash }}</p>
        </div>
        <div class="commit__detail__meta__item">Tree Hash:
          <p>{{ this.commitDetail.tree_hash }}</p>
        </div>
        <div class="commit__detail__meta__item">Parent Hash:
          <p>{{ this.commitDetail.parent_hash }}</p>
        </div>
      </div>
      <div class="commit__detail__files">
        <div
          class="commit__detail__files__summary"
        >Showing {{ this.commitDetail.fileList.length }} changed files with {{ this.commitDetail.meta.additions ? this.commitDetail.meta.additions : '0' }} additions and {{ this.commitDetail.meta.deletion ? this.commitDetail.meta.additions : '0' }} deletion</div>
        <div
          class="commit__detail__files__list"
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
			commitDetail: {
				isActive: false,
				title: "",
				author: {
					name: "",
					email: "",
					date: ""
				},
				description: "",
				hash: "", // TODO Change to commit_hash
				committer: {
					name: "",
					email: "",
					date: ""
				},
				refs: "",
				tree_hash: "",
				parent_hash: "",
				fileList: [],
				meta: {
					changes: "",
					additions: "",
					deletion: ""
				}
			}
		}
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
		gitShow(hash) {
			this.commitDetail.hash = hash
			this.commitDetail.isActive = true

			this.getAuthorDetail(hash)
			this.getCommitBody(hash)
			this.getCommitMeta(hash)
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
		async getCommitBody(hash) {
			const content = await git(this.repo).show([
				hash,
				"--format=%s %n << %n %b %n >>"
			])
			try {
				const output = content.split("\n")
				this.commitDetail.title = output[0]
				let commitDescriptionStart
				let commitDescriptionEnd
				for (let i = 0; i < output.length; i++) {
					if (output[i].trim() === "<<") {
						commitDescriptionStart = i
					}
					if (output[i].trim() === ">>") {
						commitDescriptionEnd = i
					}
				}
				if (commitDescriptionEnd - commitDescriptionStart > 2) {
					this.commitDetail.description = output
						.slice(commitDescriptionStart + 1, commitDescriptionEnd)
						.toString()
				}
			} catch (error) {
				console.log(error)
			}
		},
		async getCommitMeta(hash) {
			const content = await git(this.repo).show([
				hash,
				"--format=%ai %n %cn %n %ce %n %cd %n %d %n %T %n %P"
			])
			try {
				const output = content.split("\n")
				console.log(output)
				this.commitDetail.author.date = output[0]
				this.commitDetail.committer.name = output[1]
				this.commitDetail.committer.email = output[2]
				this.commitDetail.committer.date = output[3]
				this.commitDetail.refs = output[4]
				this.commitDetail.tree_hash = output[5]
				this.commitDetail.parent_hash = output[6]
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
				let output = gitShowFiles.split("\n")

				// list of file changes
				this.commitDetail.fileList = output.slice(1, output.length - 2)
				// number of file changes
				this.commitDetail.meta.changes = this.commitDetail.fileList.length

				const filesSummary = output[output.length - 1].split(", ")
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
	.history
		border-right: 1px solid #DEE0E3
		width: 300px
		overflow: hidden
		overflow-y: scroll

		&__item
			padding: 10px
			font-size: 12px
			border-bottom: 1px solid #DEE0E3

			&__title
				margin-bottom: 6px
				color: black

			&__author
				font-size: 10px
				color: #6C6F75

				&__image
					width: 15px
					height: 15px
					margin-right: 6px

	.commit__detail

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

		&__author
			padding: 10px
			border-bottom: 1px solid #DEE0E3
			display: flex
			flex-direction: row

			&__image
				width: 50px
				height: 50px
				margin-right: 10px

			&__name
				margin-bottom: 0

			&__email
				font-size: 12px
				color: #6C6F75

		&__summary
			padding: 10px
			border-bottom: 1px solid #DEE0E3

			&__description
				margin-top: 6px
				font-size: 12px

		&__meta
			padding: 10px
			border-bottom: 1px solid #DEE0E3

			&__item
				font-size: 12px
				color: #DEE0E3

				&:not(:last-child)
					margin-bottom: 4px

				p
					color: #2E3034

		&__files

			&__summary
				padding: 10px
				color: #DEE0E3
				font-size: 10px
				border-bottom: 1px solid #DEE0E3

			&__list
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
