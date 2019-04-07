<template>
	<div
		v-show="this.$store.state.model.model.addLocalRepository"
		class="model--small"
	>
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Add local repository
			</h6>
			<div
				class="model__header__close"
				@click="closeModel()"
			>
				<closeIcon />
			</div>
		</div>
		<div class="model__section model__body flex-column">
			<inputText
				v-model.trim="pathToRepository"
				v-focus
				name="pathToRepository"
				placeholder="Local path to repository"
				@keyup.esc.native="closeModel"
				@keyup.enter.native="addRepository"
			/>
			<div
				v-show="showError"
				class="model__error"
			>
				This directoy does not appear to be a Git repository. Would you like to
				create a repositroy here instead?
			</div>
		</div>
		<div class="model__section model__footer">
			<primaryButton
				class="ml-auto"
				text="Add repository"
				@click.native="addRepository()"
			/>
		</div>
	</div>
</template>

<script>
import closeIcon from "../icon/close";
import inputText from "../input/inputText";
import primaryButton from "../buttons/primaryButton";
import git from "simple-git/promise";

export default {
	name: "AddLocalRepository",
	components: {
		closeIcon,
		inputText,
		primaryButton
	},
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			}
		}
	},
	data() {
		return {
			pathToRepository: "",
			showError: false
		};
	},
	methods: {
		async addRepository() {
			let repositoryName = this.pathToRepository.split("/")[ this.pathToRepository.split("/").length - 1 ];
			let gitRepositoryPath = git(this.pathToRepository);
			let validateGit = await gitRepositoryPath.checkIsRepo();
			let listRemote;
			try {
				listRemote = await git(this.pathToRepository).listRemote(["--get-url"]);
				if (listRemote.slice(-4, -1) === "git") {
					this.$store.commit({
						type: "repository/localRepositoryRemote",
						remote: listRemote
					});
				}
			} catch (error) {
				console.log(error);
			}
			try {
				if (validateGit) {
					this.$store.commit({
						type: "repository/addLocalRepository",
						name: repositoryName,
						path: this.pathToRepository,
						remote: listRemote,
						commits: true,
						remotes: true
					});
					this.pathToRepository = "";
					this.closeModel();
				} else {
					this.showError = true;
				}
			} catch (error) {
				console.log(error);
			}
		},
		closeModel() {
			this.$store.dispatch("model/showAddLocalRepositoryModel");
		}
	}
};
</script>

<style lang="sass">
.model

	&__header
		border-bottom: 1px solid #eee

	&__body
		border-bottom: 1px solid #eee

	&__error
		font-size: 11px
		margin-top: 10px
</style>
