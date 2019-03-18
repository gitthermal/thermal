<template>
    <h1>Welcome to Thermal</h1>
  <div class="welcome">
    <p class="welcome__description">One stop for all of your Git repository.</p>
    <div class="welcome__item">
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
    <primaryButton class="welcome__cta" text="Get Started"/>
  </div>
</template>

<script>
import linkIcon from "./icon/link"
import twitterIcon from "./icon/twitter"
import coffeeIcon from "./icon/coffee"
import primaryButton from "./primaryButton"
const { shell } = require("electron")

export default {
	name: "WelcomePage",
	components: {
		linkIcon,
		twitterIcon,
		coffeeIcon,
		primaryButton
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
	}
}
</script>

<style lang='sass'>
	.welcome
		width: 100%
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center

		&__description
			margin-bottom: 1rem

		&__item
			display: flex

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
</style>
