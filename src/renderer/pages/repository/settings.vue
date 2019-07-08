<template>
	<div class="repository__settings w-100">
		<VueScrollbar class="repository__settings__scrollbar">
			<div class="repository__settings__content container">
				<div class="repository__settings__content__header">
					<h4>Settings</h4>
					<p>Your local repository settings</p>
				</div>

				<div>
					<div class="settings__section">
						<inputTextLabel
							v-model="repositoryName"
							name="repositoryName"
							label="Name"
							placeholder="Repository name"
							class="settings__input"
						/>
						<inputTextLabel
							v-model="repositoryPath"
							name="repositoryPath"
							label="Directory path"
							placeholder="Path"
							:disabled="true"
							class="settings__input"
						/>
						<inputTextLabel
							v-model="repositoryRemoteUrl"
							name="repositoryRemoteUrl"
							label="Remote URL"
							placeholder="Path"
							:disabled="true"
							class="settings__input"
						/>
					</div>
					<div class="settings__section">
						<h4>Features</h4>
						<div class="settings__section__group">
							<div class="settings__section__group__item">
								<div>
									<h6>Commit</h6>
									<p>Enable/disable commits for this repository</p>
								</div>
								<toggle-button
									v-model="toggleCommit"
									color="#00adb5"
									class="ml-auto"
								/>
							</div>
							<div class="settings__section__group__item">
								<div>
									<h6>Remote</h6>
									<p>Pull, push and fetch</p>
								</div>
								<toggle-button
									v-model="toggleRemote"
									color="#00adb5"
									class="ml-auto"
								/>
							</div>
						</div>
					</div>
					<div class="settings__section">
						<h4>Danger Zone</h4>
						<div class="settings__section__group">
							<div class="settings__section__group__item">
								<div>
									<h6>Remove this repository</h6>
									<p>You can add it again</p>
								</div>
								<t-button
									margin-left="auto"
									:outline="true"
									:danger="true"
									@click.native="removeCurrentRepository()"
								>
									Remove
								</t-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</VueScrollbar>
	</div>
</template>

<script>
import inputTextLabel from "../../components/input/inputTextLabel";
import TButton from "../../components/TButton/TButton";
import { ToggleButton } from "vue-js-toggle-button";
import VueScrollbar from "vue2-scrollbar";

export default {
	name: "RepositorySettings",
	components: {
		inputTextLabel,
		TButton,
		ToggleButton,
		VueScrollbar
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		},
		repositoryName: {
			get: function() {
				return this.currentRepository.name;
			},
			set: function(value) {
				this.$store.commit({
					type: "repository/editLocalRepositoryName",
					name: value
				});
			}
		},
		repositoryPath() {
			return this.currentRepository.path;
		},
		toggleCommit: {
			get: function() {
				return this.currentRepository.features.commit;
			},
			set: function(value) {
				this.$store.commit({
					type: "repository/toggleCommitFeature",
					commits: value
				});
			}
		},
		toggleRemote: {
			get: function() {
				return this.currentRepository.features.remote;
			},
			set: function(value) {
				this.$store.commit({
					type: "repository/toggleRemoteFeature",
					remotes: value
				});
			}
		},
		repositoryRemoteUrl() {
			return this.currentRepository.remote;
		}
	},
	methods: {
		removeCurrentRepository() {
			this.$store.commit("repository/removeLocalRepository");
			this.$router.push({ name: "welcome" });
		}
	}
};
</script>

<style lang="sass">
.repository

	&__settings

		&__scrollbar
			max-height: 86vh

		&__content
			padding: 20px

			&__header
				margin-bottom: 1rem

				p
					color: #7A7D84
</style>
