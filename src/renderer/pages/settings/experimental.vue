<template>
	<div class="experimental">
		<h4>Experimental Features</h4>
		<div class="experimental__warning">
			Experimental features are projects/features that aren't quite ready. They may break (or disapper) at any time. Let us know what you think on our <a @click="discordURL()">Thermal Discord server</a>.
		</div>
	</div>
</template>

<script>
const { shell } = require("electron")

export default {
	name: "experimentalFeatures",
	methods: {
		discordURL() {
			shell.openExternal("https://discord.gg/f5mYum8")
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
