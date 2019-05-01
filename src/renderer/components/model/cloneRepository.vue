<template>
	<div
		v-show="this.$store.state.model.model.cloneRepository"
		class="model--medium"
	>
		<div v-if="!cloning">
			<div class="model__section model__header">
				<h6 class="model__header__title">
					Clone a repository
				</h6>
				<div
					class="model__header__close"
					@click="closeModel"
				>
					<closeIcon />
				</div>
			</div>
			<div class="model__section model__body flex-column">
				<inputTextLabel
					v-model="repositoryName"
					name="repositoryName"
					label="Name"
					placeholder="Name of repository"
					margin-bottom=".8rem"
				/>
				<inputTextLabel
					v-model="remoteUrl"
					name="remoteUrl"
					label="Remote url"
					placeholder="Paste remote url"
					margin-bottom=".8rem"
				/>
				<div style="display: flex; align-items: flex-end">
					<inputTextLabel
						v-model="repositoryLocation"
						name="repositoryLocation"
						label="Path"
						placeholder="Repository path"
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
					text="Clone"
					appearance="primary"
					@click.native="cloneRepository"
				/>
				<Button
					text="Cancel"
					appearance="outline"
					margin-left=".5rem"
					@click.native="closeModel"
				/>
			</div>
		</div>
		<div
			v-else
			class="clone__progress"
		>
			<h1>Cloning the repository</h1>
			<progressBar
				:value="cloneProgress"
				margin-top="2rem"
			/>
		</div>
	</div>
</template>

<script>
import inputTextLabel from "../input/inputTextLabel";
import closeIcon from "../icon/close";
import Button from "../buttons/Button";
import progressBar from "../progress/progressBar";
import gitClone from "../../git/clone";
import addRepository from "../../mixins/addRepository";

export default {
	name: "CloneRepository",
	components: {
		inputTextLabel,
		Button,
		progressBar,
		closeIcon
	},
	mixins: [addRepository],
	data() {
		return {
			repositoryName: "",
			remoteUrl: "",
			repositoryLocation: "",
			cloning: false,
			cloneProgress: 0
		};
	},
	methods: {
		folderSelectorInput() {
			this.repositoryLocation = event.target.files[0].path
				.split("\\")
				.join("/");
		},
		cloneRepository() {
			const repositoryPath =
				this.repositoryLocation + "/" + this.repositoryName;
			this.cloning = true;
			gitClone(this.remoteUrl, repositoryPath)
			.then(result => {
				if (result) {
					this.cloning = false;
					this.closeModel();
				}
				this.addRepository(repositoryPath);
			});
		},
		addRepository(path) {
			this.localRepository(path);
		},
		closeModel() {
			this.$store.dispatch("model/showCloneRepository");
		}
	}
};
</script>

<style lang='sass' scoped>
.clone__progress
	padding: 3rem
	text-align: center
</style>
