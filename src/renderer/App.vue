<template>
	<div id="app">
		<menubar/>
		<navbar/>
		<div class="col__view">
			<sidebar/>
			<router-view></router-view>
		</div>
		<div v-if="this.$store.state.model.isActive" class="model__placeholder">
			<div class="model__container">
				<addLocalRepository/>
				<about/>
				<exportCommitData/>
			</div>
		</div>
	</div>
</template>

<script>
import menubar from "./components/menubar"
import navbar from "./components/navbar"
import sidebar from "./components/sidebar"
import addLocalRepository from "./components/molecules/addLocalRepository"
import about from "./components/model/about"
import exportCommitData from "./components/model/exportCommitData"

export default {
	name: "thermal",
	components: {
		menubar,
		navbar,
		sidebar,
		addLocalRepository,
		about,
		exportCommitData
	}
}
</script>

<style lang="sass">
	.col__view
		display: flex
		height: 86vh
		flex-direction: row

	.model
		&__placeholder
			position: fixed
			left: 0
			top: 0
			width: 100%
			height: 100%
			background-color: rgba(0, 0, 0, .5)
			z-index: 9

		&__container
			position: absolute
			top: 50%
			background-color: white
			border-radius: 5px
			left: 50%
			transform: translate(-50%, -50%)
			margin-left: 20px
			margin-right: 20px

		&--small
			width: 450px

		&--medium
			width: 700px

		&--large
			width: 100%
</style>
