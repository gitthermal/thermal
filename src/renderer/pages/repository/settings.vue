<template>
	<t-flexbox :flex-grow="1">
		<t-scrollbar height="86vh" width="100%">
			<t-container style="padding: 20px">
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
							<t-flexbox
								flex-direction="row"
								align-items="center"
								class="settings__section__group__item"
							>
								<div>
									<h6>Commit</h6>
									<p>Enable/disable commits for this repository</p>
								</div>
								<toggle-button
									v-model="toggleCommit"
									color="#00adb5"
									class="ml-auto"
								/>
							</t-flexbox>
							<t-flexbox
								flex-direction="row"
								align-items="center"
								class="settings__section__group__item"
							>
								<div>
									<h6>Remote</h6>
									<p>Pull, push and fetch</p>
								</div>
								<toggle-button
									v-model="toggleRemote"
									color="#00adb5"
									class="ml-auto"
								/>
							</t-flexbox>
						</div>
					</div>
					<div class="settings__section">
						<h4>Danger Zone</h4>
						<div class="settings__section__group">
							<t-flexbox
								flex-direction="row"
								align-items="center"
								class="settings__section__group__item"
							>
								<div>
									<h6>Remove this repository</h6>
									<p>You can add it again</p>
								</div>
								<Button
									margin-left="auto"
									appearance="outline"
									type="danger"
									text="Remove"
									@click.native="removeCurrentRepository()"
								/>
							</t-flexbox>
						</div>
					</div>
				</div>
			</t-container>
		</t-scrollbar>
	</t-flexbox>
</template>

<script>
import inputTextLabel from "../../components/input/inputTextLabel";
import Button from "../../components/buttons/Button";
import { ToggleButton } from "vue-js-toggle-button";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import TFlexbox from "../../components/TLayouts/TFlexbox";
import TContainer from "../../components/TLayouts/TContainer";

export default {
	name: "RepositorySettings",
	components: {
		inputTextLabel,
		Button,
		ToggleButton,
		TScrollbar,
		TFlexbox,
		TContainer
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
		&__content
			&__header
				margin-bottom: 1rem

				p
					color: #7A7D84
</style>
