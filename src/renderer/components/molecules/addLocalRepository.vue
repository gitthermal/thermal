<template>
  <div v-show="this.$store.state.workspace.model.addLocalRepository" class="model--small">
    <div class="model__section model__header">
      <h6 class="model__header__title">Add local repository</h6>
      <div @click="closeModel()" class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body flex-column">
      <inputText
        v-model="pathToRepository"
        name="pathToRepository"
        placeholder="Local path to repository"
      />
			<div v-show="showError" class="model__error">
				This directoy does not appear to be a Git repository. Would you like to create a repositroy here instead?
			</div>
    </div>
    <div class="model__section model__footer">
      <primaryButton @click.native="addRepository()" class="ml-auto" text="Add repository"/>
    </div>
  </div>
</template>

<script>
import closeIcon from "../icon/close"
import inputText from "../inputText"
import primaryButton from "../atoms/primaryButton"
import git from "simple-git/promise"

export default {
	name: "addLocalRepository",
	data() {
		return {
			pathToRepository: "",
			showError: false
		}
	},
	components: {
		closeIcon,
		inputText,
		primaryButton
	},
	methods: {
		async addRepository() {
			let repositoryName = this.pathToRepository.split("/")[ this.pathToRepository.split("/").length - 1 ]
			console.log(this.pathToRepository)
			let gitRepositoryPath = git(this.pathToRepository)
			let validateGit = await gitRepositoryPath.checkIsRepo()
			try {
				if (validateGit) {
					this.$store.dispatch({
						type: "workspace/addLocalRepositoryToList",
						name: repositoryName,
						path: this.pathToRepository.trim()
					})
					this.pathToRepository = ""
					this.closeModel()
				} else {
					this.showError = true
				}
			} catch (error) {
				console.log(error)
			}
		},
		closeModel() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("workspace/showAddLocalRepositoryModel")
		}
	}
}
</script>

<style lang='sass'>
	.model
		
		&__section
			padding: .8rem 1rem
			display: flex

		&__header
			border-bottom: 1px solid #eee

			&__title
				margin-bottom: 0

			&__close
				cursor: pointer
				display: flex
				margin-left: auto

				svg
					width: 20px
					height: 20px
					stroke: #222831

		&__body
			border-bottom: 1px solid #eee
			
		&__error
			font-size: 11px
			margin-top: 10px
</style>
