<template>
	<t-card width="small">
		<div v-if="!cloning">
			<t-card-header>
				<t-card-header-heading heading="Clone a repository" />
				<t-card-header-close modal-name="CloneRepository" />
			</t-card-header>
			<t-card-body style="flex-direction: column">
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
					/>
					<t-button
						margin-left=".4rem"
						@click.native="$refs.folderSelector.click()"
					>
						Select
					</t-button>
				</div>
			</t-card-body>
			<t-card-footer>
				<t-button
					:outline="true"
					margin-left="auto"
					@click.native="closeModal('CloneRepository')"
				>
					Cancel
				</t-button>
				<t-button margin-left=".5rem" @click.native="cloneRepository">
					Clone
				</t-button>
			</t-card-footer>
		</div>
		<div v-else class="clone__progress">
			<h1>Cloning the repository</h1>
			<progressBar :value="cloneProgress" margin-top="2rem" />
		</div>
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
import TButton from "../components/TButton/TButton";
import progressBar from "../components/progress/progressBar";

// mixins
import closeModalMixin from "../mixins/closeModal";
import addRepository from "../mixins/addRepository";
import gitClone from "../git/clone";

export default {
	name: "CloneRepository",
	components: {
		TCard,
		TCardHeader,
		TCardHeaderHeading,
		TCardHeaderClose,
		TCardBody,
		TCardFooter,
		inputTextLabel,
		TButton,
		progressBar
	},
	mixins: [closeModalMixin, addRepository],
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
			gitClone(this.remoteUrl, repositoryPath).then(result => {
				if (result) {
					this.cloning = false;
					this.closeModal("CloneRepository");
				}
				this.addRepository(repositoryPath);
			});
		},
		addRepository(path) {
			this.localRepository(path);
		}
	}
};
</script>

<style lang="sass" scoped>
.clone__progress
	padding: 3rem
	text-align: center
</style>
