<template>
	<t-flexbox class="navbar">
		<t-flexbox
			flex-direction="column"
			align-items="center"
			class="navbar__item"
			:class="getCommitFeature"
			@click.native="openCommitPage()"
		>
			<commitIcon />
			<p>Commit</p>
		</t-flexbox>
		<t-flexbox
			v-if="!!getRemoteUrl"
			class="navbar__group"
			:class="getRemoteFeature"
		>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="gitPull()"
			>
				<pullIcon />
				<p>Pull</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="gitPush()"
			>
				<pushIcon />
				<p>Push</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
			>
				<fetchIcon />
				<p>Fetch</p>
			</t-flexbox>
		</t-flexbox>
		<t-flexbox
			v-else
			flex-direction="column"
			align-items="center"
			:class="[
				getRemoteFeature,
				!!getRemoteUrl === false ? 'navbar__group' : ''
			]"
			class="navbar__item"
			@click.native="newRemote()"
		>
			<publishIcon />
			<p>Publish</p>
		</t-flexbox>
		<t-flexbox class="navbar__group ml-auto">
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="openTerminal()"
			>
				<terminalIcon />
				<p>Terminal</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="openFileExplorer()"
			>
				<folderIcon />
				<p>Explorer</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="openRepositorySettings()"
			>
				<settingsIcon />
				<p>Settings</p>
			</t-flexbox>
		</t-flexbox>
		<t-flexbox
			flex-direction="column"
			align-items="center"
			class="navbar__item"
			@click.native="switchRepository()"
		>
			<switchRepositoryIcon />
			<p>Switch repo</p>
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import git from "simple-git/promise";
import commitIcon from "./icon/commit";
import pushIcon from "./icon/push";
import pullIcon from "./icon/pull";
import fetchIcon from "./icon/fetch";
import publishIcon from "./icon/publish";
import terminalIcon from "./icon/terminal";
import folderIcon from "./icon/folder";
import settingsIcon from "./icon/settings";
import switchRepositoryIcon from "./icon/switch";
import TFlexbox from "../components/TLayouts/TFlexbox";
const { shell } = require("electron");
const childProcess = require("child_process");

export default {
	name: "Navbar",
	components: {
		commitIcon,
		pushIcon,
		pullIcon,
		fetchIcon,
		publishIcon,
		terminalIcon,
		folderIcon,
		settingsIcon,
		switchRepositoryIcon,
		TFlexbox
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		},
		getRemoteUrl() {
			return this.currentRepository.remote;
		},
		getCommitFeature() {
			if (!this.currentRepository.features.commit) {
				return "opacity-5 cursor";
			} else {
				return "cursor-pointer";
			}
		},
		getRemoteFeature() {
			if (!this.currentRepository.features.remote) {
				return "opacity-5 cursor";
			} else {
				return "cursor-pointer";
			}
		}
	},
	methods: {
		openCommitPage(event) {
			if (this.currentRepository.features.commit) {
				this.$router.push({ name: "repositoryWorkspace" });
			} else {
				event.preventDefault();
			}
		},
		async gitPull(event) {
			if (this.currentRepository.features.remote) {
				let pull = await git(this.currentRepository.path).pull();
				try {
					console.log(pull);
				} catch (error) {
					console.log(error);
				}
			} else {
				event.preventDefault();
			}
		},
		async gitPush(event) {
			if (this.currentRepository.features.remote) {
				let activeBranch = this.$store.state.commit.activeBranch;
				await git(this.currentRepository.path).push([
					this.currentRepository.remote,
					activeBranch
				]);
				try {
					console.log("Push changes to remote repository");
				} catch (error) {
					console.log(error);
				}
			} else {
				event.preventDefault();
			}
		},
		newRemote(event) {
			if (this.currentRepository.features.remote) {
				this.$store.commit("modal/toggleNewRemoteModal", true);
			} else {
				event.preventDefault();
			}
		},
		openTerminal() {
			childProcess.exec("start cmd", { cwd: this.currentRepository.path });
		},
		openFileExplorer() {
			shell.openItem(this.currentRepository.path);
		},
		openRepositorySettings() {
			this.$router.push({ name: "repositorySettings" });
		},
		switchRepository() {
			this.$store.dispatch("workspace/switchWorkspaceRepository");
			this.$router.push({ name: "welcome" });
			this.$store.commit({
				type: "history/updateLogs",
				logs: []
			});
			this.$store.commit({
				type: "commit/files",
				files: []
			});
		}
	}
};
</script>

<style lang="sass">
.navbar
	background-color: #EFEFEF
	border-bottom: 1px solid #DEE0E3
	padding: 12px 20px
	z-index: 2
	position: relative

	&__item
		user-select: none

		&:hover
			cursor: pointer

		svg
			width: 20px
			height: 20px
			stroke: #A1A5AC
			margin-bottom: 5px

		p
			color: #7A7D84
			font-size: 12px

	&__group
		padding-left: 30px
		padding-right: 30px

		.navbar__item
			&:not(:last-child)
				margin-right: 15px
</style>
