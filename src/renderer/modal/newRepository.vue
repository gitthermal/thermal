<template>
	<t-card width="small">
		<t-card-header>
			<t-card-header-heading heading="Create a new repository" />
			<t-card-header-close modal-name="NewRepository" />
		</t-card-header>
		<t-card-body>
			<div style="width: 100%">
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
					/>
					<Button
						text="Select"
						appearance="primary"
						margin-left=".4rem"
						@click.native="$refs.folderSelector.click()"
					/>
				</div>
			</div>
		</t-card-body>
		<t-card-footer>
			<Button
				text="Cancel"
				appearance="outline"
				margin-left="auto"
				@click.native="closeModal('NewRepository')"
			/>
			<Button
				text="Create repository"
				appearance="primary"
				margin-left=".5rem"
				@click.native="createNewRepository"
			/>
		</t-card-footer>
	</t-card>
</template>

<script>
// components
import TCard from "../components/TCard/TCard";
import TCardHeader from "../components/TCard/TCardHeader";
import TCardHeaderHeading from "../components/TCard/TCardHeaderHeading";
import TCardHeaderClose from "../components/TCard/TCardHeaderClose";
import TCardBody from "../components/TCard/TCardBody";
import TCardFooter from "../components/TCard/TCardFooter";
import inputTextLabel from "../components/input/inputTextLabel";
import Button from "../components/buttons/Button";

// mixins
import closeModalMixin from "../mixins/closeModal";
import addRepository from "../mixins/addRepository";

import git from "simple-git/promise";
const fs = require("fs");

export default {
	name: "NewRepository",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardHeaderClose,
		TCardBody,
		TCardFooter,
		inputTextLabel,
		Button
	},
	mixins: [closeModalMixin, addRepository],
	data() {
		return {
			repositoryName: "",
			repositoryLocation: ""
		};
	},
	methods: {
		folderSelectorInput(event) {
			this.repositoryLocation = event.target.files[0].path
				.split("\\")
				.join("/");
		},
		createNewRepository() {
			const repositoryPath =
				this.repositoryLocation + "/" + this.repositoryName;
			if (!fs.existsSync(repositoryPath)) {
				fs.mkdirSync(repositoryPath);
			}
			this.gitInit(repositoryPath);
			this.closeModal("NewRepository");
			this.localRepository(repositoryPath);
		},
		async gitInit(path) {
			let initaliseRepository = git(path);
			await initaliseRepository.init();
		}
	}
};
</script>
