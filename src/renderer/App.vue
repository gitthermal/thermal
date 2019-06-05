<template>
	<div id="app">
		<menubar />
		<router-view />
		<div v-if="this.$store.state.model.isActive" class="model__placeholder">
			<div class="model__container">
				<newRepository />
				<addLocalRepository />
				<about />
				<exportCommitData />
				<newRemote />
				<initalizeGitRepository />
				<cloneRepository />
			</div>
		</div>
		<div class="help__widget-icon" @click="toggleHelpWidget">
			?
		</div>
		<dropdown-list v-show="helpWidget" class="help__widget-dropdown">
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
	</div>
</template>

<script>
import menubar from "./components/menubar";
import newRepository from "./components/model/newRepository";
import addLocalRepository from "./components/model/addLocalRepository";
import about from "./components/model/about";
import exportCommitData from "./components/model/exportCommitData";
import newRemote from "./components/model/newRemote";
import initalizeGitRepository from "./components/model/initalizeGitRepository";
import cloneRepository from "./components/model/cloneRepository";
import packageJson from "../../package.json";
import DropdownList from "./components/dropdown/dropdownList";
import DropdownItem from "./components/dropdown/dropdownItem";
import DropdownDivider from "./components/dropdown/dropdownDivider";
const { shell } = require("electron");

export default {
	name: "App",
	components: {
		menubar,
		newRepository,
		addLocalRepository,
		about,
		exportCommitData,
		newRemote,
		initalizeGitRepository,
		cloneRepository,
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
			shell.openExternal("https://discord.gg/f5mYum8");
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

.model
	&__placeholder
		position: fixed
		left: 0
		top: 0
		width: 100%
		height: 100%
		background-color: rgba(0, 0, 0, .5)
		z-index: 9

	&__container
		position: absolute
		top: 50%
		background-color: white
		border-radius: 5px
		left: 50%
		transform: translate(-50%, -50%)
		margin-left: 20px
		margin-right: 20px

	&--small
		width: 450px

	&--medium
		width: 700px

	&--large
		width: 100%
</style>
