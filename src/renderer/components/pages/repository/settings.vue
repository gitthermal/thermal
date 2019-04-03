<template>
  <div class="settings w-100">
		<VueScrollbar class="settings__scrollbar">
    <div class="settings__content container">
      <div class="settings__content__header">
        <h4>Settings</h4>
        <p>Your local repository settings</p>
      </div>
      <div class="settings__body">
				<div class="settings__body__section">
					<inputTextLabel
						v-model="repositoryName"
						name="repositoryName"
						label="Name"
						placeholder="Repository name"
						class="settings__body__section__item"
					/>
					<inputTextLabel
						v-model="repositoryPath"
						name="repositoryPath"
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
					<h4>Features</h4>
					<div class="settings__body__section__content">
						<div class="settings__body__section__content__item d-flex flex-row align-items-center">
							<div>
								<h6>Commit</h6>
								<p>Enable/disable commits for this repository</p>
							</div>
							<toggle-button v-model="toggleCommit" color="#00adb5" class="ml-auto"/>
						</div>
						<div class="settings__body__section__content__item d-flex flex-row align-items-center">
							<div>
								<h6>Remote</h6>
								<p>Pull, push and fetch</p>
							</div>
							<toggle-button v-model="toggleRemote" color="#00adb5" class="ml-auto"/>
						</div>
					</div>
				</div>
				<div class="settings__body__section">
					<h4>Danger Zone</h4>
					<div class="settings__body__section__content">
						<div class="settings__body__section__content__item d-flex flex-row align-items-center">
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
		</VueScrollbar>
  </div>
</template>

<script>
import inputTextLabel from "../../inputTextLabel"
import outlineButton from "../../atoms/outlineButton"
import { ToggleButton } from "vue-js-toggle-button"
import VueScrollbar from "vue2-scrollbar"

export default {
	name: "repositorySettings",
	components: {
		inputTextLabel,
		outlineButton,
		ToggleButton,
		VueScrollbar
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
		toggleCommit: {
			get: function() {
				return this.currentRepository.features.commit
			},
			set: function(value) {
				this.$store.commit({
					type: "repository/toggleCommitFeature",
					commits: value
				})
			}
		},
		toggleRemote: {
			get: function() {
				return this.currentRepository.features.remote
			},
			set: function(value) {
				this.$store.commit({
					type: "repository/toggleRemoteFeature",
					remotes: value
				})
			}
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

		&__scrollbar
			max-height: 86vh
		
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

					&__item

						&:not(:first-child)
							padding-top: .8rem

						&:not(:last-child)
							padding-bottom: .8rem
							border-bottom: 1px solid #eee
					p
						font-size: 14px

				&__item
				
					&:not(:last-child)
						margin-bottom: .8rem
</style>
