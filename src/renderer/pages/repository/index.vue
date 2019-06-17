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
		if (!this.$store.getters["workspace/currentRepository"].isGit) {
			this.$store.commit("modal/toggleInitalizeGitRepositoryModal", true);
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
