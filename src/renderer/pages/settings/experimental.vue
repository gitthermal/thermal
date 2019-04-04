<template>
	<div class="experimental">
		<h4>Experimental Features</h4>
		<div class="experimental__warning">
			Experimental features are projects/features that aren't quite ready. They may break (or disapper) at any time. Let us know what you think on our <a @click="discordURL()">Thermal Discord server</a>.
		</div>
		<div class="settings__body__section__content">
			<div class="settings__body__section__content__item d-flex flex-row align-items-center">
				<div>
					<h6>File changes</h6>
					<p>Preview additions and deletion in file from commit history, <a @click="fileChanges()">click to learn more</a>.</p>
				</div>
				<toggle-button v-model="toggleFileChanges" color="#00adb5" class="ml-auto"/>
			</div>
		</div>
	</div>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button"
const { shell } = require("electron")

export default {
	name: "experimentalFeatures",
	components: {
		ToggleButton
	},
	computed: {
		toggleFileChanges: {
			get: function() {
				return this.$store.state.settings.experimental.fileChanges
			},
			set: function(value) {
				this.$store.commit({
					type: "toggleFileChanges",
					fileChanges: value
				})
			}
		}
	},
	methods: {
		discordURL() {
			shell.openExternal("https://discord.gg/f5mYum8")
		},
		fileChanges() {
			shell.openExternal("https://www.notion.so/gitthermal/File-changes-ad75574eee7143e398fd6d46b0b91b92#ad75574eee7143e398fd6d46b0b91b92https://www.notion.so/gitthermal/File-changes-ad75574eee7143e398fd6d46b0b91b92#ad75574eee7143e398fd6d46b0b91b92")
		}
	}
}
</script>

<style lang='sass'>
.experimental

	&__warning
		padding: 1rem 0
		font-size: 12px
		color: #6C6F75		
</style>
