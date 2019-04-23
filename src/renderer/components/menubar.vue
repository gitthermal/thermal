<template>
	<div class="menubar d-flex">
		<div
			class="menubar__logo d-flex"
			@click="homepage()"
		>
			<thermalLogo />
		</div>
		<div class="menubar__list d-flex align-items-center">
			<div @click="fileDropdown()">
				<div class="menubar__list__item">
					File
				</div>
				<div
					v-show="menu.file.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave="fileDropdown()"
				>
					<div
						class="menubar__list__item__dropdown__item"
						@click="newRepository()"
					>
						New repository
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="addLocalRepository()"
					>
						Add local repository
					</div>
					<div class="menubar__list__item__dropdown__item">
						Clone repository
					</div>
					<div
						v-if="!!currentRepository"
						class="menubar__list__item__dropdown__item"
						@click="switchRepository()"
					>
						Switch repository
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="appOptions()"
					>
						Options
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="exitApp()"
					>
						Exit
					</div>
				</div>
			</div>
			<div @click="viewDropdown()">
				<div class="menubar__list__item">
					View
				</div>
				<div
					v-show="menu.view.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave="viewDropdown()"
				>
					<div class="menubar__list__item__dropdown__item">
						Changes
					</div>
					<div class="menubar__list__item__dropdown__item">
						History
					</div>
					<div class="menubar__list__item__dropdown__item">
						Repository list
					</div>
					<div class="menubar__list__item__dropdown__item">
						Branches list
					</div>
					<div class="menubar__list__item__dropdown__item">
						Go to summary
					</div>
					<div 
						class="menubar__list__item__dropdown__item"
						@click="fullScreenView()"
					>
						Toggle full screen
					</div>
					<div class="menubar__list__item__dropdown__item">
						Reset zoom
					</div>
					<div class="menubar__list__item__dropdown__item">
						Zoom in
					</div>
					<div class="menubar__list__item__dropdown__item">
						Zoom out
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="openDevTools()"
					>
						Toggle developer tools
					</div>
				</div>
			</div>
			<div 
				v-if="!!currentRepository"
				@click="repositoryDropdown()"
			>
				<div class="menubar__list__item">
					Repository
				</div>
				<div
					v-show="menu.repository.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave="repositoryDropdown()"
				>
					<div class="menubar__list__item__dropdown__item">
						Push
					</div>
					<div class="menubar__list__item__dropdown__item">
						Pull
					</div>
					<div class="menubar__list__item__dropdown__item">
						Remove
					</div>
					<div class="menubar__list__item__dropdown__item">
						View on GitHub
					</div>
					<div class="menubar__list__item__dropdown__item">
						Open in PowerShell
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="openFileExplorer()"
					>
						Show in Explorer
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="openEditor()"
					>
						Open in Code editor
					</div>
					<div class="menubar__list__item__dropdown__item">
						Repository settings
					</div>
				</div>
			</div>
			<div
				v-if="!!currentRepository"
				@click="branchDropdown()"
			>
				<div class="menubar__list__item">
					Branch
				</div>
				<div
					v-show="menu.branch.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave="branchDropdown()"
				>
					<div class="menubar__list__item__dropdown__item">
						New branch
					</div>
					<div class="menubar__list__item__dropdown__item">
						Rename branch
					</div>
					<div class="menubar__list__item__dropdown__item">
						Delete branch
					</div>
					<div class="menubar__list__item__dropdown__item">
						Update to master
					</div>
					<div class="menubar__list__item__dropdown__item">
						Compare to master
					</div>
					<div class="menubar__list__item__dropdown__item">
						Merge into current branch
					</div>
					<div class="menubar__list__item__dropdown__item">
						Compare on GitHub
					</div>
					<div class="menubar__list__item__dropdown__item">
						Create pull request
					</div>
				</div>
			</div>
			<div @click="helpDropdown()">
				<div class="menubar__list__item">
					Help
				</div>
				<div
					v-show="menu.help.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave="helpDropdown()"
				>
					<div
						class="menubar__list__item__dropdown__item"
						@click="switchRepository()"
					>
						Welcome
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="reportIssue()"
					>
						Report issue
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="contactSupport()"
					>
						Contact support
					</div>
					<div class="menubar__list__item__dropdown__item">
						Show User Guides
					</div>
					<div class="menubar__list__item__dropdown__item">
						Show logs in Explorer
					</div>
					<div
						class="menubar__list__item__dropdown__item"
						@click="about()"
					>
						About
					</div>
				</div>
			</div>
		</div>
		<div class="menubar__drag" />
		<div class="menubar__title">
			<div
				v-if="!!currentRepository"
				class="menubar__title__repository d-flex"
			>
				{{ currentRepository.name }}
				<div style="padding: 0 5px">
					-
				</div>
			</div>
			<div class="menubar__title__app">
				Thermal
			</div>
		</div>
		<div class="menubar__controles">
			<windowsButton />
		</div>
	</div>
</template>

<script>
import thermalLogo from "./icon/logo";
import windowsButton from "./windowsButton";
const { shell, remote } = require("electron");
const childProcess = require("child_process");
const win = remote.getCurrentWindow();

export default {
	name: "Menubar",
	components: {
		thermalLogo,
		windowsButton
	},
	data() {
		return {
			menu: {
				file: {
					name: "File",
					isActive: false
				},
				view: {
					name: "View",
					isActive: false
				},
				repository: {
					name: "Repository",
					isActive: false
				},
				branch: {
					name: "Branch",
					isActive: false
				},
				help: {
					name: "Help",
					isActive: false
				}
			}
		};
	},
	computed: {
		currentRepository() {
			return this.$store.getters["workspace/currentRepository"];
		}
	},
	methods: {
		homepage() {
			this.$router.push({ name: "welcome" });
		},
		fileDropdown() {
			this.menu.file.isActive = !this.menu.file.isActive;
		},
		viewDropdown() {
			this.menu.view.isActive = !this.menu.view.isActive;
		},
		repositoryDropdown() {
			this.menu.repository.isActive = !this.menu.repository.isActive;
		},
		branchDropdown() {
			this.menu.branch.isActive = !this.menu.branch.isActive;
		},
		helpDropdown() {
			this.menu.help.isActive = !this.menu.help.isActive;
		},
		// File
		newRepository() {
			this.$store.dispatch("model/showNewRepository");
		},
		addLocalRepository() {
			this.$store.dispatch("model/showAddLocalRepositoryModel");
		},
		switchRepository() {
			this.$store.dispatch("workspace/switchWorkspaceRepository");
			this.$router.push({ name: "welcome" });
		},
		appOptions() {
			this.$router.push({ name: "profileSettings" });
		},
		exitApp() {
			remote.getCurrentWindow().close();
		},
		// View
		fullScreenView() {
			if (!win.isMaximized()) {
				win.maximize();
			} else {
				win.unmaximize();
			}
		},
		openDevTools() {
			let currentWindow = remote.getCurrentWindow();
			currentWindow.openDevTools();
		},
		// Repository
		openFileExplorer() {
			shell.openItem(this.currentRepository.path);
		},
		openEditor() {
			childProcess.exec("code .", { cwd: this.currentRepository.path });
		},
		// Branch
		// Help
		reportIssue() {
			shell.openExternal("https://thermal.netlify.com/issue/");
		},
		contactSupport() {
			shell.openExternal("https://discord.gg/f5mYum8");
		},
		about() {
			this.$store.dispatch("model/showAboutModel");
		}
	}
};
</script>

<style lang="sass">
.menubar
	width: 100%
	background-color: white
	position: relative
	z-index: 10
	border-bottom: 1px solid #DEE0E3

	&__drag
		width: 100%
		-webkit-app-region: drag

	&__logo
		padding: 8px 10px
		cursor: pointer

		svg
			width: 20px
			height: 20px

	&__list
		padding: 8px 10px

		&__item
			color: #8B9798
			cursor: pointer
			font-size: .8rem
			user-select: none

			&:not(:last-child)
				margin-right: 1rem

			&:hover
				color: #222831

			&__dropdown
				top: 32px
				position: absolute
				background-color: white
				border-radius: 3px
				box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px
				display: flex
				font-size: .8rem
				flex-direction: column
				z-index: 10

				&__item
					cursor: pointer
					padding: 8px 15px
					user-select: none

					&:hover
						background-color: rgba(139, 151, 152, .1)

	&__title
		position: absolute
		display: flex
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)
		font-size: 14px

	&__controles
		margin-left: auto
</style>
