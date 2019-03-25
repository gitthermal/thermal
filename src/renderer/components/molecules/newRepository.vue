<template>
  <div v-show="this.$store.state.addRepo.model.newRepository" class="model--small">
    <div class="model__section modal__header">
      <h6 class="model__header__title">Create a new repository</h6>
      <div class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body">
      <inputLabel
				label="Path"
        v-model="pathToRepository"
        name="pathToRepository"
        placeholder="Local path to repository"
      />
    </div>
    <div class="model__section model__footer">
      <primaryButton class="ml-auto" text="Add repository"/>
			<button @click="addRepository()">Add repo</button>
    </div>
  </div>
</template>

<script>
import closeIcon from "../icon/close"
import inputLabel from "../inputTextLabel"
import primaryButton from "../atoms/primaryButton"

export default {
	name: "newRepository",
	data() {
		return {
			pathToRepository: ""
		}
	},
	components: {
		closeIcon,
		inputLabel,
		primaryButton
	},
	methods: {
		addRepository() {
			console.log(this.pathToRepository.toString().split("/"))
			let repoName = this.pathToRepository.split("/")[ this.pathToRepository.split("/").length - 1 ]

			console.log(repoName)

			console.log(this.$store._actions)

			this.$store.dispatch("addRepo/addLocalRepo")
			console.log({ ...this.$store.state.addRepo.repo })
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
