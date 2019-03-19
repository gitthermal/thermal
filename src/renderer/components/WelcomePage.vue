<template>
  <div class="welcome d-flex flex-column justify-center align-items-center">
    <h1>Welcome to Thermal</h1>
    <p class="welcome__description">One stop for all of your Git repository.</p>
    <div class="welcome__item d-flex">
      <div @click="websiteURL()" class="welcome__item__icon">
        <linkIcon/>
      </div>
      <div @click="twitterURL()" class="welcome__item__icon">
        <twitterIcon/>
      </div>
      <div @click="coffeeURL()" class="welcome__item__icon">
        <coffeeIcon/>
      </div>
    </div>
		<div v-if="getAllRepository.length > 0" class="welcome__repository">
			<div class="welcome__repository__list">
				<div v-for="repo in getAllRepository" :key="repo.path" class="welcome__repository__list__item d-flex align-items-center">
					<h6>{{ repo.name }}:</h6> <p :title="repo.path">{{ repo.path }}</p>
					<primaryButton @click.native="selectCurrentRepository(repo)" text="Select" class="welcome__repository__list__item__select ml-auto"/>
					<outlineButton text="Remove" type="danger" class="welcome__repository__list__item__delete"/>
				</div>
			</div>
		</div>
		<primaryButton @click.native="addLocalRepository()" class="welcome__cta" :text="getAllRepository.length > 0 ? 'Add Repository' : 'Get Started'"/>
  </div>
</template>

<script>
import linkIcon from "./icon/link"
import twitterIcon from "./icon/twitter"
import coffeeIcon from "./icon/coffee"
import primaryButton from "./atoms/primaryButton"
import outlineButton from "./atoms/outlineButton"
const { shell } = require("electron")

export default {
	name: "WelcomePage",
	components: {
		linkIcon,
		twitterIcon,
		coffeeIcon,
		primaryButton,
		outlineButton
	},
	computed: {
		getAllRepository() {
			return this.$store.getters["addRepo/allRepository"]
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
		addLocalRepository() {
			this.$store.dispatch("model/showModelPlaceholder")
			this.$store.dispatch("addRepo/showAddLocalRepositoryModel")
		},
		selectCurrentRepository(data) {
			console.log(data)
			this.$store.dispatch({
				type: "workspace/updateWorkspaceRepository",
				name: data.name,
				path: data.path
			})
		},
		}
	}
}
</script>

<style lang='sass'>
	.welcome
		width: 100%
		
		align-items: center

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
	
		&__repository
			border: 1px solid #EFEFEF
			width: 450px
			border-radius: 1rem
			padding: 1rem

			&__list
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
</style>
