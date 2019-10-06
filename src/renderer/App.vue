<template>
	<div id="app">
		<menubar />
		<router-view style="height: 100%" />
		<t-modal v-if="activeModal">
			<components :is="modal"></components>
		</t-modal>
		<div class="help__widget-icon" @click="toggleHelpWidget">
			?
		</div>
		<dropdown-list v-if="helpWidget" class="help__widget-dropdown">
			<dropdown-item @click.native="websiteUrl">
				Website 💻
			</dropdown-item>
			<dropdown-item @click.native="twitterUrl">
				Twitter 🐤
			</dropdown-item>
			<dropdown-item @click.native="docsUrl">
				Documentation 📚
			</dropdown-item>
			<dropdown-item @click.native="buyMeACoffeeUrl">
				Buy me a Coffee ☕
			</dropdown-item>
			<dropdown-item @click.native="chatWithUs">
				Chat with Us 💬
			</dropdown-item>
			<dropdown-divider />
			<dropdown-item @click.native="reportIssue">
				Report a bug 🐛
			</dropdown-item>
			<dropdown-divider />
			<div class="help__widget-version">
				{{ appVersion }}
			</div>
		</dropdown-list>
		<div v-if="activeModal" class="t-overlay"></div>
	</div>
</template>

<script>
// components
import menubar from "./components/menubar";
import TModal from "./components/TModal/TModal";
import * as Sentry from "@sentry/electron";

// modals
import newRepository from "./modal/newRepository";
import addLocalRepository from "./modal/addLocalRepository";
import about from "./modal/about";
import exportCommitData from "./modal/exportCommitData";
import newRemote from "./modal/newRemote";
import initializeGitRepository from "./modal/initializeGitRepository";
import cloneRepository from "./modal/cloneRepository";
import selectRepository from "./modal/selectRepository";

// help widget
import packageJson from "../../package.json";
import DropdownList from "./components/dropdown/dropdownList";
import DropdownItem from "./components/dropdown/dropdownItem";
import DropdownDivider from "./components/dropdown/dropdownDivider";
const { shell } = require("electron");

Sentry.configureScope(scope => {
	scope.setTag("appVersion", this.appVersion);
});

export default {
	name: "App",
	components: {
		menubar,
		TModal,
		newRepository,
		addLocalRepository,
		about,
		exportCommitData,
		newRemote,
		initializeGitRepository,
		cloneRepository,
		selectRepository,
		DropdownList,
		DropdownItem,
		DropdownDivider
	},
	data() {
		return {
			helpWidget: false
		};
	},
	computed: {
		modal() {
			let modalsActiveStatus = Object.values(this.$store.state.modal);
			let ModalNames = Object.keys(this.$store.state.modal);
			let activeModal = modalsActiveStatus.findIndex(result => {
				return result === true;
			});
			if (ModalNames[activeModal] !== "") {
				return ModalNames[activeModal];
			} else {
				return "";
			}
		},
		activeModal() {
			if (this.modal === undefined) {
				return false;
			} else {
				return true;
			}
		},
		appVersion() {
			return `Version: ${packageJson.version}`;
		}
	},
	beforeCreate() {
		this.$store.commit("repository/getRepositoryList");
		this.$store.commit("settings/getSettingsList");
	},
	methods: {
		websiteUrl() {
			shell.openExternal(
				"https://thermal.codecarrot.net/?utm_source=electron&utm_medium=help_widget"
			);
			this.toggleHelpWidget();
		},
		twitterUrl() {
			shell.openExternal("https://twitter.com/gitthermal/");
			this.toggleHelpWidget();
		},
		docsUrl() {
			shell.openExternal(
				"https://thermal.codecarrot.net/docs/?utm_source=electron&utm_medium=help_widget"
			);
			this.toggleHelpWidget();
		},
		buyMeACoffeeUrl() {
			shell.openExternal("https://www.buymeacoffee.com/mittalyashu");
			this.toggleHelpWidget();
		},
		chatWithUs() {
			shell.openExternal("https://discord.gg/DcSNmts");
			this.toggleHelpWidget();
		},
		reportIssue() {
			shell.openExternal(
				"https://github.com/gitthermal/thermal/issues/new?assignees=&labels=🐞+Bug&template=bug_report.md"
			);
			this.toggleHelpWidget();
		},
		toggleHelpWidget() {
			this.helpWidget = !this.helpWidget;
		}
	}
};
</script>

<style lang="sass">
html, body, #app
	width: 100%
	height: 100%

.help__widget
	&-icon
		position: absolute
		bottom: 16px
		right: 16px
		box-shadow: rgba(#dddddd, 0.5) 0px 0px 0px 1px, rgba(#dddddd, 0.5) 0px 2px 4px
		cursor: pointer
		user-select: none
		padding: 6px 12px
		transition: opacity 700ms ease 0s, color 700ms ease 0s
		border-radius: 50px

	&-dropdown
		bottom: 60px
		right: 16px

	&-version
		color: rgba(55, 53, 47, 0.4)
		font-size: 12px
		padding: 6px 15px

.t-overlay
	position: fixed
	top: 0
	bottom: 0
	left: 0
	right: 0
	background-color: rgba(0, 0, 0, .4)
	z-index: 4
</style>
