<template>
	<t-flexbox class="navbar">
		<t-flexbox
			flex-direction="column"
			align-items="center"
			class="navbar__item"
			:class="
				!!repositoryData.commitFeature ? 'cursor-pointer' : 'opacity-5 cursor'
			"
			@click.native="openCommitPage"
		>
			<commitIcon />
			<p>Commit</p>
		</t-flexbox>
		<t-flexbox
			v-if="repositoryData.remoteUrl"
			class="navbar__group"
			:class="
				!!repositoryData.remoteFeature ? 'cursor-pointer' : 'opacity-5 cursor'
			"
		>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="gitPull"
			>
				<pullIcon />
				<p>Pull</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="gitPush"
			>
				<pushIcon />
				<p>Push</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="gitFetch"
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
				!!repositoryData.remoteFeature ? 'cursor-pointer' : 'opacity-5 cursor',
				!!repositoryData.remoteUrl === false ? 'navbar__group' : ''
			]"
			class="navbar__item"
			@click.native="newRemote"
		>
			<publishIcon />
			<p>Publish</p>
		</t-flexbox>
		<t-flexbox class="navbar__group ml-auto">
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="openCmdTerminal"
			>
				<terminalIcon />
				<p>Terminal</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="openFileExplorer"
			>
				<folderIcon />
				<p>Explorer</p>
			</t-flexbox>
			<t-flexbox
				flex-direction="column"
				align-items="center"
				class="navbar__item"
				@click.native="openRepositorySettings"
			>
				<settingsIcon />
				<p>Settings</p>
			</t-flexbox>
		</t-flexbox>
		<t-flexbox
			flex-direction="column"
			align-items="center"
			class="navbar__item"
			@click.native="switchRepository"
		>
			<switchRepositoryIcon />
			<p>Switch repo</p>
		</t-flexbox>
	</t-flexbox>
</template>

<script>
// components
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

// mixins
import repositoryData from "../mixins/repositoryData";
import { pullRemoteBranch } from "../git/pull";
import { fetch } from "../git/fetch";

// modules
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
	mixins: [repositoryData],
	methods: {
		openCommitPage() {
			if (this.repositoryData.commitFeature) {
				this.$router.push({
					name: "projectWorkspace",
					params: {
						repositoryId: this.$router.params.repositoryId
					}
				});
			}
		},
		async gitPull() {
			if (this.repositoryData.remoteFeature) {
				try {
					await pullRemoteBranch(this.repositoryData.directoryPath);
				} catch (error) {
					console.log(error);
				}
			}
		},
		async gitPush() {
			if (this.repositoryData.remoteFeature) {
				try {
					console.log("Push changes to remote repository");
				} catch (error) {
					console.log(error);
				}
			}
		},
		async gitFetch() {
			if (this.repositoryData.remoteFeature) {
				await fetch(this.repositoryData.directoryPath, "origin");
			}
		},
		newRemote() {
			if (this.repositoryData.remoteFeature) {
				this.$store.commit("modal/toggleNewRemoteModal", true);
			}
		},
		openCmdTerminal() {
			childProcess.exec("start cmd", {
				cwd: this.repositoryData.directoryPath
			});
		},
		openFileExplorer() {
			shell.openItem(this.repositoryData.directoryPath);
		},
		openRepositorySettings() {
			this.$router.push({
				name: "projectSettings",
				params: {
					repositoryId: this.repositoryData.repositoryId
				}
			});
		},
		switchRepository() {
			this.$store.commit("modal/toggleSwitchRepositoryModal", true);
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
