<template>
	<t-flexbox class="menubar">
		<t-flexbox class="menubar__logo" @click.native="homepage()">
			<thermalLogo />
		</t-flexbox>
		<t-flexbox align-items="center" class="menubar__list">
			<!-- File -->
			<div @click="dropdown('file', true)">
				<div class="menubar__list__item">
					File
				</div>
				<dropdown-list
					v-if="menu.file.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave.native="dropdown('file', false)"
				>
					<dropdown-item @click.native="selectRepository()">
						Select repository
					</dropdown-item>
					<dropdown-item @click.native="newRepository()">
						New repository
					</dropdown-item>
					<dropdown-item @click.native="addLocalRepository()">
						Add local repository
					</dropdown-item>
					<dropdown-item @click.native="cloneRepository">
						Clone repository
					</dropdown-item>
					<dropdown-item
						v-if="repositoryRoute"
						@click.native="switchRepository()"
					>
						Switch repository
					</dropdown-item>
					<dropdown-divider />
					<dropdown-item @click.native="appOptions()">
						Options
					</dropdown-item>
					<dropdown-item @click.native="exitApp()">
						Exit
					</dropdown-item>
				</dropdown-list>
			</div>
			<!-- View -->
			<div @click="dropdown('view', true)">
				<div class="menubar__list__item">
					View
				</div>
				<dropdown-list
					v-if="menu.view.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave.native="dropdown('view', false)"
				>
					<!-- <dropdown-item>
						Changes
					</dropdown-item>
					<dropdown-item>
						History
					</dropdown-item>
					<dropdown-item>
						Repository list
					</dropdown-item>
					<dropdown-item>
						Branches list
					</dropdown-item>
					<dropdown-item>
						Go to summary
					</dropdown-item> -->
					<dropdown-item @click.native="gitCommands()">
						Git commands
					</dropdown-item>
					<dropdown-divider />
					<dropdown-item @click.native="fullScreenView()">
						Toggle full screen
					</dropdown-item>
					<!-- <dropdown-item>
						Reset zoom
					</dropdown-item>
					<dropdown-item>
						Zoom in
					</dropdown-item>
					<dropdown-item>
						Zoom out
					</dropdown-item> -->
					<dropdown-item @click.native="openDevTools()">
						Toggle developer tools
					</dropdown-item>
				</dropdown-list>
			</div>
			<!-- Repository -->
			<div v-if="repositoryRoute" @click="dropdown('repository', true)">
				<div class="menubar__list__item">
					Repository
				</div>
				<dropdown-list
					v-if="menu.repository.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave.native="dropdown('repository', false)"
				>
					<!-- <dropdown-item>
						Push
					</dropdown-item>
					<dropdown-item>
						Pull
					</dropdown-item>
					<dropdown-item>
						Remove
					</dropdown-item>
					<dropdown-divider /> -->
					<dropdown-item>
						View on GitHub
					</dropdown-item>
					<dropdown-item>
						Open in PowerShell
					</dropdown-item>
					<dropdown-item @click.native="openFileExplorer">
						Show in Explorer
					</dropdown-item>
					<dropdown-item @click.native="openEditor">
						Open in Code editor
					</dropdown-item>
					<dropdown-divider />
					<dropdown-item @click.native="openRepositorySettings">
						Repository settings
					</dropdown-item>
				</dropdown-list>
			</div>
			<!-- Branch -->
			<div v-if="repositoryRoute" @click="dropdown('branch', true)">
				<div class="menubar__list__item">
					Branch
				</div>
				<dropdown-list
					v-if="menu.branch.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave.native="dropdown('branch', false)"
				>
					<dropdown-item>
						New branch
					</dropdown-item>
					<dropdown-item>
						Rename branch
					</dropdown-item>
					<dropdown-item>
						Delete branch
					</dropdown-item>
					<dropdown-divider />
					<dropdown-item>
						Update to master
					</dropdown-item>
					<dropdown-item>
						Compare to master
					</dropdown-item>
					<dropdown-item>
						Merge into current branch
					</dropdown-item>
					<dropdown-item>
						Compare on GitHub
					</dropdown-item>
					<dropdown-item>
						Create pull request
					</dropdown-item>
				</dropdown-list>
			</div>
			<!-- Help -->
			<div @click="dropdown('help', true)">
				<div class="menubar__list__item">
					Help
				</div>
				<dropdown-list
					v-if="menu.help.isActive"
					class="menubar__list__item__dropdown"
					@mouseleave.native="dropdown('help', false)"
				>
					<dropdown-item @click.native="switchRepository()">
						Welcome
					</dropdown-item>
					<dropdown-item @click.native="reportIssue()">
						Report issue
					</dropdown-item>
					<dropdown-item @click.native="contactSupport()">
						Contact support
					</dropdown-item>
					<dropdown-divider />
					<dropdown-item>
						Show User Guides
					</dropdown-item>
					<dropdown-item>
						Show logs in Explorer
					</dropdown-item>
					<dropdown-item @click.native="about()">
						About
					</dropdown-item>
				</dropdown-list>
			</div>
		</t-flexbox>
		<div class="menubar__drag" />
		<t-flexbox class="menubar__title">
			<t-flexbox v-if="repositoryRoute">
				{{ repositoryData.name }}
				<div style="padding: 0 5px">
					-
				</div>
			</t-flexbox>
			<div>
				Thermal
			</div>
		</t-flexbox>
		<windowsButton />
	</t-flexbox>
</template>

<script>
import thermalLogo from "./icon/logo";
import dropdownList from "./dropdown/dropdownList";
import dropdownItem from "./dropdown/dropdownItem";
import dropdownDivider from "./dropdown/dropdownDivider";
import windowsButton from "./windowsButton";
import repositoryDataMixin from "../mixins/repositoryData";
import TFlexbox from "../components/TLayouts/TFlexbox";
const { shell, remote } = require("electron");
const childProcess = require("child_process");
const win = remote.getCurrentWindow();

export default {
	name: "Menubar",
	components: {
		thermalLogo,
		dropdownList,
		dropdownItem,
		dropdownDivider,
		windowsButton,
		TFlexbox
	},
	mixins: [repositoryDataMixin],
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
		repositoryRoute() {
			return this.$route.path.startsWith("/repository");
		}
	},
	methods: {
		homepage() {
			this.$router.push({ name: "welcome" });
		},
		dropdown(type, status) {
			this.menu.file.isActive = false;
			this.menu.view.isActive = false;
			this.menu.repository.isActive = false;
			this.menu.branch.isActive = false;
			this.menu.help.isActive = false;
			switch (type) {
				case "file":
					this.menu.file.isActive = status;
					break;
				case "view":
					this.menu.view.isActive = status;
					break;
				case "repository":
					this.menu.repository.isActive = status;
					break;
				case "branch":
					this.menu.branch.isActive = status;
					break;
				case "help":
					this.menu.help.isActive = status;
					break;
			}
		},
		// File
		selectRepository() {
			this.$store.commit("modal/toggleSelectRepositoryModal", true);
		},
		newRepository() {
			this.$store.commit("modal/toggleNewRepositoryModal", true);
		},
		addLocalRepository() {
			this.$store.commit("modal/toggleAddLocalRepositoryModal", true);
		},
		cloneRepository() {
			this.$store.commit("modal/toggleCloneRepositoryModal", true);
		},
		switchRepository() {
			this.$router.push({ name: "welcome" });
		},
		appOptions() {
			this.$router.push({ name: "profileSettings" });
		},
		exitApp() {
			remote.getCurrentWindow().close();
		},
		// View
		gitCommands() {
			this.$router.push({ name: "gitCommands" });
		},
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
			shell.openItem(this.repositoryData.path);
		},
		openEditor() {
			childProcess.exec("code .", { cwd: this.repositoryData.path });
		},
		openRepositorySettings() {
			this.$router.push({
				name: "projectSettings",
				params: {
					projectId: this.$route.params.projectId,
					branchName: this.$route.params.branchName
				}
			});
		},
		// Branch
		// Help
		reportIssue() {
			shell.openExternal(
				"https://github.com/gitthermal/thermal/issues/new?assignees=&labels=🐞+Bug&template=bug_report.md"
			);
		},
		contactSupport() {
			shell.openExternal("https://discord.gg/f5mYum8");
		},
		about() {
			this.$store.commit("modal/toggleAboutModal", true);
		}
	}
};
</script>

<style lang="sass">
.menubar
	background-color: white
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
		&__item
			padding: 10px
			color: #8B9798
			cursor: pointer
			font-size: .8rem
			user-select: none

			&:hover
				color: #222831

			&__dropdown
				top: 32px

	&__title
		position: absolute
		left: 50%
		top: 10px
		transform: translate(-50%)
		font-size: 14px
</style>
