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
							v-model="settings.repositoryName"
							name="repositoryName"
							label="Name"
							placeholder="Repository name"
							class="settings__input"
						/>
						<inputTextLabel
							v-model="settings.directoryPath"
							name="directoryPath"
							label="Directory path"
							placeholder="Path"
							:disabled="true"
							class="settings__input"
						/>
						<inputTextLabel
							v-model="settings.remoteUrl"
							name="repositoryRemoteUrl"
							label="Origin / Remote URL"
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
									v-model="commitFeature"
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
									v-model="remoteFeature"
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
								<t-button
									margin-left="auto"
									:outline="true"
									:danger="true"
									@click.native="removeCurrentRepository()"
								>
									Remove
								</t-button>
							</t-flexbox>
						</div>
					</div>

					<t-button @click.native="saveSettings()">
						Save
					</t-button>
				</div>
			</t-container>
		</t-scrollbar>
	</t-flexbox>
</template>

<script>
import inputTextLabel from "../../components/input/inputTextLabel";
import TButton from "../../components/TButton/TButton";
import { ToggleButton } from "vue-js-toggle-button";
import TScrollbar from "../../components/TLayouts/TScrollbar";
import TFlexbox from "../../components/TLayouts/TFlexbox";
import TContainer from "../../components/TLayouts/TContainer";

// mixins
import queryAllRepository from "../../mixins/queryAllRepository";
import database from "../../../database";

export default {
	name: "RepositorySettings",
	components: {
		inputTextLabel,
		TButton,
		ToggleButton,
		TScrollbar,
		TFlexbox,
		TContainer
	},
	mixins: [queryAllRepository],
	data() {
		return {
			settings: {}
		};
	},
	computed: {
		commitFeature: {
			get: function() {
				return !!+this.settings.commitFeature;
			},
			set: function(value) {
				this.settings.commitFeature = value ? 1 : 0;
			}
		},
		remoteFeature: {
			get: function() {
				return !!+this.settings.remoteFeature;
			},
			set: function(value) {
				this.settings.remoteFeature = value ? 1 : 0;
			}
		}
	},
	mounted() {
		database.all(
			`SELECT
				repository.repositoryId,
				repository.directoryPath,
				repositorySettings.repositoryName,
				repositorySettings.description,
				repositorySettings.commitFeature,
				repositorySettings.remoteFeature,
				gitRepository.remoteUrl
			FROM repositorySettings
			INNER JOIN repository USING(repositoryId)
			INNER JOIN gitRepository USING(repositoryId)
			WHERE repositoryId IS $repositoryId`,
			{
				$repositoryId: this.$route.params.repositoryId
			},
			(err, data) => {
				if (err) console.log(err);
				else {
					console.log(data);
					this.settings = data[0];
				}
			}
		);
	},
	methods: {
		removeCurrentRepository() {
			this.removeRepoFromSettingsTable();

			this.$router.push({ name: "welcome" });
		},
		removeRepoFromSettingsTable() {
			// remove repository from repository settings table
			database.run(
				`DELETE FROM repositorySettings WHERE repositoryId IS $repositoryId`,
				{
					$repositoryId: this.settings.repositoryId
				},
				(err, data) => {
					if (err) console.log(err);
					else this.removeRepoFromGitTable();
				}
			);
		},
		removeRepoFromGitTable() {
			// remove repository from git repository table
			database.run(
				`DELETE FROM gitRepository WHERE repositoryId IS $repositoryId`,
				{
					$repositoryId: this.settings.repositoryId
				},
				(err, data) => {
					if (err) console.log(err);
					else this.removeRepoFromRepositoryTable();
				}
			);
		},
		removeRepoFromRepositoryTable() {
			// remove repository from main table
			database.run(
				`DELETE FROM repository WHERE repositoryId IS $repositoryId`,
				{
					$repositoryId: this.settings.repositoryId
				},
				(err, data) => {
					if (err) console.log(err);
					else this.queryAllRepository();
				}
			);
		},
		saveSettings() {
			database.run(
				`UPDATE repositorySettings SET
					repositoryName = $repositoryName,
					description = $description,
					commitFeature = $commitFeature,
					remoteFeature = $remoteFeature
				WHERE repositoryId = $repositoryId`,
				{
					$repositoryId: this.settings.repositoryId,
					$repositoryName: this.settings.repositoryName,
					$description: this.settings.description,
					$commitFeature: this.settings.commitFeature,
					$remoteFeature: this.settings.remoteFeature
				},
				(err, data) => {
					if (err) console.log(err);
				}
			);
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
