<template>
  <div class="model--content">
    <div class="model--section modal--header">
      <h6 class="model--header-title">Add local repository</h6>
      <div class="model--header-close">
        <closeIcon/>
      </div>
    </div>
    <div class="model--section model--body">
      <inputText
        v-model="pathToRepository"
        name="pathToRepository"
        placeholder="Local path to repository"
      />
    </div>
    <div class="model--section model--footer">
      <primaryButton class="model--footer-primaryButton" text="Add repository"/>
    </div>
  </div>
</template>

<script>
import closeIcon from "./icon/close"
import inputText from "./inputText"
import primaryButton from "./primaryButton"

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
			this.$store.dispatch("addRepo/addLocalRepo")
		}
	}
}
</script>

<style lang='sass'>
	.model--content
		width: 450px
		position: absolute
		top: 50%
		background-color: white
		border-radius: 5px
		left: 50%
		transform: translate(-50%, -50%)

	.model--section
		padding: .8rem 1rem
		display: flex

	.modal--header
		border-bottom: 1px solid #eee

		h6
			margin-bottom: 0

		.model--header-close
			cursor: pointer
			display: flex
			margin-left: auto

			svg
				width: 20px
				height: 20px
				stroke: #222831

	.model--body
		border-bottom: 1px solid #eee

	.model--footer-primaryButton
		margin-left: auto
</style>
