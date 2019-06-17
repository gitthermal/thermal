<template>
	<t-flexbox flex-direction="column">
		<navbar />
		<t-flexbox>
			<sidebar />
			<router-view />
		</t-flexbox>
	</t-flexbox>
</template>

<script>
import TFlexbox from "../../components/TLayouts/TFlexbox";
import navbar from "../../components/navbar";
import sidebar from "../../components/sidebar";

export default {
	name: "RepositoryIndex",
	components: {
		TFlexbox,
		navbar,
		sidebar
	},
	mounted() {
		if (
			this.$router.history.current.matched[0].path.slice(1) === "repository" &&
			this.$store.getters["workspace/currentRepository"].isGit === false
		) {
			this.$store.commit("model/toggleModelPlaceholder");
		}
	}
};
</script>
