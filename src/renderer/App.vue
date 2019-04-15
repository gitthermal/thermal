<template>
	<div id="app">
		<menubar />
		<router-view />
		<div
			v-if="this.$store.state.model.isActive"
			class="model__placeholder"
		>
			<div class="model__container">
				<addLocalRepository />
				<about />
				<exportCommitData />
				<newRemote />
			</div>
		</div>
	</div>
</template>

<script>
import menubar from "./components/menubar";
import addLocalRepository from "./components/model/addLocalRepository";
import about from "./components/model/about";
import exportCommitData from "./components/model/exportCommitData";
import newRemote from "./components/model/newRemote";

export default {
	name: "App",
	components: {
		menubar,
		addLocalRepository,
		about,
		exportCommitData,
		newRemote
	},
	beforeCreate() {
		this.$store.commit("repository/getRepositoryList");
	},
};
</script>

<style lang="sass">
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
