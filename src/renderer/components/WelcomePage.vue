<template>
  <div class="welcome d-flex align-items-center">
		<div class="welcome__introduction d-flex flex-column align-items-center ml-auto mr-auto">
			<h1>Welcome to Thermal</h1>
			<p class="welcome__introduction__description">One stop for all of your Git repository.</p>
			<div class="welcome__introduction__item d-flex">
				<div @click="websiteURL()" class="welcome__introduction__item__icon">
					<linkIcon/>
				</div>
				<div @click="twitterURL()" class="welcome__introduction__item__icon">
					<twitterIcon/>
				</div>
				<div @click="coffeeURL()" class="welcome__introduction__item__icon">
					<coffeeIcon/>
				</div>
				<div @click="helpURL()" class="welcome__introduction__item__icon">
					<helpIcon/>
				</div>
			</div>
		</div>
		<div class="welcome__seperate"></div>
		<div class="welcome__repository d-flex flex-column align-items-center ml-auto mr-auto">
			<div class="welcome__repository__list">
				<VueScrollbar class="welcome__repository__scrollbar">
					<div>
						<div v-if="getAllRepository.length > 0">
							<div v-for="(repo, index) in getAllRepository" :key="repo.path" class="welcome__repository__list__item d-flex align-items-center">
								<h6>{{ repo.name }}</h6>
								<primaryButton @click.native="selectCurrentRepository(repo)" text="Select" class="welcome__repository__list__item__select ml-auto"/>
								<outlineButton @click.native="removeCurrentRepository(index)" text="Remove" type="danger" class="welcome__repository__list__item__delete"/>
							</div>
						</div>
						<div v-else @mouseenter="toggleRepositoryExampleModel" @mouseleave="toggleRepositoryExampleModel">
							<div>
								<div v-for="repo in this.repositoryList" :key="repo" class="welcome__repository__list__item welcome__repository__example d-flex align-items-center">
									<h6>{{ repo }}</h6>
									<primaryButton text="Select" class="welcome__repository__list__item__select ml-auto"/>
									<outlineButton text="Remove" type="danger" class="welcome__repository__list__item__delete"/>
								</div>
							</div>
							<div v-show="exampleRepositoryModel" class="welcome__repository__example__model">
								<primaryButton @click.native="addLocalRepository()" class="welcome__cta" text="Add Repository"/>
							</div>
						</div>
					</div>
				</VueScrollbar>
			</div>
			<primaryButton v-show="getAllRepository.length > 0" @click.native="addLocalRepository()" class="welcome__cta" text="Add Repository"/>
		</div>
		<div class="appMetaData">
			Version: {{ appVersion }}
		</div>
  </div>
</template>

<script>
import linkIcon from "./icon/link"
import twitterIcon from "./icon/twitter"
import coffeeIcon from "./icon/coffee"
import helpIcon from "./icon/help"
import primaryButton from "./atoms/primaryButton"
import outlineButton from "./atoms/outlineButton"
import packageJson from "../../../package.json"
import * as Sentry from "@sentry/electron"
import VueScrollbar from "vue2-scrollbar"
const { shell } = require("electron")

Sentry.configureScope((scope) => {
	scope.setTag("appVersion", this.appVersion)
})

export default {
	name: "WelcomePage",
	data() {
		return {
			repositoryList: [
				"thermal-app",
				"gatsbyjs",
				"awesome-vuejs"
			],
			exampleRepositoryModel: false
		}
	},
	components: {
		linkIcon,
		twitterIcon,
		coffeeIcon,
		helpIcon,
		primaryButton,
		outlineButton,
		VueScrollbar
	},
	computed: {
		getAllRepository() {
			return this.$store.getters["workspace/listAllRepository"]
		},
		appVersion() {
			return packageJson.version
		}
	},
	methods: {
		websiteURL() {
			shell.openExternal("https://thermal.netlify.com/")
		},
		twitterURL() {
			shell.openExternal("https://www.twitter.com/@gitthermal")
		},
		coffeeURL() {
			shell.openExternal("https://www.patreon.com/join/mittalyashu")
		},
		helpIcon() {
			shell.openExternal("https://discord.gg/f5mYum8")
		},
		addLocalRepository() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("workspace/showAddLocalRepositoryModel")
		},
		toggleRepositoryExampleModel() {
			this.exampleRepositoryModel = !this.exampleRepositoryModel
		},
		selectCurrentRepository(data) {
			this.$store.dispatch({
				type: "workspace/updateWorkspaceRepository",
				name: data.name,
				path: data.path
			})
			this.$router.push({ name: "workspace" })
		},
		removeCurrentRepository(index) {
			this.$store.dispatch({
				type: "workspace/removeRepositoryFromList",
				index: index
			})
		}
	}
}
</script>

<style lang='sass'>
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
			
		&__cta
			margin-top: 1rem

		&__seperate
			width: 1px
			height: 480px
			background-color: #DEE0E3
	
		&__repository
			
			&__scrollbar
				max-height: 400px
				padding: 1rem

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

				&__item
					&:not(:last-child)
						margin-bottom: .5rem

					h6
						padding-right: 5px
						margin-bottom: 0

					p
						color: #6C6F75
						font-size: 14px

					&__delete
						margin-left: .5rem
					
	.appMetaData
		font-size: 10px
		position: absolute
		bottom: 3px
		width: 100%
		text-align: center	
</style>
