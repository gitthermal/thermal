<template>
	<div class="navbar">
		<div
			class="navbar__item"
			:class="getCommitFeature"
			@click="openCommitPage()"
		>
			<commitIcon />
			<p>Commit</p>
		</div>
		<div v-if="!!getRemoteUrl" class="navbar__group" :class="getRemoteFeature">
			<div class="navbar__item" @click="gitPull()">
				<pullIcon />
				<p>Pull</p>
			</div>
			<div class="navbar__item" @click="gitPush()">
				<pushIcon />
				<p>Push</p>
			</div>
			<div class="navbar__item">
				<fetchIcon />
				<p>Fetch</p>
			</div>
		</div>
		<div
			v-else
			:class="[
				getRemoteFeature,
				!!getRemoteUrl === false ? 'navbar__group' : ''
			]"
			class="navbar__item"
			@click="newRemote()"
		>
			<publishIcon />
			<p>Publish</p>
		</div>
		<div class="navbar__group ml-auto">
			<div class="navbar__item" @click="openTerminal()">
				<terminalIcon />
				<p>Terminal</p>
			</div>
			<div class="navbar__item" @click="openFileExplorer()">
				<folderIcon />
				<p>Explorer</p>
			</div>
			<div class="navbar__item" @click="openRepositorySettings()">
				<settingsIcon />
				<p>Settings</p>
			</div>
		</div>
		<div class="navbar__item" @click="switchRepository()">
			<switchRepositoryIcon />
			<p>Switch repo</p>
		</div>
	</div>
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
		switchRepositoryIcon
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
				this.$store.dispatch("model/showNewRemote");
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
	z-index: 8
	position: relative

	&__item
		flex-direction: column
		align-items: center
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

.navbar, .navbar__item, .navbar__group
	display: flex
</style>
