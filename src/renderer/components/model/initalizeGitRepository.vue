<template>
	<div
		v-if="isGitRepository"
		class="model--small isgit"
	>	
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Git not found
			</h6>
		</div>
		<div class="model__section model__body">
			By default git will be initalized at the root of the project.
		</div>
		<div class="model__section model__footer">
			<primaryButton
				text="Go back"
				appearance="outline"
				:border-width="1"
				border-color="00adb5"
				margin-left="auto"
				@click.native="switchRepository"
			/>
			<primaryButton
				text="Initalize git"
				margin-left=".5rem"
				@click.native="initalizeGit"
			/>
		</div>
	</div>
</template>

<script>
import primaryButton from '../buttons/primaryButton';
import gitInit from "../../git/init";

export default {
	name: "InitalizeGitRepository",
	components: {
		primaryButton
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		},
		isGitRepository() {
			return (this.$router.history.current.matched[0].path.slice(1) === "repository") && (this.currentRepository.isGit === false);
		}
	},
	methods: {
		switchRepository() {
			this.$store.commit("model/toggleModelPlaceholder");
			this.$store.dispatch("workspace/switchWorkspaceRepository");
			this.$router.push({ name: "welcome" });
		},
		initalizeGit() {
			gitInit(this.currentRepository.path);
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
</style>
