<template>
	<div class="windowsControles d-flex align-items-center">
		<div @click="minimize()" class="windowsControles__icon windowsControles__minimize">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
		</div>
		<div @click="maximize()" class="windowsControles__icon windowsControles__maximize">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
		</div>
		<div @click="close()" class="windowsControles__icon windowsControles__close">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
		</div>
	</div>
</template>

<script>
const { remote } = require("electron")
const win = remote.getCurrentWindow()

export default {
	name: "windowsButton",
	methods: {
		close() {
			console.log("close")
			win.close()
		},
		minimize() {
			console.log("minimize")
			win.minimize()
		},
		maximize() {
			console.log("maximize")
			if (!win.isMaximized()) {
				win.maximize()
			} else {
				win.unmaximize()
			}
		}
	}
}
</script>

<style lang='sass'>
.windowsControles

	&__icon
		padding: 8px 10px
		display: flex
		cursor: pointer

		svg
			width: 20px
			height: 20px
			stroke: #8B9798

		&:hover
			background-color: rgba(139, 151, 152, .1)

	&__close

		&:hover
			background-color: rgb(240, 71, 71)
			svg
				stroke: white
</style>
