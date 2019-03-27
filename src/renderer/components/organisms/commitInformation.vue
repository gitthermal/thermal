<template>
  <div>
    <div class="commit__detail__author">
      <img class="commit__detail__author__image" src="../../../../static/image/user_avatar.png">
      <div>
        <h6 class="commit__detail__author__name">{{ commitInformation.author.name }}</h6>
        <p class="commit__detail__author__email">{{ commitInformation.author.email }}</p>
      </div>
    </div>
    <div class="commit__detail__summary">
      <div class="commit__detail__summary__title">{{ commitInformation.title }}</div>
      <div
        v-if="commitInformation.description"
        class="commit__detail__summary__description"
      >{{ commitInformation.description }}</div>
    </div>
    <div class="commit__detail__meta">
      <div v-if="commitInformation.author.name" class="commit__detail__meta__item">Author:
        <p>{{ commitInformation.author.name }} <{{ commitInformation.author.email }}></p>
      </div>
      <div v-if="commitInformation.author.date" class="commit__detail__meta__item">Author Date:
        <p>{{ commitInformation.author.date }}</p>
      </div>
      <div v-if="commitInformation.committer.name" class="commit__detail__meta__item">Committer:
        <p>{{ commitInformation.committer.name }} <{{ commitInformation.committer.email}}></p>
      </div>
      <div
        v-if="commitInformation.committer.date"
        class="commit__detail__meta__item"
      >Committer Date:
        <p>{{ commitInformation.committer.date }}</p>
      </div>
      <div v-if="commitInformation.meta.refs" class="commit__detail__meta__item">Refs:
        <p>{{ commitInformation.meta.refs }}</p>
      </div>
      <div v-if="commitInformation.meta.commit_hash" class="commit__detail__meta__item">Commit Hash:
        <p>{{ commitInformation.meta.commit_hash }}</p>
      </div>
      <div v-if="commitInformation.meta.tree_hash" class="commit__detail__meta__item">Tree Hash:
        <p>{{ commitInformation.meta.tree_hash }}</p>
      </div>
      <div v-if="commitInformation.meta.parent_hash" class="commit__detail__meta__item">Parent Hash:
        <p>{{ commitInformation.meta.parent_hash }}</p>
      </div>
    </div>
    <div class="commit__detail__files">
      <div
        class="commit__detail__files__summary"
      >Showing {{ commitInformation.files.list.length }} changed files with {{ commitInformation.files.additions ? commitInformation.files.additions : '0' }} additions and {{ commitInformation.files.deletion ? commitInformation.files.additions : '0' }} deletion</div>
      <div
        class="commit__detail__files__list"
        v-for="file in commitInformation.files.list"
        :key="trimFilePath(file)" @click="commitHistoryPreview(commitInformation.meta.commit_hash, trimFilePath(file))"
      >{{ trimFilePath(file) }}</div>
    </div>
  </div>
</template>

<script>
import git from "simple-git/promise"

export default {
	name: "commitInformation",
	computed: {
		commitInformation() {
			return this.$store.getters["history/getCommitInformation"]
		},
		workspaceRepository() {
			return this.$store.state.workspace.currentRepository.path
		},
		commitHash() {
			return this.$store.state.history.commitInformation.meta.commit_hash
		}
	},
	methods: {
		getCommitInformation() {
			this.getAuthorDetail(this.commitHash)
			this.getCommitBody(this.commitHash)
			this.getCommitMeta(this.commitHash)
			this.getFilesDetail(this.commitHash)
		},
		async getAuthorDetail(hash) {
			let author = await git(this.workspaceRepository).show([
				hash,
				"--format=%an %n %ae %n %ad"
			])
			try {
				let output = author.split("\n")
				this.$store.dispatch({
					type: "history/updateCommitInformationAuthor",
					author_name: output[0].trim(),
					author_email: output[1].trim(),
					author_date: output[2].trim()
				})
			} catch (error) {
				console.log(error)
			}
		},
		async getCommitBody(hash) {
			let body = await git(this.workspaceRepository).show([
				hash,
				"--format=%s %n << %n %b %n >>"
			])
			try {
				let output = body.split("\n")
				let title = output[0].trim()
				let description
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
					description = output
						.slice(commitDescriptionStart + 1, commitDescriptionEnd)
						.toString()
						.trim()
				}
				this.$store.dispatch({
					type: "history/updateCommitInformationBody",
					title: title,
					description: description
				})
			} catch (error) {
				console.log(error)
			}
		},
		async getCommitMeta(hash) {
			let meta = await git(this.workspaceRepository).show([
				hash,
				"--format=%cn %n %ce %n %cd %n %d %n %H %n %T %n %P"
			])
			try {
				let output = meta.split("\n")
				this.$store.dispatch({
					type: "history/updateCommitInformationMeta",
					committer_name: output[0].trim(),
					committer_email: output[1].trim(),
					committer_date: output[2].trim(),
					meta_refs: output[3].trim(),
					commit_hash: output[4].trim(),
					tree_hash: output[5].trim(),
					parent_hash: output[6].trim()
				})
			} catch (error) {
				console.log(error)
			}
		},
		async getFilesDetail(hash) {
			let files = await git(this.repo).show([
				hash,
				"--oneline",
				"--stat"
			])
			try {
				let output = files.split("\n")
				let additionDeletion = output[output.length - 2].split(", ")
				additionDeletion.shift()
				let addition
				let deletion

				for (let i = 0; i < additionDeletion.length; i++) {
					let commitMetaType = additionDeletion[i].slice(
						additionDeletion[i].length - 2,
						additionDeletion[i].length - 1
					)
					let additionDeletionNumber = additionDeletion[i].split(" ")
					if (commitMetaType === "+") {
						addition = additionDeletionNumber[0]
					}
					if (commitMetaType === "-") {
						deletion = additionDeletionNumber[0]
					}
				}

				this.$store.dispatch({
					type: "history/updateCommitInformationFiles",
					files_additions: addition,
					files_deletion: deletion,
					files_list: output.slice(1, output.length - 2)
				})
			} catch (error) {
				console.log(error)
			}
		},
		trimFilePath(path) {
			return path.replace(/\|.*/, "").trim()
		},
		async commitHistoryPreview(hash, path) {
			this.$store.dispatch("history/showFilePreview")
			let gitDiff = await git(this.$store.state.workspace.currentRepository.path).diff([hash + "^1", hash, "--", path])
			try {
				let output = gitDiff.split("\n")
				output.splice(0, 4)
				this.$store.dispatch({
					type: "history/updateFilePreview",
					preview: output
				})
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.getCommitInformation()
	}
}
</script>

<style lang='sass'>
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
				color: #BEBEBE

				&:not(:last-child)
					margin-bottom: 4px

				p
					color: #2E3034

		&__files

			&__summary
				padding: 10px
				color: #BEBEBE
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
