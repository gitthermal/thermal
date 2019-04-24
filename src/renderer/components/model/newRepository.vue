<template>
	<div
		v-show="this.$store.state.model.model.newRepository"
		class="model--small"
	>
		<div class="model__section model__header">
			<h6 class="model__header__title">
				Create a new repository
			</h6>
			<div
				class="model__header__close"
				@click="closeModel()"
			>
				<closeIcon />
			</div>
		</div>
		<div class="model__section model__body flex-column">
			<inputTextLabel
				v-model="repositoryName"
				name="name"
				label="Name"
				placeholder="Repository name"
				margin-bottom=".8rem"
			/>
			<div style="display: flex; align-items: flex-end">
				<inputTextLabel
					v-model="repositoryLocation"
					name="repositoryLocation"
					label="Path"
					placeholder="Path to local repostiory"
					style="flex-grow: 2"
				/>
				<input
					ref="folderSelector"
					type="file"
					name="folderSelector"
					webkitdirectory
					style="display: none"
					@change="folderSelectorInput"
				>
				<Button
					text="Select"
					appearance="primary"
					margin-left=".4rem"
					@click.native="$refs.folderSelector.click()"
				/>
			</div>
		</div>
		<div class="model__section model__footer">
			<Button
				margin-left="auto"
				text="Create repository"
				appearance="primary"
				@click.native="createNewRepository"
			/>
			<Button
				text="Cancel"
				appearance="outline"
				margin-left=".5rem"
				@click.native="closeModel()"
			/>
		</div>
	</div>
</template>

<script>
import inputTextLabel from "../input/inputTextLabel";
import closeIcon from "../icon/close";
import Button from "../buttons/Button";
import git from "simple-git/promise";
import addRepository from "../../mixins/addRepository";
const fs = require('fs');

export default {
	name: "NewRepository",
	components: {
		inputTextLabel,
		closeIcon,
		Button
	},
	mixins: [addRepository],
	data() {
		return {
			repositoryName: "",
			repositoryLocation: ""
		};
	},
	methods: {
		folderSelectorInput(event) {
			this.repositoryLocation = event.target.files[0].path.split("\\").join("/");
		},
		createNewRepository() {
			const repositoryPath = this.repositoryLocation + '/' + this.repositoryName;
			if (!fs.existsSync(repositoryPath)) {
				fs.mkdirSync(repositoryPath);
			}
			this.gitInit(repositoryPath);
			this.$store.dispatch("model/showNewRepository");
			this.localRepository(repositoryPath);
		},
		async gitInit(path) {
			let initaliseRepository = git(path);
			await initaliseRepository.init();
		},
		closeModel() {
			this.$store.dispatch("model/showNewRepository");
		}
	}
};
</script>

<style lang='sass'>

</style>
