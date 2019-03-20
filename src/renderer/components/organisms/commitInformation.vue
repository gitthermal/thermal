<template>
  <div>
    <div class="commit__detail__author">
      <img class="commit__detail__author__image" src="../../../../static/image/user_avatar.png">
      <div>
        <h6 class="commit__detail__author__name">{{ commitInformation.author.name }}</h6>
        <p class="commit__detail__author__email">{{ commitInformation.author.email }}</p>
      </div>
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
			return this.$store.state.workspace.repository.path
		},
		commitHash() {
			return this.$store.state.history.commitInformation.meta.commit_hash
		}
	},
	methods: {
		getCommitInformation() {
			this.getAuthorDetail(this.commitHash)
		},
		async getAuthorDetail(hash) {
			let author = await git(this.workspaceRepository).show([
				hash,
				"--format=%an %n %ae"
			])
			try {
				let output = author.split("\n")
				this.$store.dispatch({
					type: "history/updateCommitInformationAuthor",
					author_name: output[0].trim(),
					author_email: output[1].trim()
				})
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.getCommitInformation()
	}
}
</script>

<style lang='sass'>

</style>
