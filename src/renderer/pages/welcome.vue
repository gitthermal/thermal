<template>
	<t-flexbox
		align-items="center"
		justify-content="space-evenly"
		class="welcome"
	>
		<t-flexbox
			flex-direction="column"
			align-items="center"
			style="text-align: center"
		>
			<h1>Welcome to Thermal</h1>
			<p style="margin-bottom: 1rem">
				One stop. Git repository.
			</p>
			<t-flexbox style="margin-bottom: 1rem">
				<div class="welcome__introduction__item__icon" @click="websiteURL()">
					<linkIcon />
				</div>
				<div class="welcome__introduction__item__icon" @click="twitterURL()">
					<twitterIcon />
				</div>
				<div class="welcome__introduction__item__icon" @click="coffeeURL()">
					<dollarIcon />
				</div>
				<div class="welcome__introduction__item__icon" @click="discordURL()">
					<helpIcon />
				</div>
			</t-flexbox>
		</t-flexbox>
		<div class="welcome__separate" />
		<t-flexbox flex-direction="column" align-items="center">
			<div class="welcome__repository__list">
				<repository-list height="400px" :source="false" :path="false" />
			</div>
			<t-button margin-top="1rem" @click.native="addLocalRepository()">
				Add Repository
			</t-button>
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import linkIcon from "../components/icon/link";
import twitterIcon from "../components/icon/twitter";
import dollarIcon from "../components/icon/dollar";
import helpIcon from "../components/icon/help";
import TButton from "../components/TButton/TButton";
import TFlexbox from "../components/TLayouts/TFlexbox";
import repositoryList from "../components/repositoryListView/repositoryList";

const { shell } = require("electron");

export default {
	name: "WelcomePage",
	components: {
		linkIcon,
		twitterIcon,
		dollarIcon,
		helpIcon,
		TFlexbox,
		repositoryList,
		TButton
	},
	methods: {
		websiteURL() {
			shell.openExternal("https://thermal.codecarrot.net/");
		},
		twitterURL() {
			shell.openExternal("https://www.twitter.com/@gitthermal");
		},
		coffeeURL() {
			shell.openExternal("https://thermal.codecarrot.net/sponsor/");
		},
		discordURL() {
			shell.openExternal("https://discord.gg/f5mYum8");
		},
		addLocalRepository() {
			this.$store.commit("modal/toggleAddLocalRepositoryModal", true);
		}
	}
};
</script>

<style lang="sass">
.welcome
	height: 100vh

	&__introduction
		&__item
			&__icon
				cursor: pointer

				svg
					width: 30px
					height: 30px
					stroke: #222831

				&:not(:last-child)
					margin-right: 20px

	&__separate
		width: 1px
		height: 480px
		background-color: #DEE0E3

	&__repository
		&__list
			padding: 1rem
			border: 1px solid #EFEFEF
			width: 450px
			border-radius: 1rem
</style>
