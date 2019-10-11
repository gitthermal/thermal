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
			<div
				class="welcome__repository__list"
				@drop.prevent="dropHandler($event)"
				@dragover.prevent="dropHandler()"
			>
				<repository-list height="400px" />
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
import truncateFilter from "../filters/truncate";

// mixins
import addRepository from "../mixins/addRepository";

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
	filters: {
		truncateFilter
	},
	mixins: [addRepository],
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
		},
		dropHandler(event) {
			const dropDataTransfer = event.dataTransfer.files;
			for (let i = 0; i < dropDataTransfer.length; i++) {
				this.newRepository.path = dropDataTransfer[i].path
					.split("\\")
					.join("/");
				this.addRepositoryToDatabase(this.newRepository.path);
			}
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
		&__example
			user-select: none

			&__model
				position: absolute
				bottom: 0
				align-items: center
				justify-content: center
				display: flex
				width: 93%
				height: 100%
				background-color: rgba(#fff, .8)

		&__list
			border: 1px solid #EFEFEF
			width: 450px
			border-radius: 1rem

			&__item
				&:not(:last-child)
					margin-bottom: .5rem

				h6
					padding-right: 5px
					margin-bottom: 0

				p
					color: #6C6F75
					font-size: 14px

				&__settings
					margin-left: .5rem
					border: 1px solid #00adb5
					padding: .5rem
					border-radius: 5rem
					display: flex
					cursor: pointer

					svg
						width: 20px
						height: 20px
						stroke: #00adb5
</style>
