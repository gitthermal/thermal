<template>
  <div v-show="this.$store.state.model.model.addLocalRepository" class="model--small">
    <div class="model__section model__header">
      <h6 class="model__header__title">Add local repository</h6>
      <div @click="closeModel()" class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body flex-column">
      <inputText
        v-model.trim="pathToRepository"
        name="pathToRepository"
				@keyup.esc.native="closeModel"
				@keyup.enter.native="addRepository"
				v-focus
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
			let gitRepositoryPath = git(this.pathToRepository)
			let validateGit = await gitRepositoryPath.checkIsRepo()
			let listRemote
			try {
				listRemote = await git(this.pathToRepository).listRemote(["--get-url"])
				if (listRemote.slice(-4, -1) === "git") {
					this.$store.commit({
						type: "repository/localRepositoryRemote",
						remote: listRemote
					})
				}
			} catch (error) {
				console.log(error)
			}
			try {
				if (validateGit) {
					this.$store.commit({
						type: "repository/addLocalRepository",
						name: repositoryName,
						path: this.pathToRepository,
						remote: listRemote
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
			this.$store.dispatch("model/showAddLocalRepositoryModel")
		}
	},
	directives: {
		focus: {
			inserted: function (el) {
				el.focus()
			}
		}
	}
}
</script>

<style lang='sass'>
	.model

		&__header
			border-bottom: 1px solid #eee

		&__body
			border-bottom: 1px solid #eee
			
		&__error
			font-size: 11px
			margin-top: 10px
</style>
