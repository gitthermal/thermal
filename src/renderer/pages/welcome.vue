<template>
	<div class="welcome d-flex align-items-center">
		<div
			class="welcome__introduction d-flex flex-column align-items-center ml-auto mr-auto"
		>
			<h1>Welcome to Thermal</h1>
			<p class="welcome__introduction__description">
				One stop. Git repository.
			</p>
			<div class="welcome__introduction__item d-flex">
				<div class="welcome__introduction__item__icon" @click="websiteURL()">
					<linkIcon />
				</div>
				<div class="welcome__introduction__item__icon" @click="twitterURL()">
					<twitterIcon />
				</div>
				<div class="welcome__introduction__item__icon" @click="coffeeURL()">
					<coffeeIcon />
				</div>
				<div class="welcome__introduction__item__icon" @click="discordURL()">
					<helpIcon />
				</div>
			</div>
		</div>
		<div class="welcome__seperate" />
		<div
			class="welcome__repository d-flex flex-column align-items-center ml-auto mr-auto"
		>
			<div
				class="welcome__repository__list"
				@drop.prevent="dropHandler($event)"
				@dragover.prevent="dropHandler()"
			>
				<VueScrollbar class="welcome__repository__scrollbar">
					<div class="welcome__repository__list__container">
						<div v-if="getAllRepository.length > 0">
							<div
								v-for="(repo, index) in getAllRepository"
								:key="repo.path"
								class="welcome__repository__list__item d-flex align-items-center"
							>
								<h6>{{ repo.name | truncateFilter(30) }}</h6>
								<Button
									text="Open"
									appearance="primary"
									margin-left="auto"
									@click.native="selectCurrentRepository(index)"
								/>
								<div
									class="welcome__repository__list__item__settings"
									@click="openRepositorySettings(index)"
								>
									<settingsIcon />
								</div>
							</div>
						</div>
						<div
							v-else
							@mouseenter="toggleRepositoryExampleModel"
							@mouseleave="toggleRepositoryExampleModel"
						>
							<div>
								<div
									v-for="repo in repositoryList"
									:key="repo"
									class="welcome__repository__list__item welcome__repository__example d-flex align-items-center"
								>
									<h6>{{ repo }}</h6>
									<Button text="Open" appearance="primary" margin-left="auto" />
									<div class="welcome__repository__list__item__settings">
										<settingsIcon />
									</div>
								</div>
							</div>
							<div
								v-show="exampleRepositoryModel"
								class="welcome__repository__example__model"
							>
								<Button
									margin-top="1rem"
									appearance="primary"
									text="Add Repository"
									@click.native="addLocalRepository()"
								/>
							</div>
						</div>
					</div>
				</VueScrollbar>
			</div>
			<Button
				v-show="getAllRepository.length > 0"
				margin-top="1rem"
				appearance="primary"
				text="Add Repository"
				@click.native="addLocalRepository()"
			/>
		</div>
		<div class="appMetaData">
			{{ appVersion }}
		</div>
	</div>
</template>

<script>
import linkIcon from "../components/icon/link";
import twitterIcon from "../components/icon/twitter";
import coffeeIcon from "../components/icon/coffee";
import helpIcon from "../components/icon/help";
import settingsIcon from "../components/icon/settings";
import Button from "../components/buttons/Button";
import packageJson from "../../../package.json";
import * as Sentry from "@sentry/electron";
import VueScrollbar from "vue2-scrollbar";
import truncateFilter from "../filters/truncate";
import addRepository from "../mixins/addRepository";
const { shell } = require("electron");

Sentry.configureScope(scope => {
	scope.setTag("appVersion", this.appVersion);
});

export default {
	name: "WelcomePage",
	components: {
		linkIcon,
		twitterIcon,
		coffeeIcon,
		helpIcon,
		settingsIcon,
		Button,
		VueScrollbar
	},
	filters: {
		truncateFilter
	},
	mixins: [addRepository],
	data() {
		return {
			repositoryList: ["thermal-app", "gatsbyjs", "awesome-vuejs"],
			exampleRepositoryModel: false,
			repositoryPath: ""
		};
	},
	computed: {
		getAllRepository() {
			return this.$store.getters["repository/listAllRepository"];
		},
		appVersion() {
			return `Version: ${packageJson.version}`;
		}
	},
	methods: {
		websiteURL() {
			shell.openExternal("https://thermal.codecarrot.net/");
		},
		twitterURL() {
			shell.openExternal("https://www.twitter.com/@gitthermal");
		},
		coffeeURL() {
			shell.openExternal("https://www.patreon.com/join/mittalyashu");
		},
		discordURL() {
			shell.openExternal("https://discord.gg/f5mYum8");
		},
		addLocalRepository() {
			this.$store.dispatch("model/showAddLocalRepositoryModel");
		},
		toggleRepositoryExampleModel() {
			this.exampleRepositoryModel = !this.exampleRepositoryModel;
		},
		updateCurrentRepository(index) {
			this.$store.dispatch({
				type: "workspace/updateWorkspaceRepository",
				index: index
			});
		},
		selectCurrentRepository(index) {
			this.updateCurrentRepository(index);
			this.$router.push({ name: "repositoryWorkspace" });
		},
		openRepositorySettings(index) {
			this.updateCurrentRepository(index);
			this.$router.push({ name: "repositorySettings" });
		},
		dropHandler(event) {
			const dropDataTransfer = event.dataTransfer.files;
			for (let i = 0; i < dropDataTransfer.length; i++) {
				this.repositoryPath = event.dataTransfer.files[i].path
					.split("\\")
					.join("/");
				this.localRepository(this.repositoryPath);
			}
		}
	}
};
</script>

<style lang="sass">
.welcome
	width: 100%
	height: 100vh

	&__introduction
		&__description
			margin-bottom: 1rem

		&__item
			margin-bottom: 1rem

			&__icon
				cursor: pointer

				svg
					width: 30px
					height: 30px
					stroke: #222831

				&:not(:last-child)
					margin-right: 20px

	&__seperate
		width: 1px
		height: 480px
		background-color: #DEE0E3

	&__repository
		&__scrollbar
			max-height: 400px

		&__example
			user-select: none

			&__model
				position: absolute
				bottom: 0
				align-items: center
				flex-direction: column
				justify-content: center
				display: flex
				opacity: 1
				transition: opacity .2s ease-in-out
				width: 93%
				height: 100%
				padding: 0 16px
				background-color: rgba(#fff, .8)

		&__list
			border: 1px solid #EFEFEF
			width: 450px
			border-radius: 1rem

			&__container
				padding: 1rem

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

.appMetaData
	font-size: 10px
	position: absolute
	bottom: 3px
	width: 100%
	text-align: center
</style>
