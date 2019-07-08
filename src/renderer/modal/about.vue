<template>
	<t-card width="medium">
		<div class="about">
			<div class="about__header d-flex flex-column align-items-center">
				<div class="about__header__logo">
					<thermalLogo />
				</div>
				<h6>Thermal</h6>
				<p class="about__header__version">
					{{ appVersion }}
				</p>
			</div>
		</div>
		<t-card-body class="about__content">
			<p class="about__content-para">
				Thermal is an electron.js & vue.js based application by which you can
				use Git with a nice graphic user interface.
			</p>
			<p class="about__content-para">
				This application is copyright and build by CodeCarrot.
			</p>
		</t-card-body>
		<t-card-footer>
			<t-button
				:outline="true"
				margin-left="auto"
				@click.native="closeModal('About')"
			>
				Close
			</t-button>
			<t-button margin-left=".5rem" @click.native="releaseNotes()">
				Release Notes
			</t-button>
		</t-card-footer>
	</t-card>
</template>

<script>
// components
import TCard from "../components/TCard/TCard";
import TCardBody from "../components/TCard/TCardBody";
import TCardFooter from "../components/TCard/TCardFooter";
import TButton from "../components/TButton/TButton";

// mixins
import closeModalMixin from "../mixins/closeModal";

import thermalLogo from "../components/icon/logo";
import packageJson from "../../../package.json";
const { shell } = require("electron");

export default {
	name: "About",
	components: {
		TCard,
		TCardBody,
		TCardFooter,
		TButton,
		thermalLogo
	},
	mixins: [closeModalMixin],
	computed: {
		appVersion() {
			return `Version ${packageJson.version}`;
		}
	},
	methods: {
		releaseNotes() {
			shell.openExternal("https://thermal.codecarrot.net/releases");
		}
	}
};
</script>

<style lang="sass">
.about
	&__header
		padding: .8rem 1rem
		border-bottom: 1px solid #eee
		width: 100%

		&__version
			font-size: .8rem

	&__content
		flex-direction: column

		&-para
			margin-bottom: .5rem
</style>
