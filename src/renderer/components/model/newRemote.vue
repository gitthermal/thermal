<template>
	<div v-show="this.$store.state.model.model.newRemote" class="model--small">
		<div class="model__section model__header">
      <h6 class="model__header__title">Add remote url</h6>
      <div @click="closeModel()" class="model__header__close">
        <closeIcon/>
      </div>
    </div>
    <div class="model__section model__body flex-column">
			<inputText
				v-model="remoteUrl"
				name="remoteUrl"
				placeholder="Remote URL"
				@keyup.esc.native="closeModel"
				@keyup.enter.native="addRemoteUrl"
				v-focus
			/>
    </div>
    <div class="model__section model__footer">
      <primaryButton @click.native="addRemoteUrl()" class="ml-auto" text="Publish repository"/>
    </div>
	</div>
</template>

<script>
import inputText from "../input/inputText"
import closeIcon from "../icon/close"
import primaryButton from "../buttons/primaryButton"
import git from "simple-git/promise"

export default {
	name: "newRemote",
	data() {
		return {
			remoteUrl: ""
		}
	},
	components: {
		inputText,
		closeIcon,
		primaryButton
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"]
		}
	},
	methods: {
		closeModel() {
			this.$store.dispatch("model/showNewRemote")
		},
		async addRemoteUrl() {
			let status = await git(
				this.currentRepository.path
			).status()
			console.log("Pushing changes...")
			await git(this.currentRepository.path).push([this.remoteUrl, status.current])
			let addRemote = await git(this.currentRepository.path).addRemote("origin", this.remoteUrl)
			try {
				console.log("Adding remote url to origin")
				console.log(addRemote)
				this.$store.commit({
					type: "repository/localRepositoryRemote",
					remote: this.remoteUrl
				})
				this.closeModel()
			} catch (error) {
				console.log(error)
			}
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

</style>
