<template>
  <div class="settings w-100 d-flex flex-row">
    <div class="settings__content container">
      <div class="settings__content__header">
        <h4>Settings</h4>
        <p>Your local repository settings</p>
      </div>
      <div class="settings__body">
				<div class="settings__body__section">
					<inputTextLabel
						v-model="repositoryName"
						name="name"
						label="Name"
						placeholder="Repository name"
						class="settings__body__section__item"
					/>
					<inputTextLabel
						v-model="repositoryPath"
						name="directoryPath"
						label="Directory path"
						placeholder="Path"
						:disable="true"
						class="settings__body__section__item"
					/>
					<inputTextLabel
						v-model="repositoryRemoteUrl"
						name="repositoryRemoteUrl"
						label="Remote URL"
						placeholder="Path"
						:disable="true"
						class="settings__body__section__item"
					/>
				</div>				
				<div class="settings__body__section">
					<h4>Danger Zone</h4>
					<div class="settings__body__section__content">
						<div class="d-flex flex-row align-items-center">
							<div>
								<h6>Remove this repository</h6>
								<p>Once you remove the repository, you can add again.</p>
							</div>
							<outlineButton @click.native="removeCurrentRepository()" class="ml-auto" type="danger" text="Remove"/>
						</div>
					</div>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import inputTextLabel from "../../inputTextLabel"
import outlineButton from "../../atoms/outlineButton"

export default {
	name: "repositorySettings",
	components: {
		inputTextLabel,
		outlineButton
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"]
		},
		repositoryName: {
			get: function() {
				return this.currentRepository.name
			},
			set: function(value) {
				this.$store.commit({
					type: "repository/editLocalRepositoryName",
					name: value
				})
			}
		},
		repositoryPath() {
			return this.currentRepository.path
		},
		repositoryRemoteUrl() {
			return this.currentRepository.remote
		}
	},
	methods: {
		removeCurrentRepository() {
			this.$store.commit("repository/removeLocalRepository")
			this.$router.push({ name: "welcome" })
		}
	}
}
</script>

<style lang='sass'>
	.settings
		
		&__content
			padding: 20px

			&__header
				margin-bottom: 1rem
				
				p
					color: #7A7D84

		&__body
			
			&__section
				margin-bottom: 2rem

				&__content
					border: 1px solid #eee
					border-radius: .3rem
					padding: 1rem

					p
						font-size: 14px

				&__item
				
					&:not(:last-child)
						margin-bottom: .8rem
</style>
