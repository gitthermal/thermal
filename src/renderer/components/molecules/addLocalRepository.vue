<template>
  <div v-show="this.$store.state.addRepo.model.addLocalRepository" class="model--small">
    <div class="model__section modal__header">
      <h6 class="model__header__title">Add local repository</h6>
      <div @click="closeModel()" class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body">
      <inputText
        v-model="pathToRepository"
        name="pathToRepository"
        placeholder="Local path to repository"
      />
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

export default {
	name: "addRepo",
	data() {
		return {
			pathToRepository: ""
		}
	},
	components: {
		closeIcon,
		inputText,
		primaryButton
	},
	methods: {
		addRepository() {
			let repoName = this.pathToRepository.split("/")[ this.pathToRepository.split("/").length - 1 ]
			this.$store.dispatch({
				type: "addRepo/addLocalRepository",
				name: repoName,
				path: this.pathToRepository.trim()
			})
			this.closeModel()
		},
		closeModel() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("addRepo/showAddLocalRepositoryModel")
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
</style>
