<template>
	<t-flexbox
		align-items="center"
		justify-content="space-evenly"
		class="welcome"
	>
		<t-flexbox flex-direction="column" align-items="center" class="text-center">
			<h1>Welcome to Thermal</h1>
			<p class="mb-1">
				One stop. Git repository.
			</p>
			<t-flexbox class="mb-1">
				<div class="icon" @click="websiteURL()">
					<linkIcon />
				</div>
				<div class="icon" @click="twitterURL()">
					<twitterIcon />
				</div>
				<div class="icon" @click="coffeeURL()">
					<dollarIcon />
				</div>
				<div class="icon" @click="discordURL()">
					<helpIcon />
				</div>
			</t-flexbox>
		</t-flexbox>
		<t-flexbox flex-direction="column" align-items="center">
			<div
				class="repository__list"
				@drop.prevent="dropHandler($event)"
				@dragover.prevent="dropHandler()"
			>
				<t-scrollbar v-if="getAllRepository.length > 0" height="400px">
					<div class="p-1">
						<div v-if="getAllRepository.length > 0">
							<t-flexbox
								v-for="(repo, index) in getAllRepository"
								:key="repo.path"
								align-items="center"
								class="item"
							>
								<h6>{{ repo.name | truncateFilter(30) }}</h6>
								<t-button
									margin-left="auto"
									@click.native="selectCurrentRepository(index)"
								>
									Open
								</t-button>
								<div
									class="item__settings"
									@click="openRepositorySettings(index)"
								>
									<settingsIcon />
								</div>
							</t-flexbox>
						</div>
					</div>
				</t-scrollbar>
				<div
					v-else
					class="p-1 relative"
					@mouseenter="toggleRepositoryExampleModel"
					@mouseleave="toggleRepositoryExampleModel"
				>
					<div>
						<t-flexbox
							v-for="repo in repositoryList"
							:key="repo"
							align-items="center"
							class="repository__example item"
						>
							<h6>{{ repo }}</h6>
							<t-button margin-left="auto">
								Open
							</t-button>
							<div class="item__settings">
								<settingsIcon />
							</div>
						</t-flexbox>
					</div>
					<div
						v-show="exampleRepositoryModel"
						class="repository__example__model"
					>
						<t-button margin-top="1rem" @click.native="addLocalRepository()">
							Add Repository
						</t-button>
					</div>
				</div>
			</div>
			<t-button
				v-show="getAllRepository.length > 0"
				margin-top="1rem"
				@click.native="addLocalRepository()"
			>
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
import settingsIcon from "../components/icon/settings";
import TButton from "../components/TButton/TButton";
import TScrollbar from "../components/TLayouts/TScrollbar";
import TFlexbox from "../components/TLayouts/TFlexbox";
import truncateFilter from "../filters/truncate";
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
		settingsIcon,
		TButton,
		TScrollbar
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
			shell.openExternal("https://thermal.codecarrot.net/sponsor/");
		},
		discordURL() {
			shell.openExternal("https://discord.gg/f5mYum8");
		},
		addLocalRepository() {
			this.$store.commit("modal/toggleAddLocalRepositoryModal", true);
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
	height: 100vh

	.icon
		cursor: pointer

		svg
			width: 30px
			height: 30px
			stroke: #222831

		&:not(:last-child)
			margin-right: 20px

	.separate
		width: 1px
		height: 480px
		background-color: #DEE0E3

	.repository
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

			.item
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
