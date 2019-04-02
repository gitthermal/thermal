<template>
	<div v-show="this.$store.state.model.model.about" class="model--medium">
		<div class="about">
			<div class="about__header d-flex flex-column align-items-center">
				<div class="about__header__logo">
					<thermalLogo/>
				</div>
				<h6>Thermal</h6>
				<p class="about__header__version">
					Version {{ appVersion }}
				</p>
			</div>
			<div class="about__content">
				<p class="about__content__para">
					Thermal is an electron.js & vue.js based application using by which you can use Git with this application with a nice graphic user interface.
				</p>
				<p class="about__content__para">
					This application is copyright and build by Yashu Mittal.
				</p>
			</div>
		</div>
		<div class="about__footer d-flex">
			<outlineButton @click.native="closeModel()" text="Close" class="about__footer__button ml-auto"/>
			<primaryButton @click.native="releaseNotes()" text="Release Notes" class="about__footer__button"/>
		</div>
	</div>
</template>

<script>
import thermalLogo from "../icon/logo"
import packageJson from "../../../../package.json"
import primaryButton from "../atoms/primaryButton"
import outlineButton from "../atoms/outlineButton"
const { shell } = require("electron")

export default {
	name: "about",
	components: {
		thermalLogo,
		primaryButton,
		outlineButton
	},
	computed: {
		appVersion() {
			return packageJson.version
		}
	},
	methods: {
		releaseNotes() {
			shell.openExternal("https://www.notion.so/gitthermal/Release-notes-7d77751a39484413b7ca8564b3f390a9#7d77751a39484413b7ca8564b3f390a9")
		},
		closeModel() {
			this.$store.dispatch("model/showAboutModel")
		}
	}
}
</script>

<style lang='sass'>
	.about

		&__header
			padding: .8rem 1rem
			border-bottom: 1px solid #eee
			width: 100%

			&__version
				font-size: .8rem

		&__content
			padding: .8rem 1rem

			&__para
				margin-bottom: .5rem

		&__footer
			width: 100%
			border-top: 1px solid #eee
			padding: .8rem 1rem

			&__button

				&:not(:first-child)
					margin-left: .5rem
</style>
