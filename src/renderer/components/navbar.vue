<template>
	<t-flexbox class="navbar">
		<t-flexbox
			flex-direction="column"
			align-items="center"
			class="navbar__item"
			:class="
				!!repositoryData.features.commit ? 'cursor-pointer' : 'opacity-5 cursor'
			"
			@click.native="openCommitPage()"
		>
			<commitIcon />
			<p>Commit</p>
		</t-flexbox>
		<t-flexbox
			v-if="!!repositoryData.remote"
			class="navbar__group"
			:class="
				!!repositoryData.features.remote ? 'cursor-pointer' : 'opacity-5 cursor'
			"
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
				!!repositoryData.features.remote
					? 'cursor-pointer'
					: 'opacity-5 cursor',
				!!repositoryData.remote === false ? 'navbar__group' : ''
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
import repositoryDataMixin from "../mixins/repositoryData";
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
	mixins: [repositoryDataMixin],
	methods: {
		openCommitPage(event) {
			if (this.repositoryData.features.commit) {
				this.$router.push({
					name: "projectWorkspace",
					params: {
						projectId: this.$router.params.projectId,
						branchName: this.$router.params.branchName
					}
				});
			} else {
				event.preventDefault();
			}
		},
		async gitPull(event) {
			if (this.repositoryData.features.remote) {
				let pull = await git(this.repositoryData.path).pull();
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
			if (this.repositoryData.features.remote) {
				let activeBranch = this.$route.params.branchName;
				await git(this.repositoryData.path).push([
					this.repositoryData.remote,
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
			if (this.repositoryData.features.remote) {
				this.$store.commit("modal/toggleNewRemoteModal", true);
			} else {
				event.preventDefault();
			}
		},
		openTerminal() {
			childProcess.exec("start cmd", { cwd: this.repositoryData.path });
		},
		openFileExplorer() {
			shell.openItem(this.repositoryData.path);
		},
		openRepositorySettings() {
			this.$router.push({
				name: "projectSettings",
				params: {
					projectId: this.$route.params.projectId
				}
			});
		},
		switchRepository() {
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
