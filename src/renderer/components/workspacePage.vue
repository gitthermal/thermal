<template>
  <div class="workspace">
    <div class="workspace__branch d-flex">
      <branchIcon/>
      <p>{{ this.$store.state.commit.activeBranch }}</p>
    </div>
    </div>
  </div>
</template>

<script>
import git from "simple-git/promise"
import branchIcon from "./icon/branch"

export default {
	name: "workspace",
	components: {
		branchIcon,
	},
	methods: {
		async gitStatus() {
			let status = await git(
				this.$store.state.workspace.currentRepository.path
			).status()
			try {
				console.log(status)
				this.$store.dispatch({
					type: "commit/updateActiveBranch",
					branch: status.current
				})
			} catch (error) {
				console.log(error)
			}
	},
	mounted() {
		this.gitStatus()
	}
}
</script>

<style lang='sass'>
	.workspace
		border-right: 1px solid #DEE0E3
		width: 400px
		height: 90vh

		&__branch
			background-color: #EFEFEF
			padding: 10px 20px
			border-bottom: 1px solid #DEE0E3
			position: sticky
			top: 0

			svg
				width: 20px
				height: 20px
				stroke: #6C6F75

			p
				margin-left: 10px
				font-size: 14px
				font-weight: 600
</style>
