<template>
	<div>
		<navbar />
		<div class="col__view">
			<sidebar />
			<router-view />
		</div>
	</div>
</template>

<script>
import navbar from "../../components/navbar";
import sidebar from "../../components/sidebar";

export default {
	name: "RepositoryIndex",
	components: {
		navbar,
		sidebar
	},
	mounted() {
		if ((this.$router.history.current.matched[0].path.slice(1) === "repository") && (this.$store.getters["workspace/currentRepository"].isGit === false)) {
			this.$store.commit("model/toggleModelPlaceholder");
		}
	}
};
</script>

<style lang="sass">
.col__view
	display: flex
	height: 86vh
	flex-direction: row
</style>
