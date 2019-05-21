<template>
	<div v-show="this.$store.state.model.model.newRemote" class="model--small">
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Add remote url
			</h6>
			<div class="model__header__close" @click="closeModel()">
				<closeIcon />
			</div>
		</div>
		<div class="model__section model__body flex-column">
			<inputText
				v-model="remoteUrl"
				v-focus
				name="remoteUrl"
				placeholder="Remote URL"
				@keyup.esc.native="closeModel"
				@keyup.enter.native="addRemoteUrl"
			/>
		</div>
		<div class="model__section model__footer">
			<Button
				margin-left="auto"
				text="Publish repository"
				appearance="primary"
				@click.native="addRemoteUrl()"
			/>
		</div>
	</div>
</template>

<script>
import inputText from "../input/inputText";
import closeIcon from "../icon/close";
import Button from "../buttons/Button";
import git from "simple-git/promise";

export default {
	name: "NewRemote",
	components: {
		inputText,
		closeIcon,
		Button
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
			remoteUrl: ""
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	methods: {
		closeModel() {
			this.$store.dispatch("model/showNewRemote");
		},
		async addRemoteUrl() {
			let status = await git(this.currentRepository.path).status();
			console.log("Pushing changes...");
			await git(this.currentRepository.path).push([
				this.remoteUrl,
				status.current
			]);
			let addRemote = await git(this.currentRepository.path).addRemote(
				"origin",
				this.remoteUrl
			);
			try {
				console.log("Adding remote url to origin");
				console.log(addRemote);
				this.$store.commit({
					type: "repository/localRepositoryRemote",
					remote: this.remoteUrl
				});
				this.closeModel();
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>

<style lang="sass"></style>
